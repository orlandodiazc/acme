import Breadcrumbs from "@/components/dashboard/breadcrumbs";
import InvoiceForm from "@/components/dashboard/invoices/form";
import {
  customersSummaryQuery,
  useCreateInvoiceMutation,
} from "@/lib/api/queryOptions";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/_layout/dashboard/invoices/new")({
  component: CreateInvoice,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(customersSummaryQuery()),
});

function CreateInvoice() {
  const { mutate, status } = useCreateInvoiceMutation();

  const navigate = Route.useNavigate();

  function handleSubmit(formData: FormData) {
    mutate(formData, {
      onSuccess: () => {
        navigate({
          to: "/dashboard/invoices",
          search: { page: 1 },
        });
        toast.success("Succesfully created invoice!");
      },
      onError: () => {
        toast.error("Unable to create invoice.");
      },
    });
  }
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
      <InvoiceForm handleSubmit={handleSubmit} status={status} />
    </main>
  );
}
