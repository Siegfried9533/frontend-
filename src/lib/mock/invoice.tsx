export interface Invoice {
    invoiceID: string;     // Mã hóa đơn (duy nhất)
    customerID: string;    // Mã khách hàng liên quan đến hóa đơn
    employeeID: string;    // Mã nhân viên lập hóa đơn
    orderID: string;       // Mã đơn hàng liên quan
    invoiceDate: String;     // Ngày lập hóa đơn
    totalAmount: number;   // Tổng tiền hàng trước khi giảm giá
    discount: number;      // Mức giảm giá được áp dụng
    grandTotal: number;    // Tổng thành tiền sau khi áp dụng giảm giá
    status: "Pending" | "Paid" | "Overdue"; // Trạng thái hóa đơn
}
export const demoInvoices: Invoice[] = [
    { invoiceID: "INV001", customerID: "CUST001", employeeID: "EMP001", orderID: "ORD001", invoiceDate: "2025-05-01", totalAmount: 1500, discount: 100, grandTotal: 1400, status: "Paid" },
    { invoiceID: "INV002", customerID: "CUST002", employeeID: "EMP002", orderID: "ORD002", invoiceDate: "2025-05-02", totalAmount: 2000, discount: 200, grandTotal: 1800, status: "Pending" },
    { invoiceID: "INV003", customerID: "CUST003", employeeID: "EMP001", orderID: "ORD003", invoiceDate: "2025-05-03", totalAmount: 3000, discount: 150, grandTotal: 2850, status: "Overdue" },
    { invoiceID: "INV004", customerID: "CUST004", employeeID: "EMP003", orderID: "ORD004", invoiceDate: "2025-05-04", totalAmount: 1200, discount: 0, grandTotal: 1200, status: "Pending" },
    { invoiceID: "INV005", customerID: "CUST005", employeeID: "EMP002", orderID: "ORD005", invoiceDate: "2025-05-05", totalAmount: 1700, discount: 100, grandTotal: 1600, status: "Paid" },
    { invoiceID: "INV006", customerID: "CUST006", employeeID: "EMP001", orderID: "ORD006", invoiceDate: "2025-05-06", totalAmount: 2500, discount: 250, grandTotal: 2250, status: "Pending" },
    { invoiceID: "INV007", customerID: "CUST007", employeeID: "EMP003", orderID: "ORD007", invoiceDate: "2025-05-07", totalAmount: 800, discount: 50, grandTotal: 750, status: "Overdue" },
    { invoiceID: "INV008", customerID: "CUST008", employeeID: "EMP002", orderID: "ORD008", invoiceDate: "2025-05-08", totalAmount: 1400, discount: 140, grandTotal: 1260, status: "Pending" },
    { invoiceID: "INV009", customerID: "CUST009", employeeID: "EMP001", orderID: "ORD009", invoiceDate: "2025-05-09", totalAmount: 1000, discount: 0, grandTotal: 1000, status: "Paid" },
    { invoiceID: "INV010", customerID: "CUST010", employeeID: "EMP003", orderID: "ORD010", invoiceDate: "2025-05-10", totalAmount: 2200, discount: 100, grandTotal: 2100, status: "Pending" },
    { invoiceID: "INV011", customerID: "CUST011", employeeID: "EMP002", orderID: "ORD011", invoiceDate: "2025-05-11", totalAmount: 1800, discount: 180, grandTotal: 1620, status: "Overdue" },
    { invoiceID: "INV012", customerID: "CUST012", employeeID: "EMP001", orderID: "ORD012", invoiceDate: "2025-05-12", totalAmount: 900, discount: 90, grandTotal: 810, status: "Pending" },
    { invoiceID: "INV013", customerID: "CUST013", employeeID: "EMP003", orderID: "ORD013", invoiceDate: "2025-05-13", totalAmount: 1500, discount: 150, grandTotal: 1350, status: "Paid" },
    { invoiceID: "INV014", customerID: "CUST014", employeeID: "EMP002", orderID: "ORD014", invoiceDate: "2025-05-14", totalAmount: 1100, discount: 50, grandTotal: 1050, status: "Pending" },
    { invoiceID: "INV015", customerID: "CUST015", employeeID: "EMP001", orderID: "ORD015", invoiceDate: "2025-05-15", totalAmount: 1350, discount: 135, grandTotal: 1215, status: "Overdue" },
    { invoiceID: "INV016", customerID: "CUST016", employeeID: "EMP003", orderID: "ORD016", invoiceDate: "2025-05-16", totalAmount: 950, discount: 0, grandTotal: 950, status: "Pending" },
    { invoiceID: "INV017", customerID: "CUST017", employeeID: "EMP002", orderID: "ORD017", invoiceDate: "2025-05-17", totalAmount: 1250, discount: 100, grandTotal: 1150, status: "Paid" },
    { invoiceID: "INV018", customerID: "CUST018", employeeID: "EMP001", orderID: "ORD018", invoiceDate: "2025-05-18", totalAmount: 1600, discount: 160, grandTotal: 1440, status: "Pending" },
    { invoiceID: "INV019", customerID: "CUST019", employeeID: "EMP003", orderID: "ORD019", invoiceDate: "2025-05-19", totalAmount: 2100, discount: 200, grandTotal: 1900, status: "Overdue" },
    { invoiceID: "INV020", customerID: "CUST020", employeeID: "EMP002", orderID: "ORD020", invoiceDate: "2025-05-20", totalAmount: 3000, discount: 300, grandTotal: 2700, status: "Pending" },
    { invoiceID: "INV021", customerID: "CUST021", employeeID: "EMP001", orderID: "ORD021", invoiceDate: "2025-05-21", totalAmount: 2500, discount: 250, grandTotal: 2250, status: "Paid" },
    { invoiceID: "INV022", customerID: "CUST022", employeeID: "EMP002", orderID: "ORD022", invoiceDate: "2025-05-22", totalAmount: 1800, discount: 100, grandTotal: 1700, status: "Pending" },
    { invoiceID: "INV023", customerID: "CUST023", employeeID: "EMP003", orderID: "ORD023", invoiceDate: "2025-05-23", totalAmount: 2200, discount: 200, grandTotal: 2000, status: "Overdue" },
    { invoiceID: "INV024", customerID: "CUST024", employeeID: "EMP001", orderID: "ORD024", invoiceDate: "2025-05-24", totalAmount: 3100, discount: 300, grandTotal: 2800, status: "Paid" },
    { invoiceID: "INV025", customerID: "CUST025", employeeID: "EMP002", orderID: "ORD025", invoiceDate: "2025-05-25", totalAmount: 2000, discount: 150, grandTotal: 1850, status: "Pending" },
    { invoiceID: "INV026", customerID: "CUST026", employeeID: "EMP003", orderID: "ORD026", invoiceDate: "2025-05-26", totalAmount: 2750, discount: 275, grandTotal: 2475, status: "Overdue" },
    { invoiceID: "INV027", customerID: "CUST027", employeeID: "EMP001", orderID: "ORD027", invoiceDate: "2025-05-27", totalAmount: 1900, discount: 100, grandTotal: 1800, status: "Paid" },
    { invoiceID: "INV028", customerID: "CUST028", employeeID: "EMP002", orderID: "ORD028", invoiceDate: "2025-05-28", totalAmount: 2300, discount: 200, grandTotal: 2100, status: "Pending" },
    { invoiceID: "INV029", customerID: "CUST029", employeeID: "EMP003", orderID: "ORD029", invoiceDate: "2025-05-29", totalAmount: 2600, discount: 260, grandTotal: 2340, status: "Overdue" },
    { invoiceID: "INV030", customerID: "CUST030", employeeID: "EMP001", orderID: "ORD030", invoiceDate: "2025-05-30", totalAmount: 3000, discount: 300, grandTotal: 2700, status: "Paid" }
];
