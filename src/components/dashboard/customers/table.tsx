import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomerFiltered } from "@/lib/api.types";
import { formatCurrency, getInitials } from "@/lib/utils";

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
            <TableCell className="flex items-center">
              <Avatar className="mr-4">
                <AvatarImage
                  src={customer.imageUrl}
                  alt={`${customer.name}'s profile picture`}
                />
                <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
              </Avatar>

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
