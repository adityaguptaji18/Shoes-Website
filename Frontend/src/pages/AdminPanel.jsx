import { useState,useEffect } from "react";

import API from "../utils/api";
import { useAuth } from "../context/AuthContext";
import "../styles/AdminPanel.css"
const AdminPanel=()=>{
  const [products , setProducts] = useState([]);
  const [orders , setOrders]=useState([]);
  const [activeTab,setActiveTab]=useState('products')
  const [loading,setLoading]=useState(true);
  const [name,setName] = useState('');
  const [price,setPrice] = useState('');
  const [description,setDescription] = useState('');
  const [category,setCategory] = useState('');
  const [sizes,setSizes] = useState('');
  const [image,setImage] = useState(null);

  const {user}=useAuth();

  const fetchProducts=async()=>{
    try {
      const res=await API.get('/products');
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrders=async()=>{
    try {
      const res=await API.get('/orders/all');
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchOrders();
    fetchProducts();
  },[]);

  const handleAddProduct=async(e)=>{
    e.preventDefault();
    try {
      const formData=new FormData();
      formData.append('image',image);
      const uploadRes=await API.post('/upload',formData);
      const imageUrl=uploadRes.data.url;

      await API.post('/products',{
        name,
        price:Number(price),
        description,
        category,
        sizes:sizes.split(',').map(s=>s.trim()),
        images:[imageUrl]
      });
      alert('Product Added!');
      fetchProducts();
      setName('');
      setPrice('');
      setDescription('');
      setCategory('');
      setSizes('');
      setImage(null);
    } catch (error) {
      console.log(error);
      alert("Product is not added!")
    }
  };

  const handleDeleteProduct=async(productId)=>{
    try {
      await API.delete(`/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  }
  const handleUpdateOrderStatus=async(orderId,status)=>{
    try {
      await API.put(`/orders/${orderId}`,{status});
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <div className="admin-container">
      <h2>Admin Panel</h2>

      <div className="admin-tabs">
        <button className={activeTab==='products'?'tab active':'tab'} onClick={()=>setActiveTab('products')}>Products</button>

        <button className={activeTab==='orders'?'tab active':'tab'} onClick={()=>setActiveTab('orders')}>Orders</button>
      </div>

      {activeTab === 'products' && (
        <div>
          <form onSubmit={handleAddProduct} className="add-product-form">
            <h3>Add New Product</h3>
            <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
            <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <input placeholder="Sizes (6,7,8,9)" value={sizes} onChange={(e) => setSizes(e.target.value)} />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <button type="submit">Add Product</button>
          </form>

          <h3>All Products</h3>
          {products.map((product)=>(
            <div className="admin-product-item" key={product._id}>
              <span>{product.name}</span>
              <span>₹{product.price}</span>
              <button onClick={() => handleDeleteProduct(product._id)} className="delete-btn">Delete</button>
            </div>
          ))}
        </div>
      )}

      {activeTab==='orders' &&(
        <div>
          <h3>All Orders</h3>
          {loading && <p>Loading...</p>}
          {orders.map((order) => (
            <div className="admin-order-item" key={order._id}>
              <p>Order ID: {order._id}</p>
              <p>Total: ₹{order.totalAmount}</p>
              <p>Status: {order.status}</p>
              <select 
              value={order.status}
              onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
        </div>
      ))}
    </div>
  )}
  </div>
  )
}

export default AdminPanel