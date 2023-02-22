import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import HeaderNav from './components/HeaderNav';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Shop from './pages/Shop';
import ShopDetail from './pages/ShopDetail';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './ProtectedRoute';
import Profile from './pages/Profile';
import CreateProduct from './pages/CreateProduct';
import Order from './pages/Order';
import OrdersList from './pages/OrdersList';

function App() {
  return (
    <div>
      <HeaderNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/page/:pageNumber" element={<Shop />} />
        <Route path="/shop/:keyword/page/:pageNumber" element={<Shop />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/create-product"
          element={<ProtectedRoute component={<CreateProduct />} />}
        />
        <Route
          path="/checkout"
          element={<ProtectedRoute component={<Checkout />} />}
        />
        <Route
          path="/orders"
          element={<ProtectedRoute component={<OrdersList />} />}
        />
        <Route
          path="/order/:id"
          element={<ProtectedRoute component={<Order />} />}
        />
        <Route path="/shop/:id" element={<ShopDetail />} />
      </Routes>
      <Footer />
      <ToastContainer />
      <a href="#" class="btn btn-primary back-to-top">
        <i class="fa fa-angle-double-up"></i>
      </a>
    </div>
  );
}

export default App;
