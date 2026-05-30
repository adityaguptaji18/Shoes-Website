
import {BrowserRouter, Routes , Route , Navigate} from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from "./components/Navbar"
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import WishList from './pages/WishList'
import AdminPanel from './pages/AdminPanel'
import Home from './pages/Home'
import MyOrders from './pages/MyOrders'
import Checkout from './pages/Checkout'

// const MyOrders=()=> <div>orders Page</div>


const ProtectedRoute=({children})=>{
  const {user}=useAuth();
  return user?children:<Navigate to="/login" />
};

const AdminRoute=({children})=>{
  const {user, isAdmin}=useAuth();

  return user && isAdmin ? children : <Navigate to="/" />
};

function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/wishList" element={<ProtectedRoute><WishList /></ProtectedRoute>} />
              <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
              <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
              <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App