import Breadcrumbs from "@/components/dashboard/breadcrumbs";
import CreateInvoiceForm from "@/components/dashboard/invoices/create-form";
import { fetchCustomersSimple } from "@/lib/api";
import { CustomerSimple } from "@/lib/api.types";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/dashboard/invoices/create")({
  component: CreateInvoice,
  loader: () => fetchCustomersSimple(),
});

function CreateInvoice() {
  const customers = useLoaderData({
    from: "/_layout/dashboard/invoices/create",
  }) as CustomerSimple[];
  return (
    <>
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
        <CreateInvoiceForm customers={customers} />
      </main>
    </>
  );
}
