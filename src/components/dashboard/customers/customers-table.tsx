import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomerFiltered } from "@/lib/api.types";
import { formatCurrency } from "@/lib/utils";
import { Table } from "lucide-react";

export default function CustomersTable({
  customers,
}: {
  customers: CustomerFiltered[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Total Invoices</TableHead>
          <TableHead>Total Pending</TableHead>
          <TableHead>Total Paid</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell className="flex items-center gap-2">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <img
                  src={customer.imageUrl}
                  className="aspect-square h-full w-full"
                />
              </span>
              <span>{customer.name}</span>
            </TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.invoicesCount}</TableCell>
            <TableCell>
              {formatCurrency(customer.pendingInvoicesTotal)}
            </TableCell>
            <TableCell>{formatCurrency(customer.paidInvoicesTotal)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
