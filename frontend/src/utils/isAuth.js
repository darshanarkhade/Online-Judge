// src/utils/isAuth.js
import newRequest from './newRequest';

const isAuth = async () => {
  try {
    const response = await newRequest.get('/isAuth');
    console.log('Response:', response);
    return response.data; // Assuming response.data contains authentication status or token

  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false;
  }
};

export default isAuth;
