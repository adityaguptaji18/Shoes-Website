import { useState , createContext , useContext, useEffect } from "react";
import API from "../utils/api";

const AuthContext=createContext();

const AuthProvider=({children})=>{
  const [user,setUser]=useState(null);
  const [token,setToken]=useState(localStorage.getItem('token')||null);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    if(token){
      API.defaults.headers.common['Authorization']=`Bearer ${token}`;
      const savedUser=JSON.parse(localStorage.getItem('user'));
      setUser(savedUser);
    }
    setLoading(false);
  },[]);


  const login=async(email,password)=>{
    const res=await API.post('/auth/login',{email,password});
    const{token,user}=res.data;
    localStorage.setItem('token',token);
    localStorage.setItem('user',JSON.stringify(user));
    API.defaults.headers.common['Authorization']=`Bearer ${token}`;
    setToken(token);
    setUser(user);
  };

  const register =async(name,email,password)=>{
    const res=await API.post('/auth/register',{name,email,password});
    return res.data;
  };

  const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete API.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  const isAdmin=user?.role==='admin';

  return (
    <AuthContext.Provider value={{user,token,loading,login,register,logout,isAdmin}}>
      {!loading&& children}
    </AuthContext.Provider>
  );

};

export const useAuth=()=>useContext(AuthContext);

export{AuthProvider};