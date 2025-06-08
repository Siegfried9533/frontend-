"use client";
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InvoiceSummaryCard from '@/app/admin/invoice_management/components/invoiceSummaryCard';
import InvoiceTable from '@/app/admin/invoice_management/components/invoiceTable';
import { DetailBillingPanel } from '@/app/admin/invoice_management/components/detailBillingPanel';
import { OutstandingInvoicePanel } from '@/app/admin/invoice_management/components/outstandingInvoicePanel';
import { demoInvoices, Invoice } from '@/app/admin/lib/mock/invoice';
import { calculateTotalPaid, calculateTotalUnpaid, calculateTotalOverdue, getLastUpdateDate } from './utils/invoiceCalculations';
import EditInvoiceModal from '@/app/admin/invoice_management/components/editInvoiceModal';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

export default function InvoiceDashboard() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<Invoice | null>(null);

  // TODO: Khi kết nối database, thay thế demoInvoices bằng API call
  // Ví dụ: const { data: invoices, isLoading } = useQuery('invoices', fetchInvoices);
  const [invoices, setInvoices] = useState<Invoice[]>(demoInvoices);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(invoices.length / itemsPerPage);
  const lastUpdate = getLastUpdateDate();
  const totalPaid = calculateTotalPaid(invoices);
  const totalUnpaid = calculateTotalUnpaid(invoices);
  const totalOverdue = calculateTotalOverdue(invoices);

  // TODO: Khi kết nối database, thêm loading state và error handling
  const handleEditInvoice = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setIsEditModalOpen(true);
  };

  const handleDeleteInvoice = (invoice: Invoice) => {
    setInvoiceToDelete(invoice);
    setIsDeleteModalOpen(true);
  };

  // TODO: Khi kết nối database, thay thế hàm này bằng API call
  const handleConfirmDelete = async () => {
    if (invoiceToDelete) {
      try {
        // TODO: Thêm API call để xóa hóa đơn
        // Ví dụ: await deleteInvoiceAPI(invoiceToDelete.invoiceID);

        // Cập nhật UI sau khi xóa thành công
        setInvoices(prev => prev.filter(inv => inv.invoiceID !== invoiceToDelete.invoiceID));
        setIsDeleteModalOpen(false);
        setInvoiceToDelete(null);

        // Nếu đang xem chi tiết hóa đơn bị xóa, reset selected invoice
        if (selectedInvoice?.invoiceID === invoiceToDelete.invoiceID) {
          setSelectedInvoice(null);
        }

        // TODO: Thêm thông báo thành công
        // Ví dụ: toast.success("Xóa hóa đơn thành công");
      } catch (error) {
        // TODO: Xử lý lỗi từ API
        console.error('Failed to delete invoice:', error);
        // Ví dụ: toast.error("Không thể xóa hóa đơn. Vui lòng thử lại sau.");
      }
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingInvoice(null);
  };

  // TODO: Khi kết nối database, thay thế hàm này bằng API call
  const handleSaveInvoice = async (updated: Invoice) => {
    try {
      // TODO: Thêm API call để cập nhật hóa đơn
      // Ví dụ: await updateInvoiceAPI(updated);

      // Cập nhật UI sau khi cập nhật thành công
      setInvoices(prev => prev.map(inv => inv.invoiceID === updated.invoiceID ? updated : inv));
      handleCloseEditModal();

      // TODO: Thêm thông báo thành công
      // Ví dụ: toast.success("Cập nhật hóa đơn thành công");
    } catch (error) {
      // TODO: Xử lý lỗi từ API
      console.error('Failed to update invoice:', error);
      // Ví dụ: toast.error("Không thể cập nhật hóa đơn. Vui lòng thử lại sau.");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;

    if (totalPages <= maxVisiblePages) {
      // Hiển thị tất cả các trang nếu tổng số trang <= 3
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Hiển thị trang hiện tại và các trang xung quanh
      if (currentPage <= 2) {
        pageNumbers.push(1, 2, 3);
      } else if (currentPage >= totalPages - 1) {
        pageNumbers.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      <div className="col-span-3 grid grid-cols-3 gap-4">
        <InvoiceSummaryCard title="Paid Invoices" amount={totalPaid.toString()} lastUpdate={lastUpdate} />
        <InvoiceSummaryCard title="Unpaid Invoices" amount={totalUnpaid.toString()} lastUpdate={lastUpdate} />
        <InvoiceSummaryCard title="Overdue" amount={totalOverdue.toString()} lastUpdate={lastUpdate} />
      </div>
      <div className="col-span-2 bg-white rounded-xl shadow p-4 overflow-x-auto">
        <InvoiceTable
          invoices={invoices}
          onSelectInvoice={setSelectedInvoice}
          onEditInvoice={handleEditInvoice}
          onDeleteInvoice={handleDeleteInvoice}
        />
      </div>
      <div className="space-y-4">
        {selectedInvoice ? (
          <DetailBillingPanel invoice={selectedInvoice} />
        ) : (
          <div className="text-center text-gray-500 py-8">
            Chọn một hóa đơn để xem chi tiết
          </div>
        )}
        <OutstandingInvoicePanel invoices={invoices} />
      </div>
      <EditInvoiceModal
        open={isEditModalOpen}
        invoice={editingInvoice}
        onClose={handleCloseEditModal}
        onSave={handleSaveInvoice}
      />
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa hóa đơn</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Bạn có chắc chắn muốn xóa hóa đơn {invoiceToDelete?.invoiceID}?</p>
            <p className="text-sm text-gray-500 mt-2">Hành động này không thể hoàn tác.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
