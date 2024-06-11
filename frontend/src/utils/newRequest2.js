import axios from "axios";

const newRequest2 = axios.create({
  baseURL: `${process.env.REACT_APP_COMPILER_URL}`,
  withCredentials: true,
});

export default newRequest2;
