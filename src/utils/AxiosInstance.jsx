import axios from 'axios';

const Api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, 
  withCredentials: true,
});

Api.interceptors.request.use(
  (config) => config,
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('Response Interceptor Triggered:', error);

    const originalRequest = error.config;

    if (error.response?.status === 500) {
      console.error('Server error occurred:', error.response.data);
      alert('An unexpected error occurred. Please try again later.');
    }

    if (
      (error.response?.status === 403 || error.response?.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth/refreshtoken`,
          {},
          { withCredentials: true }
        );

        return Api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        alert('Your session has expired. Please sign in again.');
        window.location.href = '/sign-in';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default Api;
