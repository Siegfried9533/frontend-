"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = [
    { id: "all", name: "Tất cả" },
    { id: "classic", name: "Văn học kinh điển" },
    { id: "dystopian", name: "Giả tưởng phản địa đàng" },
    { id: "fantasy", name: "Giả tưởng" },
    { id: "adventure", name: "Phiêu lưu" },
    { id: "romance", name: "Lãng mạn" },
    { id: "coming-of-age", name: "Trưởng thành" },
    { id: "satire", name: "Châm biếm" },
    { id: "magical-realism", name: "Hiện thực huyền ảo" },
    { id: "mystery", name: "Trinh thám" },
    { id: "historical", name: "Lịch sử" },
];

const statuses = ["Active", "Pending", "Inactive", "On Sale", "Bouncing"];

export default function AddProductPage() {
    const [form, setForm] = useState({
        name: "",
        price: "",
        image: "",
        category: categories[0],
        stock: "",
        status: statuses[0],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Gửi dữ liệu lên server hoặc cập nhật state
        alert("Đã thêm sản phẩm mới:\n" + JSON.stringify(form, null, 2));
    };

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Thêm sản phẩm mới</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    name="name"
                    placeholder="Tên sản phẩm"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <Input
                    name="price"
                    type="number"
                    placeholder="Giá"
                    value={form.price}
                    onChange={handleChange}
                    required
                />
                <Input
                    name="image"
                    placeholder="Đường dẫn ảnh (URL)"
                    value={form.image}
                    onChange={handleChange}
                />
                <Input
                    name="stock"
                    type="number"
                    placeholder="Tồn kho"
                    value={form.stock}
                    onChange={handleChange}
                    required
                />
                <select
                    name="category"
                    value={form.category.id}
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2 w-full"
                >
                    {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="border rounded-md px-3 py-2 w-full"
                >
                    {statuses.map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
                <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-700">
                    Thêm sản phẩm
                </Button>
            </form>
        </div>
    );
}