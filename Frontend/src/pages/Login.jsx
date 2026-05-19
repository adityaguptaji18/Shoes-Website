import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import'../styles/Auth.css'

const Login=()=>{
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');

  const {login}=useAuth();
  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      await login(email,password);
      navigate('/');
    } catch (error) {
      setError('Invalid email or password');
    }
  }
  

return (
  <div className="auth-container">
    <div className="auth-box">
      <div className="auth-logo">👟</div>
      <h2>Welcome Back!</h2>
      <p className="auth-subtitle">Login to your Gupta Shoes Emporium account</p>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="auth-btn">Login →</button>

        <p className="auth-link">Don't have an account? <Link to="/register">Register here</Link></p>
      </form>
    </div>
  </div>
);

}

export default Login
