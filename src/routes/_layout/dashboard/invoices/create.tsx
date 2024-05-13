import Breadcrumbs from "@/components/dashboard/breadcrumbs";
import CreateInvoiceForm from "@/components/dashboard/invoices/create-form";
import { customersSummaryQuery } from "@/lib/api/queryOptions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/dashboard/invoices/create")({
  component: CreateInvoice,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(customersSummaryQuery()),
});

function CreateInvoice() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", to: "/dashboard/invoices" },
          {
            label: "Create Invoice",
            to: "/dashboard/invoices/create",
            isActive: true,
          },
        ]}
      />
      <CreateInvoiceForm />
    </main>
  );
}
