import { useState , useEffect } from "react";
import API from "../utils/api";
import { Link } from "react-router-dom";
import "../styles/MyOrders.css"
const MyOrders = ()=>{
  const [orders,setOrders]=useState([]);
  const [loading,setLoading]=useState(true);

  const fetchOrders = async()=>{
    try {
      const res=await API.get('/orders/my-orders');
      console.log(res.data);
      setOrders(res.data.order||[]);
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  };
  useEffect(()=>{
    fetchOrders();
  },[]);

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      {loading && <p>Loading...</p>}
      {orders.length===0 && !loading && (
        <div className="orders-empty">
          <p>No Orders Placed!</p>
          <Link to="/products">Continue Shopping →</Link>
        </div>
      )}

      {orders.map((order)=>(
        <div className="order-card" key={order._id}>
          <div className="order-header">
            <span>Order ID: {order._id.slice(-6).toUpperCase()}</span>
            <span className={`order-status ${order.status}`}>{order.status}</span>
          </div>
          <div className="order-items">
            {order.items.filter(item=>item.product!==null).map((item)=>(
              <div className="order-item" key={item._id}>
                <span>{item.product?.name}</span>
                <span>Size: {item.size}</span>
                <span>Qty: {item.quantity}</span>
                <span>₹{item.product?.price}</span>
              </div>
            ))}
          </div>
          <div className="order-footer">
            <span>Total: ₹{order.totalAmount}</span>
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
export default MyOrders