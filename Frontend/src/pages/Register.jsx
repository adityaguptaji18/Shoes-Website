import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Register=()=>{
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error, setError] = useState('');

  const {register} =useAuth();
  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      await register(name,email,password);
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }

  }
  
  return (
  <div className="auth-container">
    <div className="auth-box">
      <div className="auth-logo">👟</div>
      <h2>Create Account</h2>
      <p className="auth-subtitle">Join Gupta Shoes Emporium — Start Shopping!</p>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Full Name</label>
          <input type="text" placeholder="Aditya Gupta" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="aditya@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Min 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="auth-btn">Create Account →</button>

        <p className="auth-link">Already have an account? <Link to="/login">Login here</Link></p>
      </form>
    </div>
  </div>
);
}

export default Register
