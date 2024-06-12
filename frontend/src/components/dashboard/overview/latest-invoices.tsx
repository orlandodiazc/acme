import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ApiSchema } from "@/lib/api/apiSchema";
import { cn, formatCurrency, getInitials } from "@/lib/utils";
import { RefreshCcw } from "lucide-react";

export default function LatestInvoices({
  latestInvoices,
}: {
  latestInvoices: ApiSchema["InvoiceSummaryResponse"][];
}) {
  return (
    <div className="flex w-full flex-col md:col-span-4 lg:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl">Latest Invoices</h2>
      <div className="flex grow flex-col rounded-xl border p-4">
        <div className="px-1 md:px-3">
          {latestInvoices.map((invoice) => {
            return (
              <div
                key={invoice.id}
                className={cn(
                  "flex flex-row items-center justify-between py-4 [&:not(:last-child)]:border-b",
                )}
              >
                <div className="flex items-center">
                  <Avatar className="mr-4">
                    <AvatarImage
                      src={invoice?.imageId}
                      alt={`${invoice?.name}'s profile picture`}
                    />
                    <AvatarFallback>
                      {getInitials(invoice?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium md:text-base">
                      {invoice?.name}
                    </p>
                    <p className="hidden text-sm text-muted-foreground sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p className="truncate text-sm md:text-base">
                  {formatCurrency(invoice.amount)}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <RefreshCcw className="h-5 w-5 text-accent-foreground" />
          <h3 className="ml-2 text-sm text-accent-foreground ">
            Updated just now
          </h3>
        </div>
      </div>
    </div>
  );
}
