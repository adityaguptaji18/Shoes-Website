import { useState ,useEffect } from "react";
import {useParams,useNavigate} from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";
import '../styles/ProductDetail.css';

  const ProductDetail=()=>{
  const [product,setProduct]=useState(null);
  const [selectedSize,setSelectedSize]=useState('');
  const [loading,setLoading] =useState(true);

  const {id}=useParams();
  const {user}=useAuth();
  const navigate=useNavigate();

  const fetchProduct=async()=>{
    try {
      const res=await API.get(`/products/${id}`);
      console.log(res.data)
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchProduct();
  },[])

  const handleAddToCart=async()=>{
    if(!user){
      navigate('/login');
      return;
    }
    if(!selectedSize){
      alert('Please select a size!');
      return;
    }
    try{
      await API.post('/cart/add',{
        productId:product._id,
        size:selectedSize,
        quantity:1
      });
      alert('Added to Cart!');
    }
    catch(error){
      console.log(error);
    }
  };

  const handleAddToWishList=async()=>{
    if(!user){
      navigate('/login');
      return;
    }
    try {
      await API.post('/wishlist/add',{productId:product._id});
      alert('Added to WishList!');
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <div className="product-detail">
      {loading && <p>Loading...</p>}

      {product&& (
        <>

          <img src={product.images?.[0]|| 'https://placehold.co/400x400?text=No+Image'} alt={product.name} />
          <div className="product-info">
          <h2>{product.name}</h2>
          <p className="price">₹{product.price}</p>
          <p className="description">{product.description}</p>
          <p className="category">Category: {product.category}</p>

          {/* Size select */}
          <div className="sizes">
            {product.sizes?.map((size)=>(
              <button key={size}
              onClick={()=>setSelectedSize(size)}
              className={selectedSize===size?'size-btn selected':'size-btn'}
            >
            {size}
            </button>
          ))}
        </div>
      <div className="btn-group">
        <button onClick={handleAddToWishList} className="wishlist-btn">❤️ Add to Wishlist</button>
        <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
      
    </>
  )}
  </div>
)
}
export default ProductDetail
