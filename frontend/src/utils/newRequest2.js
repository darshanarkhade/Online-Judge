import axios from "axios";

const newRequest2 = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT_2}`,
  withCredentials: true,
});

export default newRequest2;
