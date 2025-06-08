"use client";
import { useState } from "react";
import { Card } from "@/app/admin/cus_management/components/card";
import { Button } from "@/app/admin/cus_management/components/button";
import { Input } from "@/app/admin/cus_management/components/input";
import { Breadcrumb } from "@/app/admin/cus_management/components/breadcrumb";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface EmployeeForm {
    name: string;
    email: string;
    phone: string;
    position: string;
    joinDate: string;
    permissions: string[];
}

const positions = [
    "Quản trị viên",
    "Nhân viên thu ngân",
    "Nhân viên quản lý",
    "Nhân viên bán hàng",
    "Nhân viên kho"
];

const permissions = [
    { id: "view", label: "Xem" },
    { id: "edit", label: "Sửa" },
    { id: "delete", label: "Xóa" },
    { id: "approve", label: "Duyệt" },
    { id: "report", label: "Báo cáo" }
];

export default function AddEmployeePage() {
    const router = useRouter();
    const [formData, setFormData] = useState<EmployeeForm>({
        name: "",
        email: "",
        phone: "",
        position: "",
        joinDate: new Date().toISOString().split('T')[0],
        permissions: []
    });
    const [errors, setErrors] = useState<Partial<EmployeeForm>>({});

    const validateForm = () => {
        const newErrors: Partial<EmployeeForm> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Vui lòng nhập họ tên";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Vui lòng nhập email";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Vui lòng nhập số điện thoại";
        } else if (!/^[0-9]{10}$/.test(formData.phone)) {
            newErrors.phone = "Số điện thoại phải có 10 chữ số";
        }

        if (!formData.position) {
            newErrors.position = "Vui lòng chọn chức vụ";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            // Trong thực tế, đây là nơi bạn sẽ gọi API để lưu dữ liệu
            console.log("Form data:", formData);

            // Hiển thị thông báo xác nhận
            if (window.confirm("Bạn có chắc chắn muốn thêm nhân viên này?")) {
                // Sau khi xác nhận, chuyển hướng về trang danh sách
                router.push("/Employee");
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Xóa lỗi khi người dùng bắt đầu nhập lại
        if (errors[name as keyof EmployeeForm]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handlePermissionChange = (permissionId: string) => {
        setFormData(prev => ({
            ...prev,
            permissions: prev.permissions.includes(permissionId)
                ? prev.permissions.filter(id => id !== permissionId)
                : [...prev.permissions, permissionId]
        }));
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <Breadcrumb
                items={[
                    { label: "Trang chủ", href: "/" },
                    { label: "Quản lý nhân viên", href: "/Employee" },
                    { label: "Thêm nhân viên" }
                ]}
            />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Thêm nhân viên mới</h1>
                <Link href="/Employee">
                    <Button variant="outline">Quay lại</Button>
                </Link>
            </div>

            <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Họ và tên <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nhập họ và tên"
                            className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Nhập email"
                            className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">
                            Số điện thoại <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Nhập số điện thoại"
                            className={errors.phone ? "border-red-500" : ""}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="position" className="block text-sm font-medium mb-1">
                            Chức vụ <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="position"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md ${errors.position ? "border-red-500" : ""}`}
                        >
                            <option value="">Chọn chức vụ</option>
                            {positions.map(position => (
                                <option key={position} value={position}>
                                    {position}
                                </option>
                            ))}
                        </select>
                        {errors.position && (
                            <p className="text-red-500 text-sm mt-1">{errors.position}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="joinDate" className="block text-sm font-medium mb-1">
                            Ngày tham gia <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="joinDate"
                            name="joinDate"
                            type="date"
                            value={formData.joinDate}
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Phân quyền hệ thống
                        </label>
                        <div className="space-y-2">
                            {permissions.map(permission => (
                                <label key={permission.id} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.permissions.includes(permission.id)}
                                        onChange={() => handlePermissionChange(permission.id)}
                                        className="rounded border-gray-300"
                                    />
                                    <span>{permission.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <Link href="/Employee">
                            <Button variant="outline">Hủy</Button>
                        </Link>
                        <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-700">
                            Thêm nhân viên
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
