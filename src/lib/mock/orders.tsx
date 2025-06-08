export interface orders {
    id: string;
    customerID: string;
    orderDate: string;
    expectedDeliveryDate: string;
    totalAmount: number;
}

export const mockOrders: orders[] = [
    {
        id: "ORD001",
        customerID: "1",
        orderDate: "2025-04-15",
        expectedDeliveryDate: "2025-04-21",
        totalAmount: 58.87
    },
    {
        id: "ORD002",
        customerID: "2",
        orderDate: "2025-04-20",
        expectedDeliveryDate: "2025-04-22",
        totalAmount: 37.99
    },
    {
        id: "ORD003",
        customerID: "3",
        orderDate: "2025-05-20",
        expectedDeliveryDate: "2025-05-23",
        totalAmount: 20.99
    },
    {
        id: "ORD004",
        customerID: "4",
        orderDate: "2025-04-28",
        expectedDeliveryDate: "2025-04-30",
        totalAmount: 70.69
    },
    {
        id: "ORD005",
        customerID: "5",
        orderDate: "2025-03-23",
        expectedDeliveryDate: "2025-03-27",
        totalAmount: 38.88
    },
    {
        id: "ORD006",
        customerID: "6",
        orderDate: "2025-03-24",
        expectedDeliveryDate: "2025-03-27",
        totalAmount: 22.19
    },
    {
        id: "ORD007",
        customerID: "7",
        orderDate: "2025-04-06",
        expectedDeliveryDate: "2025-04-08",
        totalAmount: 64.1
    },
    {
        id: "ORD008",
        customerID: "8",
        orderDate: "2025-03-22",
        expectedDeliveryDate: "2025-03-28",
        totalAmount: 45.3
    },
    {
        id: "ORD009",
        customerID: "9",
        orderDate: "2025-04-30",
        expectedDeliveryDate: "2025-05-02",
        totalAmount: 30.99
    },
    {
        id: "ORD010",
        customerID: "10",
        orderDate: "2025-04-12",
        expectedDeliveryDate: "2025-04-14",
        totalAmount: 35.4
    },
    {
        id: "ORD011",
        customerID: "11",
        orderDate: "2025-05-10",
        expectedDeliveryDate: "2025-05-13",
        totalAmount: 42.77
    },
    {
        id: "ORD012",
        customerID: "12",
        orderDate: "2025-03-26",
        expectedDeliveryDate: "2025-03-31",
        totalAmount: 27.89
    },
    {
        id: "ORD013",
        customerID: "13",
        orderDate: "2025-04-01",
        expectedDeliveryDate: "2025-04-05",
        totalAmount: 61.88
    },
    {
        id: "ORD014",
        customerID: "14",
        orderDate: "2025-05-01",
        expectedDeliveryDate: "2025-05-06",
        totalAmount: 28.0
    },
    {
        id: "ORD015",
        customerID: "15",
        orderDate: "2025-03-30",
        expectedDeliveryDate: "2025-04-02",
        totalAmount: 33.65
    },
    {
        id: "ORD016",
        customerID: "16",
        orderDate: "2025-04-10",
        expectedDeliveryDate: "2025-04-13",
        totalAmount: 40.99
    },
    {
        id: "ORD017",
        customerID: "17",
        orderDate: "2025-04-03",
        expectedDeliveryDate: "2025-04-07",
        totalAmount: 56.66
    },
    {
        id: "ORD018",
        customerID: "18",
        orderDate: "2025-05-04",
        expectedDeliveryDate: "2025-05-07",
        totalAmount: 50.25
    },
    {
        id: "ORD019",
        customerID: "19",
        orderDate: "2025-03-28",
        expectedDeliveryDate: "2025-04-01",
        totalAmount: 44.12
    },
    {
        id: "ORD020",
        customerID: "20",
        orderDate: "2025-04-08",
        expectedDeliveryDate: "2025-04-10",
        totalAmount: 59.1
    }
];
