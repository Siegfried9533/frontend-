import { Button } from "@/components/ui/button";

interface ProductDeleteButtonProps {
    productId: number | string;
    onDelete: (id: number | string) => void;
}

export function ProductDeleteButton({ productId, onDelete }: ProductDeleteButtonProps) {
    const handleClick = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            onDelete(productId);
        }
    };

    return (
        <Button variant="outline" size="sm" onClick={handleClick}>
            Xóa
        </Button>
    );
}