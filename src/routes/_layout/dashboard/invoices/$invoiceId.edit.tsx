import Breadcrumbs from "@/components/dashboard/breadcrumbs";
import EditInvoiceForm from "@/components/dashboard/invoices/edit-form";
import { fetchCustomersSummary, fetchInvoice } from "@/lib/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_layout/dashboard/invoices/$invoiceId/edit",
)({
  component: EditInvoice,
  loader: async ({ params: { invoiceId } }) => {
    const [customers, invoice] = await Promise.all([
      fetchCustomersSummary(),
      fetchInvoice(invoiceId),
    ]);
    return { customers, invoice };
  },
});

function EditInvoice() {
  const { customers, invoice } = Route.useLoaderData();
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
      <EditInvoiceForm customers={customers} defaultValues={invoice} />
    </main>
  );
}
