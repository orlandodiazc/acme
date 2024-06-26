import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ApiSchema } from "@/lib/api/apiSchema";
import { formatCurrency, getCustomerImageSrc, getInitials } from "@/lib/utils";

export default function CustomersTable({
  customers,
}: {
  customers: ApiSchema["CustomerFilteredResponse"][];
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
                  src={getCustomerImageSrc(customer?.imageId)}
                  alt={`${customer.name}'s profile picture`}
                />
                <AvatarFallback>
                  {getInitials(customer.name) ??
                    customer.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <span>{customer.name}</span>
            </TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.invoicesCount}</TableCell>
            <TableCell>{formatCurrency(customer.pendingTotal)}</TableCell>
            <TableCell>{formatCurrency(customer.paidTotal)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
