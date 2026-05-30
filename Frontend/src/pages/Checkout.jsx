import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import '../styles/Checkout.css'

const Checkout=()=>{
  const [name,setName]=useState('');
  const [phone,setPhone] = useState('');
  const [address,setAddress] = useState('');
  const [city,setCity] = useState('');
  const [pincode,setPincode] = useState('');
  const [loading,setLoading] = useState(false);
  const [paymentMethod,setPaymentMethod] =useState('COD');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePlaceOrder=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/orders',{
        deliveryAddress:{
          name,
          phone,
          address,
          city,
          pincode
        },
        paymentMethod:paymentMethod
      });
      alert('Order Placed Successfully!');
      navigate('/my-orders');
    } catch (error) {
      console.log(error);
      alert('Order is not placed!')
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handlePlaceOrder} className="checkout-form">
        <div className="checkout-section">
          <h3>Delivery Address</h3>
          <div className="input-group">
            <label>Full Name</label>
            <input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Phone Number</label>
            <input placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div className="input-group">
            <label>Address</label>
            <input placeholder="Street address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div className="input-row">
          <div className="input-group">
            <label>City</label>
            <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Pincode</label>
            <input placeholder="Pincode" value={pincode} onChange={(e)=>setPincode(e.target.value)} required />
          </div>
        </div>
        </div>

        <div className="checkout-section">
          <h3>Payment Method</h3>
          <div payment-options>
            <label className={`payment-option ${paymentMethod === 'COD' ? 'selected' : ''}`}>
            <input type="radio" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} />
            💵 Cash on Delivery
          </label>
          <label className={`payment-option ${paymentMethod === 'UPI' ? 'selected' : ''}`}>
            <input type="radio" value="UPI" checked={paymentMethod === 'UPI'} onChange={(e) => setPaymentMethod(e.target.value)} />
            📱 UPI
          </label>
          <label className={`payment-option ${paymentMethod === 'CARD' ? 'selected' : ''}`}>
            <input type="radio" value="CARD" checked={paymentMethod === 'CARD'} onChange={(e) => setPaymentMethod(e.target.value)} />
            💳 Credit/Debit Card
          </label>
          </div>
          {paymentMethod !== 'COD' && (
            <p style={{color: '#2563eb', fontSize: '14px', marginTop: '8px'}}>
              🔄 Online payment coming soon! Please use COD for now.
            </p>
          )}
        </div>
        <button type="submit" className="place-order-btn" disabled={loading}>
        {loading ? 'Placing Order...' : 'Place Order →'}
      </button>
      </form>

    </div>
  )
}

export default Checkout
