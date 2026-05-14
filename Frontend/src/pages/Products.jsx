import { useState,useEffect } from "react";
import API from "../utils/api";
import { Link } from "react-router-dom";
import "../styles/Product.css"

const Products=()=>{
  const[products,setProducts]=useState([]);
  const[loading,setLoading]=useState(true);
  const[error,setError]=useState('');
  const[filters,setFilters]=useState({
    category:'',
    minPrice:'',
    maxPrice:'',
    size:''
  });


  const fetchProducts=async()=>{
    try {
      setLoading(true);
      const res=await API.get('/products',{params:filters});
      console.log(res.data.products[0]);
      setProducts(res.data.products);
    } catch (error) {
      setError('Product load nahi hue hai')
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchProducts();
  },[filters])

  return (
    <div>
      <h2>All Products</h2>
      
      <div className="filters">
        <select value={filters.category} onChange={(e)=>setFilters({...filters,category:e.target.value})}>
          <option value="">All Categories</option>
          <option value="running">Running</option>
          <option value="formal">Formal</option>
          <option value="sandal">Sandal</option>
          <option value="kids">Kids</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e)=>setFilters({...filters,minPrice:e.target.value})} />

        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e)=>setFilters({...filters,maxPrice:e.target.value})} />

        <select value={filters.size}
          onChange={(e)=>setFilters({...filters,size:e.target.value})}>
            <option value="">All Sizes</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>

      </div>




      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="products-grid">
        {products.map((product)=>(
          <Link to={`/products/${product._id}`} key={product._id}>
            
            <div className="product-card">
              <img 
                  src={product.images?.[0] || 'https://placehold.co/220x180?text=No+Image'} 
                  alt={product.name} 
              />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Products