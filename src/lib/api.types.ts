// Generated using typescript-generator version 3.2.1263 on 2024-02-03 15:23:20.

export interface RequestInvoice {
  customerId: string;
  amount: number;
  status: string;
}

export interface CustomerFiltered {
  name: string;
  id: string;
  paidInvoicesTotal: number;
  pendingInvoicesTotal: number;
  imageUrl: string;
  invoicesCount: number;
  email: string;
}

export interface CustomerSimple {
  name: string;
  id: string;
}

export interface InvoiceDetails {
  name: string;
  id: string;
  amount: number;
  imageUrl: string;
  email: string;
}

export interface InvoiceFiltered {
  name: string;
  id: string;
  amount: number;
  imageUrl: string;
  processingDate: Date;
  status: string;
  email: string;
}

export interface InvoiceFilteredPageable {
  invoices: InvoiceFiltered[];
  totalPages: number;
}

export interface InvoiceTotalByStatus {
  paidInvoicesTotal: number;
  pendingInvoicesTotal: number;
}

export interface Overview {
  invoiceCount: number;
  customerCount: number;
  totalPaidInvoices: number;
  totalPendingInvoices: number;
  revenues: Revenue[];
  latestInvoices: InvoiceDetails[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  invoices: Invoice[];
}

export interface Invoice {
  id: string;
  customerId: string;
  amount: number;
  status: string;
  processingDate: Date;
}

export interface Revenue {
  monthName: string;
  revenue: number;
}
