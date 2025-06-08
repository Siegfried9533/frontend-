"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { customerDebts } from "@/app/admin/lib/mock/customerDebt";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays } from "date-fns";
import { Range } from "react-date-range";
import CalendarBoxPopup from "@/components/ui/calendarBoxPopup";

const revenueData = [
  { name: "01/05", doanhThu: 400 },
  { name: "02/05", doanhThu: 700 },
  { name: "03/05", doanhThu: 1100 },
  { name: "04/05", doanhThu: 950 },
];

const revenueTableData = [
  { date: "01/05/2025", orders: 10, returns: 1, sales: 1200000, revenue: 1000000, cost: 600000, profit: 400000 },
  { date: "02/05/2025", orders: 15, returns: 2, sales: 1600000, revenue: 1400000, cost: 800000, profit: 600000 },
  { date: "03/05/2025", orders: 8, returns: 0, sales: 800000, revenue: 700000, cost: 400000, profit: 300000 },
];

export default function BusinessDashboard() {
  const [search, setSearch] = useState("");
  const filteredDebts = customerDebts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const [showCalendar, setShowCalendar] = useState(false);

  const [selectedRange, setSelectedRange] = useState<Range>({
    startDate: addDays(new Date(), -30),
    endDate: new Date(),
    key: "selection",
  });

  const handleSelectRange = (range: Range) => {
    setSelectedRange(range);
  };

  const formatDate = (date: Date | undefined): string => {
    return date ? date.toLocaleDateString("vi-VN") : "";
  };

  const handleOpenCalendar = () => {
    setShowCalendar(true);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Thống kê kinh doanh</h1>
      <Tabs defaultValue="report">
        <TabsList className="mb-4">
          <TabsTrigger value="report">Báo cáo kinh doanh</TabsTrigger>
          <TabsTrigger value="debt">Tra cứu công nợ</TabsTrigger>
        </TabsList>

        {/* Báo cáo kinh doanh */}
        <TabsContent value="report" className="space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={handleOpenCalendar}>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                <span>30 ngày qua</span>
              </div>
            </Button>
            {showCalendar && (
              <CalendarBoxPopup
                onSelectRange={handleSelectRange}
                initialRange={selectedRange}
                onClose={handleCloseCalendar}
              />
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Doanh thu</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="doanhThu" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chi tiết theo ngày</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border">
                  <thead>
                    <tr className="bg-gray-100 text-center">
                      <th className="p-2 border">Ngày</th>
                      <th className="p-2 border">Đơn chốt</th>
                      <th className="p-2 border">Đơn hoàn</th>
                      <th className="p-2 border">Doanh số</th>
                      <th className="p-2 border">Doanh thu</th>
                      <th className="p-2 border">Vốn</th>
                      <th className="p-2 border">Lợi nhuận</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenueTableData.map((row, index) => (
                      <tr key={index} className="text-center">
                        <td className="border p-2">{row.date}</td>
                        <td className="border p-2">{row.orders}</td>
                        <td className="border p-2">{row.returns}</td>
                        <td className="border p-2">{row.sales.toLocaleString()} đ</td>
                        <td className="border p-2">{row.revenue.toLocaleString()} đ</td>
                        <td className="border p-2">{row.cost.toLocaleString()} đ</td>
                        <td className="border p-2">{row.profit.toLocaleString()} đ</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tra cứu công nợ */}
        <TabsContent value="debt">
          <Card>
            <CardHeader>
              <CardTitle>Tra cứu công nợ</CardTitle>
              <Input
                placeholder="Tìm theo tên khách hàng"
                className="mt-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 border">Tên khách hàng</th>
                      <th className="p-2 border">Số điện thoại</th>
                      <th className="p-2 border">Tổng nợ</th>
                      <th className="p-2 border">Số đơn chưa thanh toán</th>
                      <th className="p-2 border">Giao dịch gần nhất</th>
                      <th className="p-2 border">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDebts.map((c, index) => (
                      <tr key={index} className="text-center">
                        <td className="border p-2">{c.name}</td>
                        <td className="border p-2">{c.phone}</td>
                        <td className="border p-2">{c.total.toLocaleString()} đ</td>
                        <td className="border p-2">{c.unpaidOrders}</td>
                        <td className="border p-2">{c.lastTransaction}</td>
                        <td className="border p-2">
                          <span className={`px-2 py-1 rounded text-white text-xs ${c.status === "Còn nợ" ? "bg-red-500" : "bg-green-500"}`}>
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
