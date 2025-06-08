import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Tổng quan",
        icon: Icons.HomeIcon,
        items: [
          {
            title: "Trang bán hàng",
            url: "/admin/home",
          },
        ],
      },
      {
        title: "Khách hàng",
        url: "/admin/cus_management",
        icon: Icons.Customer,
        items: [],
      },
      {
        title: "Nhân viên",
        url: "/admin/emp_management",
        icon: Icons.Employees,
        items: [],
      },
      {
        title: "Sản phẩm",
        url: "/admin/pro_management",
        icon: Icons.Product,
        items: [],
      },
      {
        title: "Thống kê",
        url: "/admin/statistic",
        icon: Icons.Statistic,
        items: [],
      },
      {
        title: "Phân quyền",
        url: "",
        icon: Icons.Authorization,
        items: [],
      },
      {
        title: "Hóa đơn",
        url: "/admin/invoice_management",
        icon: Icons.Bill,
        items: [],
      },
      {
        title: "Kho hàng",
        url: "",
        icon: Icons.Warehouse,
        items: [],
      },

    ],
  },
  {
    label: "OTHERS",
    items: [
      {
        title: "Biểu đồ",
        icon: Icons.PieChart,
        items: [
          {
            title: "Basic Chart",
            url: "/charts/basic-chart",
          },
        ],
      },
      {
        title: "Xác thực",
        icon: Icons.Authentication,
        items: [
          {
            title: "Sign In",
            url: "",
          },
        ],
      },
    ],
  },
];
