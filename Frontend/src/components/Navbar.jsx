import {Link , useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css'
const Navbar=()=>{
  const {user,logout,isAdmin}=useAuth();
  const navigate =useNavigate();
  const handleLogout=()=>{
    logout();
    navigate('/');
  }
  return (
    <nav className='navbar'>
      <Link to="/">
        👟 ShoesStore
      </Link>
      <div>
        <Link to="/products">Products</Link>
        {user?(
          <>
          <Link to="/cart">Cart</Link>
          <Link to="/wishlist">❤️ Wishlist</Link>
          <Link to="/my-orders">My Orders</Link>
          {isAdmin && <Link to="/admin">Admin Panel</Link>}
          <span>Hi, {user.name}</span>
          <button onClick={handleLogout} className='logout-btn'>Logout</button>
          </>
          ):(
            <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          </>
          )}
      </div>
    </nav>
  )
}
export default Navbar;