import { Invoice } from '@/app/admin/lib/mock/invoice';

export function calculateTotalPaid(invoices: Invoice[]): number {
    return invoices
        .filter(invoice => invoice.status === "Paid")
        .reduce((sum, invoice) => sum + invoice.grandTotal, 0);
}

export function calculateTotalUnpaid(invoices: Invoice[]): number {
    return invoices
        .filter(invoice => invoice.status === "Pending")
        .reduce((sum, invoice) => sum + invoice.grandTotal, 0);
}

export function calculateTotalOverdue(invoices: Invoice[]): number {
    return invoices
        .filter(invoice => invoice.status === "Overdue")
        .reduce((sum, invoice) => sum + invoice.grandTotal, 0);
}

export function getLastUpdateDate(): string {
    const now = new Date();
    return now.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
} 