import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API = axios.create({
  baseURL: `${BASE_URL}/api/`,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) return Promise.reject(error);

    const isLoginRequest = originalRequest.url.includes("auth/login/");
    const isRefreshRequest = originalRequest.url.includes("auth/refresh/");

    if (isRefreshRequest) {
      isRefreshing = false;
      
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 && 
      !originalRequest._retry && 
      !isLoginRequest
    ) {
      
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(API(originalRequest)),
            reject: (err) => reject(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axios.post(`${BASE_URL}/api/auth/refresh/`, {}, { withCredentials: true });
        
        processQueue(null);
        return API(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        const isInitialCheck = originalRequest.url.includes("auth/profile/");

        if (!isInitialCheck && window.location.pathname !== '/login') {
          window.location.href = "/login?reason=expired";
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

async function getUserLogged() {
  try {
    const res = await API.get("auth/profile/");
    return res.data.payload;
  } catch (err) {
    return null; 
  }
}

async function login(form) {
  try {
    await API.post("auth/login/", form);
    const user = await getUserLogged();
    return user;
  } catch (err) {
    const error = err.response?.data?.message;
    throw error || "server_error";
  }
}

async function logout() {
  try {
    await API.post("auth/logout/");
  } catch (err) {
    console.error(err?.response?.data);
  }
}

async function register(form) {
  try {
    const res = await API.post("auth/register/", form);
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

async function getProjects() {
  try {
    const res = await API.get("projects/");
    return res.data?.payload;
  } catch (err) {
    console.error(err?.response?.data);
  }
}

async function getCertificates() {
  try {
    const res = await API.get("certificates/");
    return res.data.payload;
  } catch (err) {
    console.error("Gagal fetch certificate:", err.response?.data || err);
  }
}

async function getPortfolio(username) {
  try {
    const res = await API.get(`auth/portfolio/${username}/`);
    return res.data.payload;
  } catch (err) {
    console.error(err.response?.data);
  }
}

async function getAllUsers() {
  try {
    const res = await API.get("auth/users/");
    return res.data.payload;
  } catch (err) {
    console.error(err.response?.data);
    throw err.response?.data || "Failed to retrieve user list";
  }
}

export {
  BASE_URL,
  API,
  login,
  logout,
  register,
  getUserLogged,
  getProjects,
  getCertificates,
  getPortfolio,
  getAllUsers,
};