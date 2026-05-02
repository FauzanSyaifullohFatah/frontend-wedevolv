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

    if (originalRequest.skipAuthRefresh) {
      return Promise.reject(error);
    }

    const isLoginRequest = originalRequest?.url?.includes("login");
    const isRefreshRequest = originalRequest?.url?.includes("refresh");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isLoginRequest &&
      !isRefreshRequest
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(API(originalRequest)),
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await API.post("auth/refresh/");
        processQueue(null);
        return API(originalRequest);
      } catch (err) {
        processQueue(err);
        window.location.href = "/login?reason=expired";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

async function login(form) {
  try {
    await API.post("auth/login/", form);
    const user = await getUserLogged();
    return user;
  } catch (err) {
    const error = err.response?.data?.error;
    throw error || "Terjadi kesalahan";
  }
}

async function logout() {
  try {
    await API.post("auth/logout/");
  } catch (err) {
    console.error(err);
  }
}

async function getUserLogged() {
  try {
    const res = await API.get("auth/profile/", { skipAuthRefresh: true });
    return res.data;
  } catch (err) {
    if (err.response?.status === 401) {
      return null;
    }

    throw err.response?.data || "Gagal ambil profile";
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
    return res.data;
  } catch (err) {
    console.error("Gagal fetch project:", err.response?.data || err);
  }
}

async function getCertificates() {
  try {
    const res = await API.get("certificates/");
    return res.data;
  } catch (err) {
    console.error("Gagal fetch certificate:", err.response?.data || err);
  }
}

async function getPortfolio(username) {
  try {
    const res = await API.get(`auth/portfolio/${username}/`);
    return res.data;
  } catch (err) {
    console.error("Gagal fetch portfolio:", err.response?.data || err);
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
};