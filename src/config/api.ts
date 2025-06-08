export const API_BASE_URL = 'http://localhost:8080/api';

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/signin',
        REGISTER: '/auth/signup',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
    },
    USER: {
        PROFILE: '/user/profile',
        UPDATE: '/user/update',
    },
    BOOKS: {
        LIST: '/books',
        DETAIL: (id: number) => `/books/${id}`,
    },
    CART: {
        GET: '/cart',
        ADD_ITEM: '/cart/items',
        UPDATE_ITEM: (id: number) => `/cart/items/${id}`,
        REMOVE_ITEM: (id: number) => `/cart/items/${id}`,
    },
    ORDERS: {
        LIST: '/orders',
        CREATE: '/orders',
        DETAIL: (id: number) => `/orders/${id}`,
    },
}; 