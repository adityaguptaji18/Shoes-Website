
import {BrowserRouter, Routes , Route , Navigate} from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from "./components/Navbar"
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Products'

const Home=()=> <div>Home Page</div>
const ProductDetail=()=> <div>Product detail Page</div>
const Cart=()=> <div>Cart Page</div>
const Wishlist=()=> <div>Wishlist Page</div>
const MyOrders=()=> <div>orders Page</div>
const Admin=()=> <div>admin Page</div>

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
              <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
              <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
              <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App