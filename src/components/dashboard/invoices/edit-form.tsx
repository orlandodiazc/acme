import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@/hooks/useMutation";
import { putInvoice, type PutInvoice } from "@/lib/api";
import { CustomerSimple, Invoice, Status } from "@/lib/api.types";
import { Link, useRouter } from "@tanstack/react-router";
import { CircleDollarSign, UserCircle } from "lucide-react";
import { toast } from "sonner";
import InvoiceBadge from "./invoice-badge";

export default function EditInvoiceForm({
  customers,
  defaultValues,
}: {
  customers: CustomerSimple[];
  defaultValues: Invoice;
}) {
  const router = useRouter();
  const editInvoiceMutation = useMutation<PutInvoice, Invoice>({
    fn: putInvoice,
    onSuccess: () => {
      router.invalidate();
      toast.success("Succesfully edited invoice.");
      router.navigate({ to: "/dashboard/invoices", search: true });
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        const formData = new FormData(event.target as HTMLFormElement);
        editInvoiceMutation.mutate({
          putInvoice: {
            customerId: formData.get("customerId") as string,
            amount: Number(formData.get("amount")) as number,
            status: formData.get("status") as Status,
          },
          id: defaultValues.id,
        });
      }}
    >
      <div className="rounded-md border p-4 md:p-6">
        <div className="mb-4">
          <Label htmlFor="customer">Choose customer</Label>
          <Select name="customerId" defaultValue={defaultValues?.customerId}>
            <SelectTrigger className="relative">
              <SelectValue placeholder="Select a customer" />
              <UserCircle className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </SelectTrigger>
            <SelectContent id="customer">
              {customers.map(({ name, id }) => (
                <SelectItem key={id} value={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <Label htmlFor="amount">Choose an amount</Label>
          <div className="relative">
            <Input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              placeholder="Enter USD amount"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={defaultValues?.amount}
            />
            <CircleDollarSign className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border px-5 py-2">
            <div className="flex gap-4">
              <div className="flex items-center">
                <Input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="cursor-pointer"
                  defaultChecked={defaultValues?.status === "pending"}
                />
                <Label htmlFor="pending" className="ml-2 cursor-pointer">
                  <InvoiceBadge status="pending" />
                </Label>
              </div>
              <div className="flex cursor-pointer items-center">
                <Input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="cursor-pointer"
                  defaultChecked={defaultValues?.status === "paid"}
                />
                <Label htmlFor="paid" className="ml-2 cursor-pointer">
                  <InvoiceBadge status="paid" />
                </Label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex items-center justify-end gap-4">
        <Link to="../" className={buttonVariants({ variant: "secondary" })}>
          Cancel
        </Link>
        <Button>Edit Invoice</Button>
      </div>
    </form>
  );
}
