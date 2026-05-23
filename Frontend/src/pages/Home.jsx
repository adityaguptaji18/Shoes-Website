import { useState,useEffect } from "react";
import API from "../utils/api";
import { Link } from "react-router-dom";
import "../styles/Home.css"
const Home=()=>{
  const [featuredProducts,setFeaturedProducts]=useState([]);
  const fetchFeaturedProducts=async()=>{
    try {
      const res=await API.get('/products');
      setFeaturedProducts(res.data.products.slice(0,4));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchFeaturedProducts();
  },[])

  return(
    <div className="home-container">

      <div className="hero">
        <div className="hero-content">
          <h1>Step Into Style 👟</h1>
          <p>Premium shoes for every occasion — Running, Formal, Casual & more!</p>
          <Link to="/products" className="hero-btn">Shop Now →</Link>
        </div>
      </div>

      <div className="featured-section">
        <h2>Featured Products</h2>
        <div className="featured-grid">
          {featuredProducts.map((product)=>(
            <Link to={`/products/${product._id}`} key={product._id} className="featured-card">
              <img src={product.images?.[0] || 'https://placehold.co/220x180?text=No+Image'} alt={product.name} />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              </Link>

          ))}
        </div>
        <div className="view-all">
          <Link to="/products" className="view-all-btn">View All Products →</Link>
        </div>
      </div>
    </div>
  )
}

export default Home