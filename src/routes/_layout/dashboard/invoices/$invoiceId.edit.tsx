import Breadcrumbs from "@/components/dashboard/breadcrumbs";
import EditInvoiceForm from "@/components/dashboard/invoices/edit-form";
import { customersSummaryQuery, invoiceQuery } from "@/lib/queryOptions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_layout/dashboard/invoices/$invoiceId/edit",
)({
  component: EditInvoice,
  loader: async ({ context: { queryClient }, params: { invoiceId } }) => {
    queryClient.ensureQueryData(customersSummaryQuery);
    queryClient.ensureQueryData(invoiceQuery(invoiceId));
  },
});

function EditInvoice() {
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
      <EditInvoiceForm />
    </main>
  );
}
