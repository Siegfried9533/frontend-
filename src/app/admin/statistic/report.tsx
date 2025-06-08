import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

const revenueData = [
    { name: "Th1", doanhThu: 1200000 },
    { name: "Th2", doanhThu: 1500000 },
    { name: "Th3", doanhThu: 1800000 },
    { name: "Th4", doanhThu: 1300000 },
    { name: "Th5", doanhThu: 1700000 },
    { name: "Th6", doanhThu: 2200000 },
];

export default function ReportPage() {
    const [debtSearch, setDebtSearch] = useState("");

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Thống kê kinh doanh</h1>

            <div className="w-full">
                <Tabs defaultValue="report">
                    <TabsList className="mb-4">
                        <TabsTrigger value="debt">Tra cứu công nợ</TabsTrigger>
                        <TabsTrigger value="report">Báo cáo kinh doanh</TabsTrigger>
                    </TabsList>

                    <TabsContent value="debt">
                        <Card>
                            <CardContent className="p-6 space-y-4">
                                <h2 className="text-xl font-semibold">Tra cứu công nợ</h2>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Nhập mã khách hàng hoặc tên"
                                        value={debtSearch}
                                        onChange={(e) => setDebtSearch(e.target.value)}
                                    />
                                    <Button>Tìm kiếm</Button>
                                </div>
                                {/* TODO: Hiển thị danh sách công nợ sau khi tìm */}
                                <div className="text-muted-foreground italic">Không có dữ liệu hiển thị.</div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="report">
                        <Card>
                            <CardContent className="p-6 space-y-4">
                                <h2 className="text-xl font-semibold">Báo cáo doanh thu theo tháng</h2>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={revenueData}>
                                        <XAxis dataKey="name" />
                                        <YAxis tickFormatter={(v) => `${v / 1000000}tr`} />
                                        <Tooltip formatter={(v) => `${v.toLocaleString()}₫`} />
                                        <Bar dataKey="doanhThu" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                                {/* TODO: Thêm tùy chọn lọc theo năm, quý nếu cần */}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
