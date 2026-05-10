import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
  <div>
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}
      />
      <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} 
      />

      {error && <p>{error}</p>}

      <button type="submit">Login</button>

      <p>Account nahi hai? <Link to="/register">Register karo</Link></p>
    </form>
  </div>
);

}

export default Login
