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
  
  return(
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}
      />
      <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} 
      />
      {error && <p>{error}</p>}
      <button type="submit">Register</button>

      <p>Account ban gaya <Link to="/login">Login karo</Link></p>
      </form>
    </div>
  )

}

export default Register
