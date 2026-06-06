import {Link , useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import '../styles/Navbar.css'
const Navbar=()=>{
  const {user,logout,isAdmin}=useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate =useNavigate();
  const handleLogout=()=>{
    logout();
    navigate('/');
  }
  // return (
  //   <nav className='navbar'>
  //     <Link to="/">
  //       👟 Gupta Shoes Emporium
  //     </Link>
  //     <div>
  //       <Link to="/products">Products</Link>
  //       {user?(
  //         <>
  //         <Link to="/cart">Cart</Link>
  //         <Link to="/wishlist">❤️ Wishlist</Link>
  //         <Link to="/my-orders">My Orders</Link>
  //         {isAdmin && <Link to="/admin">Admin Panel</Link>}
  //         <span>Hi, {user.name}</span>
  //         <button onClick={handleLogout} className='logout-btn'>Logout</button>
  //         </>
  //         ):(
  //           <>
  //         <Link to="/login">Login</Link>
  //         <Link to="/register">Register</Link>
  //         </>
  //         )}
  //     </div>
  //   </nav>
  //)
  return (
  <nav className="navbar">
    <Link to="/" className="navbar-logo">👟 Gupta Shoes Emporium</Link>

    
    <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
      {menuOpen ? '✕' : '☰'}
    </button>

   
    <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
      <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>

      {user ? (
        <>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>🛒 Cart</Link>
          <Link to="/wishlist" onClick={() => setMenuOpen(false)}>❤️ Wishlist</Link>
          <Link to="/my-orders" onClick={() => setMenuOpen(false)}>My Orders</Link>          {isAdmin && <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin Panel</Link>}
          <span>Hi, {user.name}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
        </>
      )}
    </div>
  </nav>);
}
export default Navbar;