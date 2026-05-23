import { Link } from "react-router-dom";
import { useState ,useEffect } from "react";
import API from "../utils/api";
import "../styles/WishList.css"
const WishList=()=>{
  const [loading,setLoading]=useState(true);
  const [wishList,setWishList]=useState([]);

  const fetchWishList=async()=>{
    try {
      const res=await API.get('/wishlist');
      console.log(res.data);
      setWishList(res.data.wishList.products||[]);
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchWishList();
  },[]);

  const removeWishList=async(productId)=>{
    try {
      await API.delete(`/wishlist/remove/${productId}`);
      fetchWishList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wishlist-container">
      <h2>My WishList</h2>
      {loading && <p>Loading...</p>}

      {wishList.length===0 && !loading && (
        <div className="wishlist-empty">
          <p>WishList is Empty!</p>
          <Link to="/products">Explore Products →</Link>
        </div>
      )}

      <div className="wishlist-grid">
        {wishList.map((item)=>(
          <div className="wishlist-card" key={item._id}>
            <img src={item.images?.[0] || 'https://placehold.co/200x200?text=No+Image'} alt={item.name} />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <div className="wishlist-actions">
              <Link to={`/products/${item._id}`}>View Product</Link>
              <button onClick={()=>removeWishList(item._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WishList