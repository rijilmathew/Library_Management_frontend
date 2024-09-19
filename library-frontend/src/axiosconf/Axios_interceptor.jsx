import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

// Request interceptor to include access token
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => { 
        return Promise.reject(error);
     }
);

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token');
            console.log('inter...',refreshToken)
            
            if (!refreshToken) {
                console.error('No refresh token found');
                return Promise.reject(error);
            }

            try {
                const refreshResponse = await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh: refreshToken });
                const accessToken = refreshResponse.data.access;
                
                // if (!accessToken) {
                //     console.error('New access token not found in response');
                //     return Promise.reject(error);
                // }
                console.log('.....',accessToken)
                localStorage.setItem('access_token', accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                
                return axios(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token failed:', refreshError);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                // Optionally, redirect to login page
                window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);

export default api;
