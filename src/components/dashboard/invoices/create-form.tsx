import Spinner from "@/components/spinner";
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

import { cn } from "@/lib/utils";
import { queryClient } from "@/main";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { CircleDollarSign, UserCircle } from "lucide-react";
import { toast } from "sonner";
import InvoiceBadge from "./invoice-badge";
import { postInvoice } from "@/lib/api";
import { customersSummaryQuery } from "@/lib/api/queryOptions";
import { ApiSchema } from "@/lib/api/apiSchema";

export default function CreateInvoiceForm() {
  const navigate = useNavigate();
  const createInvoiceMutation = useMutation({
    mutationKey: ["invoices", "create"],
    mutationFn: postInvoice,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["invoices"] });
      navigate({ to: "/dashboard/invoices", search: true });
      toast.success("Succesfully created invoice!");
    },
    onError: () => {
      toast.error("Unable to create invoice.");
    },
  });
  const { data: customers } = useSuspenseQuery(customersSummaryQuery());
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        const formData = new FormData(event.target as HTMLFormElement);
        createInvoiceMutation.mutate({
          invoice: {
            amount: Number(formData.get("amount")) as number,
            status: formData.get("status") as ApiSchema["Invoice"]["status"],
          },
          customerId: "",
        });
      }}
    >
      <div className="rounded-md border p-4 md:p-6">
        <div className="mb-4">
          <Label htmlFor="customer">Choose customer</Label>
          <Select name="customerId" required>
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
              min="0.01"
              type="number"
              step="0.01"
              placeholder="Enter USD amount"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
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
                  defaultChecked
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
        <Link
          to="/dashboard/invoices"
          search={true}
          className={cn(
            buttonVariants({ variant: "secondary" }),
            createInvoiceMutation.isPending && "pointer-events-none opacity-50",
          )}
          disabled={createInvoiceMutation.isPending}
        >
          Cancel
        </Link>
        <Button disabled={createInvoiceMutation.isPending} className="gap-2">
          {createInvoiceMutation.isPending && <Spinner className="h-5 w-5" />}
          Create Invoice
        </Button>
      </div>
    </form>
  );
}
