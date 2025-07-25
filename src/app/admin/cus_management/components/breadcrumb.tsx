import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="flex items-center space-x-1 text-sm text-gray-500 mb-4">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div key={index} className="flex items-center">
                        {index > 0 && (
                            <ChevronRight className="h-4 w-4 mx-1" />
                        )}
                        {item.href && !isLast ? (
                            <Link
                                href={item.href}
                                className="hover:text-gray-700 transition-colors"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className={isLast ? "text-gray-900 font-medium" : ""}>
                                {item.label}
                            </span>
                        )}
                    </div>
                );
            })}
        </nav>
    );
} 