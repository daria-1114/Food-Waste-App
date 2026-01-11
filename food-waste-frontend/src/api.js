import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api", // make sure your backend runs here
});
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
// Auth
export const registerUser = (data) => API.post(`/users/register`, data);
export const loginUser = (data) => API.post(`/users/login`, data);

// Food
export const getFoods = () => API.get(`/foods`);       // GET all foods
export const createFood = (data) => API.post(`/foods`, data); // POST new food
export const shareFood = (foodId) => API.post(`/foods/${foodId}/share`);
export const toggleAvailability = (foodId) => API.patch(`/foods/${foodId}/toggle`);
export const unshareFood = (foodId) => API.post(`/foods/${foodId}/unshare`);
export const deleteFood = (foodId) => API.delete(`/foods/${foodId}`);

// Groups (if you want later)
export const createGroup = (data) => API.post(`/groups`, data);;
export const getGroups =() => API.get(`/groups`);
export const getGroupMembers = (groupId) =>
  API.get(`/groups/${groupId}/members`);
export const deleteGroup = (groupId) =>API.delete(`/groups/${groupId}`);

//adding people to group
export const findUserByEmail = (email) =>API.get(`/users/search?email=${email}`);
export const addUserToGroup = (groupId, userId) => 
  API.post(`/groups/${groupId}/addUser/${userId}`);