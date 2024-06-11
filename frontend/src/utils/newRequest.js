import axios from "axios";

const newRequest = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT_1}/api`,
  withCredentials: true,
});

export default newRequest;
