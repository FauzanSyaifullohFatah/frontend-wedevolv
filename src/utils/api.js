import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_URL = `${BASE_URL}/api/`;

const API = axios.create({ baseURL: API_URL });

API.interceptors.request.use((config) => {
  const token = getAccessToken();

  const isLoginRequest = config.url.includes("login");

  if (token && !isLoginRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url.includes("login");

    if (error.response?.status === 401 && !isLoginRequest) {
      removeAccessToken();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

function putAccessToken(accessToken) {
  return localStorage.setItem("accessToken", accessToken)
}

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function removeAccessToken() {
  localStorage.removeItem("accessToken");
}

async function login(form) {
  try {
    const res = await API.post("login/", form);
    putAccessToken(res.data.access);
    
    const user = await getUserLogged(); 
    return user;
  } catch(err) {
    const error = err.response?.data?.error;
    throw error || "Terjadi kesalahan";
  }
}

async function register(form) {
  try {
    const res = await API.post("register/", form);
    return res.data;
  } catch (err) {
    const errors = err.response?.data;

    if (errors) {
      const firstError = Object.values(errors)[0][0];
      throw firstError;
    }

    throw "Terjadi kesalahan";
  }
}

async function getUserLogged() {
  try {
    const res = await API.get("profile/");
    return res.data;
  } catch (err) {
    throw err.response?.data || "gagal ambil profile";
  }
}

function logout() {
  removeAccessToken();
}

async function getProjects() {
  try {
    const res = await API.get("/projects/");
    return res.data;
  } catch (err) {
    console.error("Gagal fetch project:", err.response?.data || err);
  }
}

// async function deleteProject(id) {
//   try {
//     const res = await API.delete(`/projects/${id}`);
//     return res.data;
//   } catch (err) {
//     console.error("Gagal hapus project:", err.response?.data || err);
//     throw err;
//   }
// }

async function getCertificates() {
  try {
    const res = await API.get("/certificates/");
    return res.data;
  } catch (err) {
    console.error("Gagal fetch certificate:", err.response?.data || err);
  }
}

async function getPortfolio( username ) {
  try {
    const res = await API.get(`/portfolio/${username}/`);
    return res.data;
  } catch (err) {
    console.error("Gagal fetch portfolio:", err.response?.data || err);
  }
}

export {
  API,
  API_URL,
  BASE_URL,
  putAccessToken,
  getAccessToken,
  removeAccessToken,
  login,
  register,
  getUserLogged,
  logout,
  getProjects,
  getCertificates,
  getPortfolio,
};