import axios from 'axios';
type AxiosRequestConfig = Parameters<typeof axios.request>[0];
import { API_BASE_URL } from '@/config/api';

class ApiService {
    private api = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    constructor() {
        // Add request interceptor for authentication
        this.api.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Add response interceptor for error handling
        this.api.interceptors.response.use(
            (response) => {
                console.log('API Response:', response);
                return response;
            },
            async (error) => {
                console.error('API Response Error:', error.response);
                if (error.response?.status === 401) {
                    console.log('401 Unauthorized error caught by interceptor. Redirecting to /auth/sign-in');
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    // Redirect to the actual sign-in page route
                    window.location.href = '/auth/sign-in';
                } else if (error.response) {
                    // Log other API errors
                    console.error('API Error Status:', error.response.status, 'Data:', error.response.data);
                }
                return Promise.reject(error);
            }
        );
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.api.get<T>(url, config);
        return response.data;
    }

    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.api.post<T>(url, data, config);
        return response.data;
    }

    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.api.put<T>(url, data, config);
        return response.data;
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.api.delete<T>(url, config);
        return response.data;
    }
}

export const apiService = new ApiService(); 