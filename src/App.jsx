import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
//pages
import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import ProductDetails from "./pages/products/ProductDetails"
import CartPage from "./pages/cart/CartPage"
import CheckoutPage from "./pages/cart/CheckoutPage"
import OrderConfirmationPage from "./pages/cart/OrderConfirmationPage"
import AddProductPage from "./pages/admin/AddProductPage"
import AdminOrdersPage from "./pages/admin/AdminOrdersPage"
import CategoryPage from "./pages/products/CategoryPage"
import AdminProductListPage from "./pages/admin/AdminProductListPage"
import AdminEditProductPage from "./pages/admin/AdminEditProductPage"
import AdminDashboardPage from "./pages/admin/AdminDashboardPage"
import ProfilePage from "./pages/user/ProfilePage"
import UserOrdersPage from "./pages/orders/UserOrdersPage"
import OrderDetailsPage from "./pages/orders/OrderDetailsPage"
//components
import Header from './components/common/Header'
import Footer from "./components/common/Footer"
import AdminRoute from "./components/auth/AdminRoute"
import ScrollToTop from "./components/common/ScrollToTop"
//cart
import { CartProvider } from "./context/CartContext"

function App() {
    return (
        <CartProvider>
            <Router>
                <ScrollToTop />
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/perfil" element={<ProfilePage />} />
                    <Route path="/category" element={<CategoryPage />} />
                    <Route path="/produtos/:id" element={<ProductDetails />} />
                    <Route path="/carrinho" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/userOrder" element={<UserOrdersPage />} />
                    <Route path="/pedido/:id" element={<OrderDetailsPage />} />
                    <Route path="/pedido/:orderId/confirmado" element={<OrderConfirmationPage />} />
                    
                    <Route
                        path="/adminDashboard"
                        element={
                            <AdminRoute>
                                <AdminDashboardPage />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/adminOrdersPage"
                        element={
                            <AdminRoute>
                                <AdminOrdersPage />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/admin/products"
                        element={
                            <AdminRoute>
                                <AdminProductListPage />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/createProduct"
                        element={
                            <AdminRoute>
                                <AddProductPage />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/admin/product/:id"
                        element={
                            <AdminRoute>
                                <AdminEditProductPage />
                            </AdminRoute>
                        }
                    />
                </Routes>
                <Footer />
            </Router>
        </CartProvider>
    );
}

export default App;
