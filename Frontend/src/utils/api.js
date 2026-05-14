import axios from "axios";

const API=axios.create({
  baseURL:'https://shoes-website-ybo9.onrender.com/api'
})

export default API