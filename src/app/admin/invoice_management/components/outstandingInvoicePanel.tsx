"use client";
import { Card } from "@/components/ui/card";
import { Invoice } from "@/app/admin/lib/mock/invoice";
import { formatCurrency } from "@/lib/utils";
import { AlertCircle, Clock, CheckCircle2 } from "lucide-react";

interface OutstandingInvoicePanelProps {
    invoices: Invoice[];
}

export function OutstandingInvoicePanel({ invoices }: OutstandingInvoicePanelProps) {
    // Lọc các hóa đơn chưa thanh toán (giả định status là "Pending")
    const outstandingInvoices = invoices.filter(inv => inv.status === "Pending");

    return (
        <Card className="p-4">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Hóa đơn chưa thanh toán</h3>
                    <span className="text-sm text-gray-500">{outstandingInvoices.length} hóa đơn</span>
                </div>

                <div className="space-y-3">
                    {outstandingInvoices.map((invoice) => (
                        <div
                            key={invoice.invoiceID}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-yellow-500" />
                                    <span className="font-medium">{invoice.invoiceID}</span>
                                </div>
                                <p className="text-sm text-gray-500">
                                    {invoice.invoiceDate}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-red-600">
                                    {formatCurrency(invoice.grandTotal)}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {invoice.customerID}
                                </p>
                            </div>
                        </div>
                    ))}

                    {outstandingInvoices.length === 0 && (
                        <div className="text-center py-6 text-gray-500">
                            <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-500" />
                            <p>Không có hóa đơn chưa thanh toán</p>
                        </div>
                    )}
                </div>

                <div className="pt-4 border-t">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Tổng số tiền:</span>
                        <span className="font-semibold text-red-600">
                            {formatCurrency(
                                outstandingInvoices.reduce((sum, inv) => sum + inv.grandTotal, 0)
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );
}