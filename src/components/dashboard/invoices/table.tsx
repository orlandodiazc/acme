import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation } from "@/hooks/useMutation";
import { deleteInvoice } from "@/lib/api";
import { InvoiceFiltered } from "@/lib/api.types";
import { formatCurrency, formatDateToLocal, getInitials } from "@/lib/utils";
import { Link, useRouter } from "@tanstack/react-router";
import { Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import InvoiceBadge from "./invoice-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function InvoicesTable({
  invoices,
}: {
  invoices: InvoiceFiltered[];
}) {
  const router = useRouter();
  const deleteInvoiceMutation = useMutation<string, Response>({
    fn: deleteInvoice,
    onSuccess: () => {
      router.invalidate();
      toast.success("Succesfully deleted invoice!");
      router.navigate({ to: "/dashboard/invoices", search: true });
    },
    onError: () => {
      toast.error("Unable to delete invoice.");
    },
  });
  return (
    <Table>
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
                  src={invoice.imageUrl}
                  alt={`${invoice.name}'s profile picture`}
                />
                <AvatarFallback>{getInitials(invoice.name)}</AvatarFallback>
              </Avatar>
              <span>{invoice.name}</span>
            </TableCell>
            <TableCell>{invoice.email}</TableCell>
            <TableCell>{formatCurrency(invoice.amount)}</TableCell>
            <TableCell>
              {formatDateToLocal(invoice.processingDate.toString())}
            </TableCell>
            <TableCell>
              <InvoiceBadge status={invoice.status} />
            </TableCell>
            <TableCell>
              <div className="flex justify-end gap-1">
                <Link
                  className={buttonVariants({
                    variant: "outline",
                    size: "icon",
                  })}
                  disabled={deleteInvoiceMutation.status === "pending"}
                  to="/dashboard/invoices/$invoiceId/edit"
                  params={{ invoiceId: invoice.id }}
                >
                  <Pencil className="h-5 w-5" strokeWidth={1.7} />
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    deleteInvoiceMutation.mutate(invoice.id);
                  }}
                  disabled={deleteInvoiceMutation.status === "pending"}
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
