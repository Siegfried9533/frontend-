"use client";
import { useState } from "react";
import { Card } from "@/app/admin/cus_management/components/card";
import { Button } from "@/app/admin/cus_management/components/button";
import { Input } from "@/app/admin/cus_management/components/input";
import { Table } from "@/app/admin/cus_management/components/table";
import { Breadcrumb } from "@/app/admin/cus_management/components/breadcrumb";
import Link from "next/link";

interface Employee {
    id: string;
    name: string;
    email: string;
    phone: string;
    position: string;
    joinDate: string;
    permissions: string[];
    avatar?: string;
}

// Mock data
const mockEmployees: Employee[] = [
    {
        id: "1",
        name: "Nguyễn Văn A",
        email: "nguyenvana@company.com",
        phone: "0123456789",
        position: "Quản trị viên",
        joinDate: "2023-01-15",
        permissions: ["view", "edit"],
        avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
        id: "2",
        name: "Trần Thị B",
        email: "tranthib@company.com",
        phone: "0987654321",
        position: "Nhân viên thu ngân",
        joinDate: "2023-03-20",
        permissions: ["view"],
        avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
        id: "3",
        name: "Lê Văn C",
        email: "levanc@company.com",
        phone: "0123456780",
        position: "Nhân viên quản lý",
        joinDate: "2023-02-10",
        permissions: ["view", "edit", "delete"],
        avatar: "https://i.pravatar.cc/150?img=3"
    }
];

const positions = [
    { id: "admin", label: "Quản trị viên" },
    { id: "manager", label: "Nhân viên quản lý" },
    { id: "cashier", label: "Nhân viên thu ngân" },
    { id: "staff", label: "Nhân viên" },
    { id: "intern", label: "Thực tập sinh" }
];

const permissions = [
    { id: "view", label: "Xem" },
    { id: "edit", label: "Sửa" },
    { id: "delete", label: "Xóa" },
    { id: "approve", label: "Duyệt" },
    { id: "report", label: "Báo cáo" }
];

// Định nghĩa dữ liệu phân quyền mẫu
const permissionGroups = [
    {
        label: "Cấu hình",
        icon: "⚙️",
        permissions: [
            { label: "Xem báo cáo" },
            { label: "Tài cá nhân viên" },
            { label: "Lưu trữ hàng tồn" },
            { label: "Ban hàng" },
            { label: "Báo cáo tài chính" },
            {
                label: "Cập nhật",
                children: [
                    { label: "Xem thu chi" },
                    { label: "Xem phiếu thu chi" },
                    { label: "Tạo thu chi" },
                ]
            },
            { label: "Cấu hình cửa hàng" },
            { label: "Cấu hình nhân viên" },
            { label: "Cấu hình bán hàng" },
            { label: "Cấu hình thông báo" },
            { label: "Cấu hình hóa đơn" },
        ]
    },
    {
        label: "Sản phẩm",
        icon: "🛒",
        permissions: [
            { label: "Xem danh sách sản phẩm" },
            { label: "Tạo sản phẩm" },
            { label: "Sửa sản phẩm" },
            { label: "Xóa sản phẩm" },
            { label: "Xem sản phẩm" },
            { label: "Quản lý sản phẩm của các kho" },
            { label: "Xem giá khách hàng" },
            {
                label: "Quản lý khuyến mãi",
                children: [
                    { label: "Xem khuyến mãi" },
                    { label: "Tạo chương trình khuyến mãi" },
                    { label: "Cập nhật khuyến mãi" },
                ]
            },
        ]
    },
    {
        label: "Bán hàng",
        icon: "💵",
        permissions: [
            { label: "Xem khách hàng" },
            { label: "Sửa khách hàng" },
            { label: "Xóa khách hàng" },
            { label: "Tạo khách hàng" },
            { label: "Xuất đơn hàng và khách hàng" },
            { label: "Phân công đơn hàng" },
            { label: "Chỉ định ship" },
            { label: "Chỉ định Marketing" },
            { label: "Xem đơn vận chuyển" },
            { label: "Đối soát" },
        ]
    },
    {
        label: "Ứng dụng",
        icon: "📱",
        permissions: [
            { label: "Xem nhà cung cấp" },
            { label: "Thêm/xóa nhà cung cấp" },
            { label: "Sửa nhà cung cấp" },
            { label: "Xóa nhà cung cấp" },
            { label: "Quản lý công nợ khách hàng" },
            { label: "Quản lý công nợ nhà cung cấp" },
        ]
    },
];

export default function EmployeePage() {
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [selectedPosition, setSelectedPosition] = useState("");
    const [groupChecked, setGroupChecked] = useState([false, false, false, false]);
    const [permissionChecked, setPermissionChecked] = useState<(boolean | boolean[])[][]>(
        permissionGroups.map(group =>
            group.permissions.map(perm =>
                perm.children ? [false, ...perm.children.map(() => false)] : false
            )
        )
    );

    const filteredEmployees = mockEmployees.filter(employee => {
        return employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handlePermissionChange = (permissionId: string) => {
        setSelectedPermissions(prev => {
            if (prev.includes(permissionId)) {
                return prev.filter(id => id !== permissionId);
            }
            return [...prev, permissionId];
        });
    };

    const handlePositionChange = (positionId: string) => {
        setSelectedPosition(positionId);
        if (selectedEmployee) {
            const position = positions.find(p => p.id === positionId);
            if (position) {
                setSelectedEmployee({
                    ...selectedEmployee,
                    position: position.label
                });
            }
        }
    };

    const handleGroupCheck = (groupIdx: number, checked: boolean) => {
        setPermissionChecked((prev: (boolean | boolean[])[][]) =>
            prev.map((arr, idx) =>
                idx === groupIdx
                    ? arr.map(perm =>
                        Array.isArray(perm)
                            ? [checked, ...perm.slice(1).map(() => checked)]
                            : checked
                    )
                    : arr
            )
        );
    };
    const handlePermissionCheck = (groupIdx: number, permIdx: number, checked: boolean, childIdx?: number) => {
        setPermissionChecked((prev: (boolean | boolean[])[][]) =>
            prev.map((arr, idx) => {
                if (idx !== groupIdx) return arr;
                return arr.map((perm, i) => {
                    if (i !== permIdx) return perm;
                    if (Array.isArray(perm)) {
                        if (childIdx === undefined) {
                            return [checked, ...perm.slice(1).map(() => checked)];
                        } else {
                            const newArr = [...perm];
                            newArr[childIdx + 1] = checked;
                            newArr[0] = newArr.slice(1).every(Boolean);
                            return newArr;
                        }
                    } else {
                        return checked;
                    }
                });
            })
        );
    };

    // Thêm hàm xử lý lưu thay đổi với xác nhận
    const handleSaveChanges = () => {
        if (window.confirm("Bạn có chắc chắn muốn lưu thay đổi?")) {
            // TODO: Thực hiện lưu dữ liệu ở đây
            // Ví dụ: gọi API hoặc cập nhật state
            alert("Đã lưu thay đổi!");
        }
    };

    return (
        <div className="space-y-4">
            <Breadcrumb
                items={[
                    { label: "Trang chủ", href: "/" },
                    { label: "Quản lý nhân viên" }
                ]}
            />

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-Open Sans ExtraBold">Quản lý nhân viên</h1>
                {/* <Link href="/Employee/add_employee">
                    <Button className="bg-blue-500 text-white hover:bg-blue-700">
                        Thêm nhân viên
                    </Button>
                </Link> */}
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Cột danh sách nhân viên */}
                <Card className="p-4">
                    <div className="space-y-4">
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Danh sách nhân viên</h1>
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Tìm kiếm nhân viên..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-grow dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                            />
                            <Link href="/Employee/add_employee">
                                <Button className="bg-blue-500 text-white hover:bg-blue-700 whitespace-nowrap dark:bg-blue-600 dark:hover:bg-blue-800">
                                    Thêm nhân viên
                                </Button>
                            </Link>
                        </div>

                        <div className="space-y-1">
                            {filteredEmployees.map((employee) => (
                                <div
                                    key={employee.id}
                                    onClick={() => setSelectedEmployee(employee)}
                                    className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors ${selectedEmployee?.id === employee.id
                                        ? "bg-blue-50 border border-blue-200 dark:bg-blue-900/50 dark:border-blue-800"
                                        : "hover:bg-gray-50 dark:hover:bg-gray-800"
                                        }`}
                                >
                                    <div className="w-8 h-8 flex-shrink-0">
                                        <img
                                            src={employee.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=random`}
                                            alt={employee.name}
                                            className="w-full h-full rounded-full object-cover border border-white dark:border-gray-700 shadow-sm"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">{employee.name}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Cột thông tin chi tiết */}
                <Card className="p-4">
                    {selectedEmployee ? (
                        <div className="space-y-4">
                            {/* Preview thông tin nhân viên theo mẫu */}
                            <div className="flex items-center space-x-4 py-4 mb-6">
                                <img
                                    src={selectedEmployee.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedEmployee.name)}`}
                                    alt={selectedEmployee.name}
                                    className="w-14 h-14 rounded-full object-cover border"
                                />
                                <div className="flex flex-col justify-center min-w-0">
                                    <div className="flex items-center flex-wrap gap-x-3">
                                        <span className="font-bold text-lg text-gray-900 dark:text-white">{selectedEmployee.name}</span>
                                        <span className="text-base text-gray-400">{selectedEmployee.joinDate}</span>
                                    </div>
                                    <div className="flex items-center flex-wrap gap-x-6 text-base mt-1">
                                        <span>
                                            <span className="font-bold text-gray-700 dark:text-gray-200">Email:</span>
                                            <a href={`mailto:${selectedEmployee.email}`} className="ml-1 text-blue-600 dark:text-blue-400 hover:underline">{selectedEmployee.email}</a>
                                        </span>
                                        <span>
                                            <span className="font-bold text-gray-700 dark:text-gray-200">SĐT:</span>
                                            <span className="ml-1 text-gray-500 dark:text-gray-400">{selectedEmployee.phone || "Không có"}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/*ComboBox thay đổi bộ phận nhân viên*/}
                            <div className="mt-2">
                                <h1 className="text-sm font-medium text-gray-900 dark:text-white">Bộ phận</h1>
                                <select
                                    value={positions.find(p => p.label === selectedEmployee.position)?.id || ""}
                                    onChange={(e) => handlePositionChange(e.target.value)}
                                    className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                >
                                    <option value="" disabled>Chọn chức vụ</option>
                                    {positions.map((position) => (
                                        <option key={position.id} value={position.id}>
                                            {position.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/*Phân quyền nhân viên */}
                            <div className="mt-6">
                                <h2 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">Quyền trên cửa hàng</h2>
                                <div className="space-y-4">
                                    {[0, 1].map(row => (
                                        <div key={row} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {permissionGroups.slice(row * 2, row * 2 + 2).map((group, groupIdx) => {
                                                const realIdx = row * 2 + groupIdx;
                                                return (
                                                    <div key={group.label} className="bg-white dark:bg-gray-900 rounded border p-4">
                                                        <div className="flex items-center mb-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={groupChecked[realIdx]}
                                                                onChange={e => handleGroupCheck(realIdx, e.target.checked)}
                                                                className="mr-2 scale-150 accent-blue-600"
                                                            />
                                                            <span className="font-semibold">{group.label}</span>
                                                        </div>
                                                        <div className="space-y-1">
                                                            {group.permissions.map((perm, permIdx) =>
                                                                perm.children ? (
                                                                    <div key={perm.label}>
                                                                        <label className="font-medium flex items-center">
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={Array.isArray(permissionChecked[realIdx][permIdx]) ? permissionChecked[realIdx][permIdx][0] : permissionChecked[realIdx][permIdx]}
                                                                                onChange={e => handlePermissionCheck(realIdx, permIdx, e.target.checked)}
                                                                                className="mr-2 accent-blue-500"
                                                                            />
                                                                            {perm.label}
                                                                        </label>
                                                                        <div className="ml-6 space-y-1">
                                                                            {perm.children.map((child, childIdx) => (
                                                                                <label key={child.label} className="block flex items-center">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        checked={Array.isArray(permissionChecked[realIdx][permIdx]) ? permissionChecked[realIdx][permIdx][childIdx + 1] : false}
                                                                                        onChange={e => handlePermissionCheck(realIdx, permIdx, e.target.checked, childIdx)}
                                                                                        className="mr-2 accent-blue-400"
                                                                                    />
                                                                                    {child.label}
                                                                                </label>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <label key={perm.label} className="block flex items-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={Array.isArray(permissionChecked[realIdx][permIdx]) ? permissionChecked[realIdx][permIdx][0] : permissionChecked[realIdx][permIdx]}
                                                                            onChange={e => handlePermissionCheck(realIdx, permIdx, e.target.checked)}
                                                                            className="mr-2 accent-blue-500"
                                                                        />
                                                                        {perm.label}
                                                                    </label>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                                <Button variant="outline" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">Hủy</Button>
                                <Button className="bg-blue-500 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800" onClick={handleSaveChanges}>
                                    Lưu thay đổi
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                            Chọn một nhân viên để xem thông tin chi tiết
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
