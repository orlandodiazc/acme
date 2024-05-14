import Breadcrumbs from "@/components/dashboard/breadcrumbs";
import InvoiceForm from "@/components/dashboard/invoices/form";
import {
  customersSummaryQuery,
  invoiceQuery,
  usePutInvoiceMutation,
} from "@/lib/api/queryOptions";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute(
  "/_layout/dashboard/invoices/$invoiceId/edit",
)({
  component: EditInvoice,
  loader: async ({ context: { queryClient }, params: { invoiceId } }) => {
    queryClient.ensureQueryData(customersSummaryQuery());
    queryClient.ensureQueryData(invoiceQuery(invoiceId));
  },
});

function EditInvoice() {
  const { invoiceId } = Route.useParams();
  const { mutate, status } = usePutInvoiceMutation(invoiceId);
  const { data } = useQuery(invoiceQuery(invoiceId));
  function handleSubmit(formData: FormData) {
    mutate(formData, {
      onSuccess() {
        toast.success("Succesfully edited invoice.");
      },
      onError() {
        toast.error("Unable to edit invoice.");
      },
    });
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", to: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            to: "#",
            isActive: true,
          },
        ]}
      />
      <InvoiceForm handleSubmit={handleSubmit} status={status} invoice={data} />
    </main>
  );
}
