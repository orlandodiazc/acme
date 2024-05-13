import Breadcrumbs from "@/components/dashboard/breadcrumbs";
import EditInvoiceForm from "@/components/dashboard/invoices/edit-form";
import ErrorComponent from "@/components/error";
import { customersSummaryQuery, invoiceQuery } from "@/lib/api/queryOptions";
import { createFileRoute } from "@tanstack/react-router";
import { ErrorBoundary } from "react-error-boundary";

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
      <ErrorBoundary FallbackComponent={ErrorComponent}>
        <EditInvoiceForm />
      </ErrorBoundary>
    </main>
  );
}
