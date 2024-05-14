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
  getInitials,
} from "@/lib/utils";
import {
  Link,
  defaultStringifySearch,
  useSearch,
} from "@tanstack/react-router";
import { Pencil, Trash } from "lucide-react";
import InvoiceBadge from "./invoice-badge";

export default function InvoicesTable({
  invoices,
}: {
  invoices: ApiSchema["InvoiceFilteredResponse"]["invoices"];
}) {
  const search = useSearch({ from: "/_layout/dashboard/invoices/" });
  const searchString = defaultStringifySearch(search);

  const { mutate, status, variables } = useDeleteInvoiceMutation(searchString);
  console.log(variables, status);
  // const deleteInvoiceMutation = useMutation({
  //   mutationKey: ["invoices", "delete"],
  //   mutationFn: deleteInvoice,
  //   onMutate: async (deleteId) => {
  //     await queryClient.cancelQueries({
  //       queryKey: ["invoices", "delete", deleteId],
  //     });
  //     const previousInvoices = queryClient.getQueryData<
  //       ApiSchema["InvoiceFilteredResponse"]
  //     >(["invoices", searchString]);
  //     queryClient.setQueryData<ApiSchema["InvoiceFilteredResponse"]>(
  //       ["invoices", searchString],
  //       (prev) => {
  //         if (!prev) return;
  //         return {
  //           ...prev,
  //           invoices: prev.invoices.filter(
  //             (invoice) => invoice.id !== deleteId,
  //           ),
  //         };
  //       },
  //     );
  //     return { previousInvoices };
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["invoices", searchString] });
  //     navigate({
  //       to: "/dashboard/invoices",
  //       search: true,
  //     });
  //     toast.success("Succesfully deleted invoice!");
  //   },
  //   onError: (err, deleteId, context) => {
  //     queryClient.setQueryData(
  //       ["invoices", searchString],
  //       context?.previousInvoices,
  //     );
  //     toast.error("Unable to deleted invoice.");
  //   },
  // });

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
                  src={invoice?.imageId}
                  alt={`${invoice.name}'s profile picture`}
                />
                <AvatarFallback>{getInitials(invoice.name)}</AvatarFallback>
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
