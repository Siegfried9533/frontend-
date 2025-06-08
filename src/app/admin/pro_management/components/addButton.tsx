import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProductAddButtonProps {
    onAdd: () => void;
}

export function ProductAddButton({ onAdd }: ProductAddButtonProps) {
    return (
        <Button className="bg-blue-500 text-white hover:bg-blue-700" onClick={onAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Thêm sản phẩm
        </Button>
    );
}