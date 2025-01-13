import axios from 'axios';

// Create an Axios instance
const Api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Ensure the environment variable ends with a trailing slash
  withCredentials: true, // Send cookies with requests
});

// Request Interceptor: Attach the Authorization header
Api.interceptors.request.use(
  (config) => {
    // No need to access tokens in localStorage anymore, HttpOnly cookies handle it automatically
    return config;
  },
  (error) => {
    // Handle errors before the request is sent
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle errors like token expiration
Api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 && // Access token expired or unauthorized
      !originalRequest._retry // Prevent infinite loops
    ) {
      originalRequest._retry = true;

      try {
        // Refresh the token using the refresh endpoint
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth/refreshtoken`,
          {}, // Body not required if using cookies
          { withCredentials: true }
        );

        // Retry the original request with the new access token (it's managed in the cookies)
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        // Handle refresh token failure (e.g., redirect to login)
        window.location.href = '/sign-in';
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    return Promise.reject(error);
  }
);

export default Api;
