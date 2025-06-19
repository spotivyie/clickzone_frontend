export const generateRandomPixCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 32 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

export const generateQRCode = (text) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;

export const copyPixCode = (code) => {
  navigator.clipboard.writeText(code);
  alert("Código PIX copiado!");
};
