"use client";
import { useState, useMemo, useEffect } from "react";
import { Card } from "@/app/admin/cus_management/components/card";
import { Input } from "@/app/admin/cus_management/components/input";
import { Table } from "@/app/admin/cus_management/components/table";
import { Breadcrumb } from "@/app/admin/cus_management/components/breadcrumb";
import Link from "next/link";
import { Pencil, Trash2, Eye, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import EditCustomerModal from "./components/editCustomerModal";
import React from "react";
import axios from "axios";

// Interface cho response từ API
interface UserResponseForAdmin {
    userName: string;
    email: string;
    roles: Array<{
        roleName: string;
    }>;
}

// Interface cho dữ liệu khách hàng
interface Customer {
    id: string;
    name: string;
    email: string;
    sex: string;
    dateOfBirth: string;
    role: string;
}

export default function CustomerManagementPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const itemsPerPage = 10;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            toast.error("Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
            return;
        }
        console.log("Fetching customers with token:", token);
        axios.get<UserResponseForAdmin[]>("http://localhost:8080/api/manage/get-all-customers", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                console.log("API Response:", res.data);
                if (!res.data || res.data.length === 0) {
                    setCustomers([]);
                    setLoading(false);
                    return;
                }
                // Chuyển đổi dữ liệu từ UserResponseForAdmin sang Customer
                const customers = res.data.map(user => ({
                    id: user.userName,
                    name: user.userName,
                    email: user.email,
                    sex: "Không xác định", // Mặc định vì backend không có trường này
                    dateOfBirth: "Không xác định", // Mặc định vì backend không có trường này
                    role: user.roles.map(role => role.roleName).join(", ")
                }));
                setCustomers(customers);
                setLoading(false);
            })
            .catch(err => {
                console.error("API Error:", err);
                setLoading(false);
                if (err.response) {
                    console.error("Error response:", {
                        status: err.response.status,
                        data: err.response.data,
                        headers: err.response.headers
                    });
                    if (err.response.status === 401) {
                        toast.error("Phiên đăng nhập đã hết hạn hoặc không có quyền truy cập. Vui lòng đăng nhập lại.");
                        // Redirect to login page after 2 seconds
                        setTimeout(() => {
                            window.location.href = "/auth/sign-in";
                        }, 2000);
                    } else if (err.response.status === 403) {
                        toast.error("Bạn không có quyền truy cập vào tài nguyên này.");
                    } else {
                        toast.error(`Lỗi server: ${err.response.status} - ${err.response.data?.message || 'Không xác định'}`);
                    }
                } else if (err.request) {
                    console.error("No response received:", err.request);
                    toast.error("Không thể kết nối đến server. Vui lòng kiểm tra lại kết nối mạng.");
                } else {
                    console.error("Error setting up request:", err.message);
                    toast.error("Có lỗi xảy ra khi gửi yêu cầu: " + err.message);
                }
            });
    }, []);

    // lọc khách hàng theo tên, email
    const filteredCustomers = useMemo(() => {
        console.log("Current customers:", customers);
        if (!customers) return [];
        return customers.filter(customer =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [customers, searchTerm]);

    // tính toán phân trang
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    const paginatedCustomers = useMemo(() => {
        console.log("Filtered customers:", filteredCustomers);
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
                        {loading ? (
                            <div className="flex justify-center items-center h-32">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            </div>
                        ) : (
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
                                    {loading ? (
                                        <tr>
                                            <td colSpan={7} className="text-center py-4">
                                                <div className="flex justify-center items-center">
                                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : paginatedCustomers.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="text-center py-4">
                                                Không có dữ liệu khách hàng
                                            </td>
                                        </tr>
                                    ) : (
                                        paginatedCustomers.map((customer) => (
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
                                        ))
                                    )}
                                </tbody>
                            </Table>
                        )}

                        {/* Pagination */}
                        {!loading && paginatedCustomers.length > 0 && (
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
