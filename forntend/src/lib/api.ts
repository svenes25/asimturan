import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // Backend root URL
  headers: {
    "Content-Type": "application/json",
  },
});

// GET isteği
api.getRequest = async (url, config = {}) => {
  const response = await api.get(url, config);
  return response;
};

// POST isteği
api.postRequest = async (url, data, config = {}) => {
  const response = await api.post(url, data, config);
  return response;
};

// PUT isteği
api.putRequest = async (url, data, config = {}) => {
  const response = await api.put(url, data, config);
  return response;
};

// DELETE isteği
api.deleteRequest = async (url, config = {}) => {
  const response = await api.delete(url, config);
  return response;
};

export default api;
