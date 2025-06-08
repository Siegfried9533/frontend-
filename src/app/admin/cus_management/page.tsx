"use client";
import { useState, useMemo } from "react";
import { Card } from "@/app/admin/cus_management/components/card";
import { Input } from "@/app/admin/cus_management/components/input";
import { Table } from "@/app/admin/cus_management/components/table";
import { Breadcrumb } from "@/app/admin/cus_management/components/breadcrumb";
import Link from "next/link";
import { mockCustomers, Customer } from "@/app/admin/lib/mock/customer";
import { Pencil, Trash2, Eye, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import EditCustomerModal from "./components/editCustomerModal";
import React from "react";

export default function CustomerManagementPage() {
    const [customers, setCustomers] = useState(mockCustomers);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const itemsPerPage = 10;

    // TODO: Khi kết nối database, thay thế bằng API call
    // Ví dụ: const { data: customers, isLoading } = useQuery('customers', fetchCustomers);
    // TODO: Thêm loading state và error handling

    // lọc khách hàng theo tên, email
    const filteredCustomers = useMemo(() => {
        return customers.filter(customer =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [customers, searchTerm]);

    // tính toán phân trang
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    const paginatedCustomers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredCustomers.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredCustomers, currentPage]);

    // xác nhận xóa khách hàng   
    const handleDelete = (customer: Customer) => {
        setCustomerToDelete(customer);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (customerToDelete) {
            try {
                // TODO: Thay thế bằng API call khi có database
                // Ví dụ: await deleteCustomer(customerToDelete.id);
                setCustomers(prev => prev.filter(c => c.id !== customerToDelete.id));
                setIsDeleteModalOpen(false);
                setCustomerToDelete(null);
                toast.success("Xóa khách hàng thành công");
            } catch (error) {
                console.error('Failed to delete customer:', error);
                toast.error("Không thể xóa khách hàng. Vui lòng thử lại sau.");
            }
        }
    };

    const handleEdit = (customer: Customer) => {
        setEditingCustomer(customer);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditingCustomer(null);
    };

    //xem chi tiết
    const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
    const toggleRow = (id: string) => {
        setExpandedRowId(id === expandedRowId ? null : id);
    };

    const handleSaveCustomer = async (updated: Customer) => {
        try {
            // TODO: Thay thế bằng API call khi có database
            // Ví dụ: await updateCustomer(updated.id, updated);
            setCustomers(prev => prev.map(c => c.id === updated.id ? updated : c));
            handleCloseEditModal();
            toast.success("Cập nhật thông tin khách hàng thành công");
        } catch (error) {
            console.error('Failed to update customer:', error);
            toast.error("Không thể cập nhật thông tin khách hàng. Vui lòng thử lại sau.");
        }
    };

    return (
        <div className="space-y-4">
            <Breadcrumb
                items={[
                    { label: "Trang chủ", href: "/" },
                    { label: "Quản lý khách hàng" }
                ]}
            />
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Quản lý khách hàng</h1>
                <div className="flex gap-4">
                    <Input
                        placeholder="Tìm kiếm khách hàng..."
                        className="max-w-md w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button asChild>
                        <Link
                            href="/admin/cus_management/add_customer"
                            className="px-6 py-2 bg-blue-700 text-white hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
                        >
                            <Plus className="h-5 w-5" />
                            Thêm khách hàng
                        </Link>
                    </Button>
                </div>
            </div>

            <Card className="">
                <div className="bg-white rounded-xl p-4">
                    <div className="overflow-x-auto">
                        <Table className="min-w-full text-sm rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="text-center px-2 py-3 w-[60px]">ID</th>
                                    <th className="text-center px-4 py-3 w-[220px]">Họ và tên</th>
                                    <th className="text-center px-3 py-3 w-[100px]">Giới tính</th>
                                    <th className="text-center px-4 py-3 w-[140px]">Ngày sinh</th>
                                    <th className="text-left px-4 py-3 w-[250px]">Email</th>
                                    <th className="text-center px-3 py-3 w-[100px]">Vai trò</th>
                                    <th className="text-center px-3 py-3 w-[140px]">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedCustomers.map((customer) => (
                                    <React.Fragment key={customer.id}>
                                        <tr className="border-b hover:bg-gray-50">
                                            <td className="text-center px-3 py-3">{customer.id}</td>
                                            <td className="text-left px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={`https://i.pravatar.cc/40?u=${customer.email}`}
                                                        alt={customer.name}
                                                        className="w-8 h-8 rounded-full"
                                                    />
                                                    <span>{customer.name}</span>
                                                </div>
                                            </td>
                                            <td className="text-center px-3 py-3">{customer.sex}</td>
                                            <td className="text-center px-4 py-3">{customer.dateOfBirth}</td>
                                            <td className="text-left px-4 py-3">{customer.email}</td>
                                            <td className="text-center px-3 py-3">{customer.role}</td>
                                            <td className="text-center px-3 py-3">
                                                <div className="flex justify-center gap-2">
                                                    <Pencil
                                                        className="h-5 w-5 text-blue-600 cursor-pointer"
                                                        onClick={() => handleEdit(customer)}
                                                    />
                                                    <Trash2
                                                        className="h-5 w-5 text-red-600 cursor-pointer"
                                                        onClick={() => handleDelete(customer)}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </Table>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center gap-2 mt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    Trước
                                </Button>
                                <span className="py-2">
                                    Trang {currentPage} / {totalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                >
                                    Sau
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </Card>

            {/* Modal xác nhận xóa */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Xác nhận xóa khách hàng</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p>Bạn có chắc chắn muốn xóa khách hàng "{customerToDelete?.name}"?</p>
                        <p className="text-sm text-gray-500 mt-2">Hành động này không thể hoàn tác.</p>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            className="hover:bg-gray-100 text-gray-700"
                            onClick={() => setIsDeleteModalOpen(false)}>
                            Hủy
                        </Button>
                        <Button
                            variant="destructive"
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={handleConfirmDelete}
                        >
                            Xóa
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal chỉnh sửa thông tin */}
            <EditCustomerModal
                open={isEditModalOpen}
                customer={editingCustomer}
                onClose={handleCloseEditModal}
                onSave={handleSaveCustomer}
            />
        </div>
    );
}
