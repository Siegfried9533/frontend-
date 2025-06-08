// components/EditProductModal.tsx
"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { book } from "@/app/admin/lib/mock/product";
import { Pencil } from "lucide-react";

interface EditProductModalProps {
    book: book | null;
    open: boolean;
    onClose: () => void;
    onSave: (updated: book) => void;
}

export default function EditProductModal({
    book,
    open,
    onClose,
    onSave,
}: EditProductModalProps) {
    const [form, setForm] = useState<book | null>(null);

    useEffect(() => {
        setForm(book);
    }, [book]);

    if (!form) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) =>
            prev
                ? {
                    ...prev,
                    [name]:
                        name === "price" ||
                            name === "stock" ||
                            name === "age" ||
                            name === "numpage"
                            ? Number(value)
                            : value,
                }
                : null
        );
    };

    const handleSubmit = () => {
        if (form) {
            onSave(form);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-Open Sans ExtraBold">Chỉnh sửa sản phẩm</DialogTitle>
                </DialogHeader>
                <div className="overflow-y-auto pr-2 space-y-4 flex-1">
                    {/* Hình ảnh sản phẩm */}
                    <div className="flex justify-center">
                        <div className="relative w-60 h-[400px]">
                            <img
                                src={form.image}
                                alt="Hình ảnh sản phẩm"
                                className="object-cover w-full h-full rounded-lg"
                            />
                            <button
                                onClick={() => {
                                    const input = document.createElement("input");
                                    input.type = "file";
                                    input.accept = "image/*";
                                    input.onchange = (e) => {
                                        const file = (e.target as HTMLInputElement).files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setForm((prev) =>
                                                    prev
                                                        ? {
                                                            ...prev,
                                                            image: reader.result as string,
                                                        }
                                                        : prev
                                                );
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    };
                                    input.click();
                                }}
                                className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
                            >
                                <Pencil className="w-4 h-4 text-gray-700" />
                            </button>
                        </div>
                    </div>
                    {/* Thông tin sản phẩm */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Tên sách</label>
                        <Input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Tên sách"
                        />
                    </div>
                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Tác giả</label>
                        <Input
                            name="author"
                            value={form.author}
                            onChange={handleChange}
                            placeholder="Tác giả"
                        />
                    </div>
                    <div>
                        <label htmlFor="publisher" className="block text-sm font-medium text-gray-700 mb-1">Nhà xuất bản</label>
                        <Input
                            name="publisher"
                            value={form.publisher}
                            onChange={handleChange}
                            placeholder="Nhà xuất bản"
                        />
                    </div>
                    <div>
                        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">Ngôn ngữ</label>
                        <Input
                            name="language"
                            value={form.language}
                            onChange={handleChange}
                            placeholder="Ngôn ngữ"
                        />
                    </div>
                    <div>
                        <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700 mb-1">Ngày phát hành</label>
                        <Input
                            name="releaseDate"
                            value={form.releaseDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Độ tuổi</label>
                        <Input
                            name="age"
                            type="number"
                            value={form.age.toString()}
                            onChange={handleChange}
                            placeholder="Độ tuổi phù hợp"
                        />
                    </div>
                    <div>
                        <label htmlFor="numpage" className="block text-sm font-medium text-gray-700 mb-1">Số trang</label>
                        <Input
                            name="numpage"
                            type="number"
                            value={form.numpage.toString()}
                            onChange={handleChange}
                            placeholder="Số trang"
                        />
                    </div>
                    <div>
                        <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">Kích thước</label>
                        <Input
                            name="size"
                            value={form.size}
                            onChange={handleChange}
                            placeholder="Kích thước (ví dụ: 14x20 cm)"
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Giá</label>
                        <Input
                            name="price"
                            type="number"
                            value={form.price.toString()}
                            onChange={handleChange}
                            placeholder="Giá bán"
                        />
                    </div>
                    <div>
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Tồn kho</label>
                        <Input
                            name="stock"
                            type="number"
                            value={form.stock.toString()}
                            onChange={handleChange}
                            placeholder="Số lượng trong kho"
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Thể loại</label>
                        <Input
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            placeholder="Thể loại"
                        />
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2"
                        >
                            <option value="Pending">Đang chờ</option>
                            <option value="Active">Đang bán</option>
                            <option value="Inactive">Ngừng bán</option>
                            <option value="On Sale">Đang giảm giá</option>
                            <option value="Bouncing">Sắp phát hành</option>
                        </select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Hủy</Button>
                    <Button onClick={handleSubmit}>Lưu</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
