export interface CustomerFiltered {
    name: string;
    id: string;
    email: string;
    paidInvoicesTotal: number;
    pendingInvoicesTotal: number;
    imageUrl: string;
    invoicesCount: number;
}

export interface CustomerSimple {
    name: string;
    id: string;
}

export interface InvoiceDetails {
    name: string;
    id: string;
    email: string;
    amount: number;
    imageUrl: string;
}

export interface InvoiceFiltered {
    name: string;
    id: string;
    status: string;
    email: string;
    amount: number;
    processingDate: Date;
    imageUrl: string;
}

export interface InvoiceTotalByStatus {
    paidInvoicesTotal: number;
    pendingInvoicesTotal: number;
}

export interface OverviewStats {
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
    amount: number;
    status: string;
    processingDate: Date;
    customerId: string;
}

export interface Revenue {
    monthName: string;
    revenue: number;
}
