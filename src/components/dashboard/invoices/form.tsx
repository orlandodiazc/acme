import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusButton } from "@/components/ui/status-button";
import { ApiSchema } from "@/lib/api/apiSchema";
import { customersSummaryQuery } from "@/lib/api/queryOptions";
import { cn, formatCurrency } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { CircleDollarSign, UserCircle } from "lucide-react";
import InvoiceBadge from "./invoice-badge";

export default function InvoiceForm({
  invoice,
  handleSubmit,
  status,
}: {
  invoice?: ApiSchema["InvoiceBaseResponse"];
  handleSubmit: (formData: FormData) => void;
  status: "pending" | "success" | "error" | "idle";
}) {
  const { data: customers } = useSuspenseQuery(customersSummaryQuery());
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        handleSubmit(formData);
      }}
    >
      <div className="rounded-md border p-4 md:p-6">
        <div className="mb-4">
          <Label htmlFor="customer">Choose customer</Label>
          <Select name="customerId" defaultValue={invoice?.customerId}>
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
              type="text"
              pattern="[0-9]+([,][0-9]{1,2})?"
              placeholder="Enter USD amount"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={formatCurrency(invoice?.amount)}
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
                  defaultChecked={invoice?.status === "pending"}
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
                  defaultChecked={invoice?.status === "paid"}
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
          search={{ page: 1 }}
          className={cn(
            buttonVariants({ variant: "secondary" }),
            status === "pending" && "pointer-events-none opacity-50",
          )}
          disabled={status === "pending"}
        >
          Cancel
        </Link>
        <StatusButton
          type="submit"
          disabled={status === "pending"}
          status={status}
        >
          Submit
        </StatusButton>
      </div>
    </form>
  );
}
