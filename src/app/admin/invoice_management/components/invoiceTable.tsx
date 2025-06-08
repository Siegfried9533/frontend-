"use client";
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Invoice } from '@/app/admin/lib/mock/invoice';
import { Pencil, Trash2, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface InvoiceTableProps {
    invoices: Invoice[];
    onSelectInvoice: (invoice: Invoice) => void;
    onEditInvoice: (invoice: Invoice) => void;
    onDeleteInvoice: (invoice: Invoice) => void;
}

export default function InvoiceTable({ invoices, onSelectInvoice, onEditInvoice, onDeleteInvoice }: InvoiceTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const totalPages = Math.ceil(invoices.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentInvoices = invoices.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 3;
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 2) {
                pageNumbers.push(1, 2, 3);
            } else if (currentPage >= totalPages - 1) {
                pageNumbers.push(totalPages - 2, totalPages - 1, totalPages);
            } else {
                pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
            }
        }
        return pageNumbers;
    };

    return (
        <div className="space-y-4">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-3 px-4">Mã hóa đơn</th>
                            <th className="text-left py-3 px-4">Ngày lập</th>
                            <th className="text-left py-3 px-4">Khách hàng</th>
                            <th className="text-left py-3 px-4">Tổng tiền</th>
                            <th className="text-left py-3 px-4">Trạng thái</th>
                            <th className="text-right py-3 px-4">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentInvoices.map((invoice) => (
                            <tr
                                key={invoice.invoiceID}
                                className="border-b hover:bg-gray-50 cursor-pointer"
                                onClick={() => onSelectInvoice(invoice)}
                            >
                                <td className="py-3 px-4">{invoice.invoiceID}</td>
                                <td className="py-3 px-4">{invoice.invoiceDate}</td>
                                <td className="py-3 px-4">{invoice.customerID}</td>
                                <td className="py-3 px-4">{formatCurrency(invoice.grandTotal)}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${invoice.status === "Paid" ? "bg-green-100 text-green-800" :
                                        invoice.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                                            "bg-red-100 text-red-800"
                                        }`}>
                                        {invoice.status === "Paid" ? "Đã thanh toán" :
                                            invoice.status === "Pending" ? "Chờ thanh toán" :
                                                "Quá hạn"}
                                    </span>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex justify-end gap-4">
                                        <Pencil
                                            className="h-5 w-5 text-blue-600 cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onEditInvoice(invoice);
                                            }}
                                        />
                                        <Trash2
                                            className="h-5 w-5 text-red-600 cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteInvoice(invoice);
                                            }}
                                        />
                                        <Eye
                                            className="h-5 w-5 text-green-600 cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onSelectInvoice(invoice);
                                            }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2">
                    <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Trước
                    </Button>
                    {renderPageNumbers().map((pageNum) => (
                        <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            onClick={() => handlePageChange(pageNum)}
                        >
                            {pageNum}
                        </Button>
                    ))}
                    <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Sau
                    </Button>
                </div>
            )}
        </div>
    );
}