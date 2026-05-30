import { useState,useEffect } from "react";
import {Link , useNavigate} from "react-router-dom"
import API from "../utils/api";
import '../styles/Cart.css'

const Cart=()=>{
  const [cart,setCart]=useState([]);
  const [loading,setLoading]=useState(true);
  const navigate=useNavigate();

  const fetchCart=async()=>{
    try{
      const res=await API.get('/cart');
      console.log(res.data.cart)
      console.log(res.data.cart.items[0])
      setCart(res.data.cart.items||[]);
    }
    catch(error){
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchCart();
  },[]);

  const removeItem=async (productId)=>{
    try{
      await API.delete(`/cart/remove/${productId}`);
      fetchCart();
    }
    catch(error){
      console.log(error);
    }
  };

  const updateQuantity=async (productId,quantity,size)=>{
    try{
      await API.put(`/cart/update/${productId}`,{quantity,size});
      fetchCart();
    }
    catch(error){
      console.log(error);
    }
  };

  const total=cart.filter(item =>item.product !== null).reduce((sum,item)=>sum+(item.product?.price || 0) * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>My Cart</h2>

      {loading && <p>Loading...</p>}
      {cart.length===0 && !loading && (
        <div className="cart-empty">
          <p>Cart is Empty!</p>
          <Link to="/products">Explore Products →</Link>
        </div>
        
      )}
      {cart.filter(item => item.product !== null).map((item)=>(
        <div className="cart-item" key={item._id}>
            <img src={item.product.images?.[0]|| 'https://placehold.co/80x80?text=No+Image'} alt={item.product.name} />
            <div className="cart-item-info">
                <h3>{item.product.name}</h3>
                <p>Size : {item.size}</p>
                <p>₹{item.product.price}</p>
            </div>
            <div className="cart-item-actions">
              <button onClick={()=>updateQuantity(item.product._id,item.quantity-1,item.size)} disabled={item.quantity===1}>-</button>
              <span>{item.quantity}</span>
               <button onClick={() => updateQuantity(item.product._id, item.quantity + 1,item.size)}>+</button>
            </div> 
            <button className="remove-btn" onClick={()=>removeItem(item.product._id)}>Remove</button> 
        </div>
      ))}

      {cart.length >0 && (
        <div className="cart-total">
          <h3>Total : ₹{total}</h3>
          <button className="checkout-btn" onClick={()=>navigate('/checkout')}>Proceed to Checkout</button>
        </div>  
      )}
    </div>
  );
};

export default Cart;