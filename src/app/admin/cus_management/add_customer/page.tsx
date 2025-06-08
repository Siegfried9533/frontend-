"use client";
import { useState } from "react";
import { Card } from "@/app/admin/cus_management/components/card";
import { Button } from "@/app/admin/cus_management/components/button";
import { Input } from "@/app/admin/cus_management/components/input";
import { Breadcrumb } from "@/app/admin/cus_management/components/breadcrumb";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CustomerForm {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export default function AddCustomerPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<CustomerForm>({
        name: "",
        email: "",
        phone: "",
        address: ""
    });
    const [errors, setErrors] = useState<Partial<CustomerForm>>({});
    // kiểm tra dữ liệu nhập vào    
    const validateForm = () => {
        const newErrors: Partial<CustomerForm> = {};
        // kiểm tra họ và tên nếu không nhập thì báo lỗi
        if (!formData.name.trim()) {
            newErrors.name = "Vui lòng nhập họ tên";
        }
        // kiểm tra email nếu không nhập thì báo lỗi
        if (!formData.email.trim()) {
            newErrors.email = "Vui lòng nhập email";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {//kiểm tra email hợp lệ không chứa kí tự đặc biệt
            newErrors.email = "Email không hợp lệ";
        }
        // kiểm tra số điện thoại nếu không nhập thì báo lỗi
        if (!formData.phone.trim()) {
            newErrors.phone = "Vui lòng nhập số điện thoại";
        } else if (!/^[0-9]{10}$/.test(formData.phone)) {//kiểm tra số điện thoại có 10 chữ số
            newErrors.phone = "Số điện thoại phải có 10 chữ số";
        }
        // kiểm tra địa chỉ nếu không nhập thì báo lỗi
        if (!formData.address.trim()) {
            newErrors.address = "Vui lòng nhập địa chỉ";
        }
        // kiểm tra dữ liệu nhập vào 
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    // xử lý khi nhấn nút thêm khách hàng xác nhận
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // kiểm tra dữ liệu nhập vào 
        if (validateForm()) {
            // gọi API để lưu dữ liệu
            console.log("Form data:", formData);

            // Hiển thị thông báo xác nhận
            if (window.confirm("Bạn có chắc chắn muốn thêm khách hàng này?")) {
                // Sau khi xác nhận, chuyển hướng về trang danh sách
                router.push("/Customer");
            }
        }
    };
    // xử lý khi người dùng bắt đầu nhập lại
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Xóa lỗi khi người dùng bắt đầu nhập lại
        if (errors[name as keyof CustomerForm]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <Breadcrumb
                items={[
                    { label: "Trang chủ", href: "/" },
                    { label: "Quản lý khách hàng", href: "/Customer" },
                    { label: "Thêm khách hàng" }
                ]}
            />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Thêm khách hàng mới</h1>
                <Link href="/Customer">
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
                            className={errors.name ? "border-red-500" : ""}//kiểm tra lỗi
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
                            className={errors.email ? "border-red-500" : ""}//kiểm tra lỗi
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
                            className={errors.phone ? "border-red-500" : ""}//kiểm tra lỗi
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-sm font-medium mb-1">
                            Địa chỉ <span className="text-red-500">*</span>
                        </label>
                        <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Nhập địa chỉ"
                            className={errors.address ? "border-red-500" : ""}//kiểm tra lỗi
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <Link href="/Customer">
                            <Button
                                variant="outline"
                                className="hover:bg-gray-200"
                            >
                                Hủy
                            </Button>
                        </Link>
                        <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-700">
                            Thêm khách hàng
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
} 