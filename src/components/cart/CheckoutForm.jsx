import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CreditCard, Smartphone, RotateCw, Clipboard, Clock, CheckCircle } from "lucide-react";

import {
  generateRandomPixCode,
  generateQRCode,
  copyPixCode,
} from "../../hooks/pixService";

import { createPaymentIntent, createOrder } from "../../hooks/paymentService";

function CheckoutForm({ amount, address, cartItems }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [pixData, setPixData] = useState(null);
  const [pixLoading, setPixLoading] = useState(false);

  useEffect(() => {
    if (!amount || amount <= 0 || paymentMethod !== "card") return setClientSecret(null);

    createPaymentIntent(amount)
      .then(setClientSecret)
      .catch(() => setError("Erro ao iniciar pagamento."));
  }, [amount, paymentMethod]);

  const generatePixQR = () => {
    setPixLoading(true);
    setError("");
    try {
      const code = generateRandomPixCode();
      setPixData({ code, qrCode: generateQRCode(code), expiresAt: Date.now() + 900000 }); // 15 min
    } catch {
      setError("Erro ao gerar código PIX");
    } finally {
      setPixLoading(false);
    }
  };

  const handleCopyPix = () => {
    if (pixData) copyPixCode(pixData.code);
  };

  const checkPixPayment = () => {
    setLoading(true);
    setError("");
    setTimeout(async () => {
      try {
        const token = localStorage.getItem("token");
        const payment = { method: "pix", total: amount, status: "pago", pixCode: pixData.code };
        const res = await createOrder(token, cartItems, address, payment);
        navigate(`/pedido/${res._id}/confirmado`);
      } catch {
        setError("Pagamento confirmado, mas erro ao registrar pedido.");
      }
      setLoading(false);
    }, 3000);
  };

  const handleCardSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!stripe || !elements || !clientSecret) return setLoading(false);

    const card = elements.getElement(CardElement);
    const { paymentIntent, error: stripeErr } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card, billing_details: { name: cardholderName } },
    });

    if (stripeErr) {
      setError(stripeErr.message || "Erro ao processar pagamento");
      return setLoading(false);
    }

    if (paymentIntent.status === "succeeded") {
      try {
        const token = localStorage.getItem("token");
        const payment = {
          method: "card",
          total: amount,
          status: "pago",
          stripeId: paymentIntent.id,
        };
        const res = await createOrder(token, cartItems, address, payment);
        navigate(`/pedido/${res._id}/confirmado`);
      } catch {
        setError("Pagamento feito, mas erro ao registrar pedido.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Método de pagamento */}
      <div className="flex space-x-4 pb-3">
        {["card", "pix"].map((method) => (
          <button
            key={method}
            type="button"
            onClick={() => setPaymentMethod(method)}
            className={`px-4 py-2 rounded ${
              paymentMethod === method ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-900"
            }`}
          >
            {method === "card" ? <CreditCard className="inline-block w-5 h-5 mr-2" /> : <Smartphone className="inline-block w-5 h-5 mr-2" />}
            {method === "card" ? "Cartão" : "PIX"}
          </button>
        ))}
      </div>

      {/* Formulário Cartão */}
      {paymentMethod === "card" && (
        <form onSubmit={handleCardSubmit} className="space-y-4">
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            required
            className="border p-3 rounded w-full"
            placeholder="Nome do titular"
          />
          <CardElement className="border p-3 rounded" options={{ style: { base: { fontSize: "16px", color: "#000", "::placeholder": { color: "#aaa" } } } }} />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" disabled={!stripe || !clientSecret || loading} className="p-4 bg-gray-800 text-white py-2 rounded hover:bg-gray-900 disabled:opacity-50">
            {loading ? "Processando..." : "Pagar com Cartão"}
          </button>
        </form>
      )}

      {/* Pagamento PIX */}
      {paymentMethod === "pix" && (
        <div className="space-y-4">
          {!pixData ? (
            <button onClick={generatePixQR} disabled={pixLoading} className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-50">
              {pixLoading ? <><RotateCw className="inline-block w-5 h-5 mr-2 animate-spin" />Gerando PIX...</> : "Gerar Código PIX"}
            </button>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg text-center space-y-4">
              <h3 className="font-semibold text-lg">Pagamento via PIX</h3>
              <p className="text-sm text-gray-600">Valor: <strong>R$ {Number(amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></p>
              <div className="flex justify-center">
                <img src={pixData.qrCode} alt="QR Code PIX" className="border rounded" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Ou copie o código:</p>
                <div className="flex items-center gap-2">
                  <input type="text" value={pixData.code} readOnly className="flex-1 p-2 border rounded bg-gray-100 text-xs font-mono" />
                  <button onClick={handleCopyPix} className="px-3 py-2 flex bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                    <Clipboard className="w-4 h-4 mr-1" /> Copiar
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 flex">
                <Clock className="w-4 h-4 pr-2" /> Expira em 15 minutos
              </p>
              <button onClick={checkPixPayment} disabled={loading} className="p-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50">
                {loading ? "Verificando pagamento..." : <><CheckCircle className="w-5 h-5 pr-2 inline" /> Já paguei</>}
              </button>
              <p className="text-xs text-gray-500">Após o pagamento, clique em "Já paguei" para confirmar</p>
            </div>
          )}
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
      )}
    </div>
  );
}

export default CheckoutForm;
