import axios from 'axios';

const baseURL = "http://localhost:5000/api";

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accesstoken');
    if(token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const { data } = await axiosInstance.get("/auth/refresh-token");
        localStorage.setItem("accesstoken", data.accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        // Clear user-specific cart
        const userId = localStorage.getItem("userId");
        if (userId) {
          const userCartKey = `eliteCafeCart_${userId}`;
          localStorage.removeItem(userCartKey);
        }
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;