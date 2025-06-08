import React, { useState, useEffect } from 'react';
import { Invoice } from '@/app/admin/lib/mock/invoice';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface EditInvoiceModalProps {
    open: boolean;
    invoice: Invoice | null;
    onClose: () => void;
    onSave?: (invoice: Invoice) => void;
}

const statusOptions = [
    { value: 'Pending', label: 'Chờ thanh toán' },
    { value: 'Paid', label: 'Đã thanh toán' },
    { value: 'Overdue', label: 'Quá hạn' },
];

export default function EditInvoiceModal({ open, invoice, onClose, onSave }: EditInvoiceModalProps) {
    const [form, setForm] = useState<Invoice | null>(invoice);

    useEffect(() => {
        setForm(invoice);
    }, [invoice]);

    if (!form) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: name === 'totalAmount' || name === 'discount' || name === 'grandTotal' ? Number(value) : value });
    };

    const handleStatusChange = (value: string) => {
        setForm({ ...form, status: value as Invoice['status'] });
    };

    const handleSave = () => {
        if (onSave) onSave(form);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa hóa đơn</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    <div>
                        <label className="block text-sm font-medium mb-1">Mã hóa đơn</label>
                        <Input name="invoiceID" value={form.invoiceID} onChange={handleChange} disabled />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Mã khách hàng</label>
                        <Input name="customerID" value={form.customerID} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Mã nhân viên</label>
                        <Input name="employeeID" value={form.employeeID} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Mã đơn hàng</label>
                        <Input name="orderID" value={form.orderID} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Ngày lập</label>
                        <Input name="invoiceDate" value={String(form.invoiceDate)} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Tổng tiền hàng</label>
                        <Input name="totalAmount" type="number" value={form.totalAmount} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Giảm giá</label>
                        <Input name="discount" type="number" value={form.discount} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Thành tiền</label>
                        <Input name="grandTotal" type="number" value={form.grandTotal} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Trạng thái</label>
                        <Select value={form.status} onValueChange={handleStatusChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn trạng thái" />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={onClose}>Đóng</Button>
                    <Button onClick={handleSave}>Lưu</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
} 