import axios from "axios";

const newRequest2 = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export default newRequest2;