import axios from 'axios';

const Api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, 
  withCredentials: true, 
});

// Request Interceptor
Api.interceptors.request.use(
  (config) => config,
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 && 
      !originalRequest._retry 
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth/refreshtoken`,
          {}, 
          { withCredentials: true }
        );

        originalRequest.headers.Authorization = `Bearer ${data.accesstoken}`;
        return Api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        alert('Your session has expired. Please sign in again.');
        window.location.href = '/sign-in';
        return Promise.reject(refreshError);
      }
    }

    console.error('Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default Api;
