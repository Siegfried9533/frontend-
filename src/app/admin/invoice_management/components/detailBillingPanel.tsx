"use client";
import { Invoice } from '@/app/admin/lib/mock/invoice';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';

interface DetailBillingPanelProps {
    invoice: Invoice;
}

export function DetailBillingPanel({ invoice }: DetailBillingPanelProps) {
    return (
        <Card className="p-6">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Hóa đơn #{invoice.invoiceID}</h2>
                        <p className="text-sm text-gray-500">Ngày lập: {invoice.invoiceDate}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Mã đơn hàng</p>
                        <p className="font-medium">{invoice.orderID}</p>
                    </div>
                </div>

                <Separator />

                {/* Thông tin liên quan */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Thông tin khách hàng</h3>
                        <div className="space-y-1">
                            <p className="text-sm">
                                <span className="font-medium">Mã khách hàng:</span> {invoice.customerID}
                            </p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Thông tin nhân viên</h3>
                        <div className="space-y-1">
                            <p className="text-sm">
                                <span className="font-medium">Mã nhân viên:</span> {invoice.employeeID}
                            </p>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Chi tiết thanh toán */}
                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Chi tiết thanh toán</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tổng tiền hàng</span>
                            <span className="font-medium">{formatCurrency(invoice.totalAmount)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Giảm giá</span>
                            <span className="font-medium text-red-600">-{formatCurrency(invoice.discount)}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between text-base">
                            <span className="font-medium">Thành tiền</span>
                            <span className="font-bold text-blue-600">{formatCurrency(invoice.grandTotal)}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-gray-500">
                    <p>Cảm ơn quý khách <br /> đã sử dụng dịch vụ của chúng tôi!</p>
                    <p>Liên hệ hotline: 1900-1539</p>
                </div>
            </div>
        </Card>
    );
}