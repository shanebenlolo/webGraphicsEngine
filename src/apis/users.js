// generic api boilerpalte
import Axios from "axios";

export async function getAllUsers() {
  const url = `http://localhost:5000/users`;
  const response = await Axios.get(url);
  return new Promise((resolve) => resolve(response.data));
}

export async function deleteAllUsers() {
  const url = `http://localhost:5000/users`;
  const response = await Axios.delete(url);
  return new Promise((resolve) => resolve(response.data));
}

export async function getUser(email) {
  const url = `http://localhost:5000/users/${email}`;
  const response = await Axios.delete(url);
  return new Promise((resolve) => resolve(response.data));
}

export async function deleteUser(email) {
  const url = `http://localhost:5000/users/${email}`;
  const response = await Axios.delete(url);
  return new Promise((resolve) => resolve(response.data));
}

export async function createUser(email, password, name) {
  const params = new URLSearchParams();
  params.append("email", email);
  params.append("password", password);
  params.append("name", name);
  const url = `http://localhost:5000/users/create-user`;
  const response = await Axios.post(url, { params });
  return new Promise((resolve) => resolve(response.data));
}

export async function loginUser(email, password) {
  const params = new URLSearchParams();
  params.append("email", email);
  params.append("password", password);
  const url = `http://localhost:5000/users/login`;
  const response = await Axios.post(url, { params });
  console.log("response");
  console.log(response);
  return new Promise((resolve) => resolve(response.data));
}
