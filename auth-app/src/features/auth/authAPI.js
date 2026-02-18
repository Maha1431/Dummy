import axios from "axios";

const API_URL = "http://65.0.29.192:5000";

export const signupUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/api/auth/signup`,
    userData
  );
  console.log(response.data);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/api/auth/login`,
    userData
  );
  return response.data;
};
