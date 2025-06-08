import { apiService } from './api';
import { API_ENDPOINTS } from '@/config/api';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    id: number;
    username: string;
    roles: string[];
    jwtToken: string;
}

export interface User {
    id: number;
    username: string;
    roles: string[];
}

class AuthService {
    async login(data: LoginRequest): Promise<LoginResponse> {
        const response = await apiService.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
        if (response.jwtToken) {
            localStorage.setItem('token', response.jwtToken);
            localStorage.setItem('user', JSON.stringify(response));
        }
        return response;
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }

    getCurrentUser(): User | null {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}

export const authService = new AuthService(); 