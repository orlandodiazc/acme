import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ApiSchema } from "@/lib/api/apiSchema";
import { useDeleteInvoiceMutation } from "@/lib/api/queryOptions";
import {
  cn,
  formatCurrency,
  formatDateToLocal,
  getCustomerImageSrc,
  getInitials,
} from "@/lib/utils";
import { Link, useSearch } from "@tanstack/react-router";
import { Pencil, Trash } from "lucide-react";
import InvoiceBadge from "./invoice-badge";

export default function InvoicesTable({
  invoices,
}: {
  invoices: ApiSchema["InvoiceFilteredResponse"]["invoices"];
}) {
  const search = useSearch({ from: "/_layout/dashboard/invoices/" });

  const { mutate, status } = useDeleteInvoiceMutation(search);

  return (
    <Table className={status === "pending" ? "animate-pulse" : ""}>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="flex items-center">
              <Avatar className="mr-4">
                <AvatarImage
                  src={getCustomerImageSrc(invoice?.imageId)}
                  alt={`${invoice.name}'s profile picture`}
                />
                <AvatarFallback>
                  {getInitials(invoice.name) ??
                    invoice.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>{invoice.name}</span>
            </TableCell>
            <TableCell>{invoice.email}</TableCell>
            <TableCell>{formatCurrency(invoice.amount)}</TableCell>
            <TableCell>
              {formatDateToLocal(invoice.createdAt.toString())}
            </TableCell>
            <TableCell>
              <InvoiceBadge status={invoice.status} />
            </TableCell>
            <TableCell>
              <div className="flex justify-end gap-1">
                <Link
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "icon",
                    }),
                    status === "pending" && "pointer-events-none opacity-50",
                  )}
                  to="/dashboard/invoices/$invoiceId/edit"
                  params={{ invoiceId: invoice.id }}
                >
                  <Pencil className="h-5 w-5" strokeWidth={1.7} />
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => mutate(invoice.id)}
                  disabled={status === "pending"}
                >
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
