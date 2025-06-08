"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Plus, Pencil, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { ProductDeleteButton } from "@/app/admin/pro_management/components/deleteButton";
import { ProductAddButton } from "@/app/admin/pro_management/components/addButton";
import EditProductModal from "@/app/admin/pro_management/editProduct/editProductModal";
import { mockBooks, book } from "@/app/admin/lib/mock/product";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from 'sonner';

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

const statusColor = {
    Pending: "bg-yellow-100 text-yellow-700",
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-red-100 text-red-700",
    "On Sale": "bg-blue-100 text-blue-700",
    Bouncing: "bg-purple-100 text-purple-700",
};

export default function BooksPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<book | null>(null);
    const [editingProduct, setEditingProduct] = useState<book | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<book | null>(null);
    const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

    // TODO: Khi có API, thay thế bằng API call
    const [products, setProducts] = useState<book[]>(mockBooks);

    const filteredProducts = useMemo(() => {
        if (!searchTerm.trim()) return products;
        const searchLower = searchTerm.toLowerCase().trim();
        return products.filter(product => {
            const productNameLower = product.name.toLowerCase();
            return productNameLower.includes(searchLower);
        }).sort((a, b) => {
            const aStartsWithSearch = a.name.toLowerCase().startsWith(searchLower);
            const bStartsWithSearch = b.name.toLowerCase().startsWith(searchLower);

            if (aStartsWithSearch && !bStartsWithSearch) return -1;
            if (!aStartsWithSearch && bStartsWithSearch) return 1;

            return a.name.localeCompare(b.name);
        });
    }, [products, searchTerm]);

    const toggleRow = (id: string) => {
        setExpandedRowId(prev => (prev === id ? null : id));
    };

    const handleDelete = (product: book) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (productToDelete) {
            try {
                // TODO: Thay thế bằng API call khi có database
                setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
                setIsDeleteModalOpen(false);
                setProductToDelete(null);

                // Nếu đang xem chi tiết sản phẩm bị xóa, reset selected product
                if (selectedProduct?.id === productToDelete.id) {
                    setSelectedProduct(null);
                }

                toast.success("Xóa sản phẩm thành công");
            } catch (error) {
                console.error('Failed to delete product:', error);
                toast.error("Không thể xóa sản phẩm. Vui lòng thử lại sau.");
            }
        }
    };

    const handleUpdate = (product: book) => {
        setEditingProduct(product);
        setIsEditOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditOpen(false);
        setEditingProduct(null);
    };

    const handleSaveProduct = async (updated: book) => {
        try {
            // TODO: Thay thế bằng API call khi có database
            setProducts(products.map(p => p.id === updated.id ? updated : p));
            setIsEditOpen(false);
            toast.success("Cập nhật sách thành công");
        } catch (error) {
            toast.error("Có lỗi xảy ra khi cập nhật sách");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header với tìm kiếm và bộ lọc */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
                <div className="flex gap-4 w-full md:w-auto">
                    <Input
                        placeholder="Tìm kiếm sách..."
                        className="max-w-xs"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border rounded-md px-5 py-2"
                    >
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <Button asChild>
                        <Link
                            href="/admin/pro_management/addProduct"
                            className="px-6 py-2 bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
                        >
                            <Plus className="h-5 w-5" />
                            Thêm sản phẩm
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="p-6">
                <div className="bg-white rounded-xl shadow p-4">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="text-gray-500 text-left">
                                    <th className="text-left py-3 px-4 font-semibold">Tên sách</th>
                                    <th className="text-center py-3 px-2 font-semibold">ID</th>
                                    <th className="text-left py-3 px-2 font-semibold">Tác giả</th>
                                    <th className="text-left py-3 px-2 font-semibold">Giá</th>
                                    <th className="text-center py-3 px-2 font-semibold">Tồn kho</th>
                                    <th className="text-center py-3 px-2 font-semibold">Thể loại</th>
                                    <th className="text-left py-3 px-2 font-semibold">Trạng thái</th>
                                    <th className="text-center py-3 px-2 font-semibold">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <React.Fragment key={product.id}>
                                        <tr className="border-b last:border-0">
                                            <td className="py-3 px-4 flex items-center gap-3 font-semibold">
                                                <img src={product.image} alt={product.name} style={{ width: 60, height: 100 }} />
                                                {product.name}
                                            </td>
                                            <td className="py-3 px-2 text-normal text-center">{product.id}</td>
                                            <td className="py-3 px-2 text-normal">{product.author}</td>
                                            <td className="py-3 px-2 font-normal">${product.price.toFixed(2)}</td>
                                            <td className="py-3 px-2 text-normal text-center">{product.stock}</td>
                                            <td className="py-3 px-2 text-normal text-center">{product.category}</td>
                                            <td className="py-3 px-2">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold text-center ${statusColor[product.status as keyof typeof statusColor]}`}
                                                >
                                                    {product.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex justify-center gap-4">
                                                    <Pencil
                                                        className="h-5 w-5 text-blue-600 cursor-pointer"
                                                        onClick={() => handleUpdate(product)}
                                                    />
                                                    <Trash2
                                                        className="h-5 w-5 text-red-600 cursor-pointer"
                                                        onClick={() => handleDelete(product)}
                                                    />
                                                    <Eye
                                                        className="h-5 w-5 text-green-600 cursor-pointer"
                                                        onClick={() => { setSelectedProduct(product); toggleRow(String(product.id)); }}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                        {expandedRowId === String(product.id) && (
                                            <tr key={`expanded-${product.id}`}>
                                                <td colSpan={8} className="bg-gray-50 px-6 py-4 text-sm text-gray-700">
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                        <div><strong>Nhà xuất bản:</strong> {product.publisher || 'N/A'}</div>
                                                        <div><strong>Ngôn ngữ:</strong> {product.language || 'N/A'}</div>
                                                        <div><strong>Ngày phát hành:</strong> {product.releaseDate ? new Date(product.releaseDate).toLocaleDateString() : 'N/A'}</div>
                                                        <div><strong>Độ tuổi:</strong> {product.age ? `${product.age}+` : 'N/A'}</div>
                                                        <div><strong>Số trang:</strong> {product.numpage || 'N/A'}</div>
                                                        <div><strong>Kích thước:</strong> {product.size || 'N/A'}</div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal sửa */}
            <EditProductModal
                book={editingProduct as any}
                open={isEditOpen}
                onClose={handleCloseEditModal}
                onSave={handleSaveProduct as any}
            />

            {/* Modal xác nhận xóa */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Xác nhận xóa sản phẩm</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p>Bạn có chắc chắn muốn xóa sản phẩm "{productToDelete?.name}"?</p>
                        <p className="text-sm text-gray-500 mt-2">Hành động này không thể hoàn tác.</p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                            Hủy
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleConfirmDelete}
                        >
                            Xóa
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    );
} 