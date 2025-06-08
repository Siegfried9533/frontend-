import { Invoice } from '@/app/admin/lib/mock/invoice';

// API Response Types
export interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// API Request Types
export interface GetInvoicesParams {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: Invoice['status'];
    startDate?: string;
    endDate?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface UpdateInvoicePayload {
    customerID: string;
    employeeID: string;
    orderID: string;
    invoiceDate: string;
    totalAmount: number;
    discount: number;
    grandTotal: number;
    status: Invoice['status'];
}

// API Error Types
export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, string[]>;
}

// API Endpoints
export const API_ENDPOINTS = {
    INVOICES: {
        LIST: '/api/invoices',
        DETAIL: (id: string) => `/api/invoices/${id}`,
        CREATE: '/api/invoices',
        UPDATE: (id: string) => `/api/invoices/${id}`,
        DELETE: (id: string) => `/api/invoices/${id}`,
    },
} as const;

// API Query Keys
export const QUERY_KEYS = {
    INVOICES: {
        ALL: 'invoices',
        DETAIL: (id: string) => ['invoice', id],
        LIST: (params: GetInvoicesParams) => ['invoices', params],
    },
} as const; 