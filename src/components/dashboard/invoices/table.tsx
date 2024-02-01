import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvoiceFiltered } from "@/lib/api.types";
import { formatCurrency, formatDateToLocal } from "@/lib/utils";
import { Pencil, Trash } from "lucide-react";

export default function InvoicesTable({
  invoices,
}: {
  invoices: InvoiceFiltered[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="flex items-center gap-2">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <img
                  src={invoice.imageUrl}
                  className="aspect-square h-full w-full"
                />
              </span>
              <span>{invoice.name}</span>
            </TableCell>
            <TableCell>{invoice.email}</TableCell>
            <TableCell>{formatCurrency(invoice.amount)}</TableCell>
            <TableCell>
              {formatDateToLocal(invoice.processingDate.toString())}
            </TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>
              <div className="flex gap-1">
                <Button variant="outline" size="icon">
                  <Pencil className="h-5 w-5" strokeWidth={1.7} />
                </Button>
                <Button variant="outline" size="icon">
                  <Trash className="h-5 w-5" strokeWidth={1.7} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
