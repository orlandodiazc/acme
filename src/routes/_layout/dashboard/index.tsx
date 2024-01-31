import LatestInvoices from "@/components/dashboard/latest-invoices";
import RevenueChart from "@/components/dashboard/revenue-chart";
import StatCard from "@/components/dashboard/stat-card";
import { fetchOverview } from "@/lib/api";
import { Overview } from "@/lib/api.types";
import { formatCurrency } from "@/lib/utils";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { Banknote, Clock, Inbox, Users } from "lucide-react";

export const Route = createFileRoute("/_layout/dashboard/")({
  component: DashboardIndex,
  loader: () => fetchOverview(),
});

function DashboardIndex() {
  const {
    totalPaidInvoices,
    totalPendingInvoices,
    invoiceCount,
    customerCount,
    revenues,
    latestInvoices,
  } = useLoaderData({
    from: "/_layout/dashboard/",
  }) as Overview;
  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          Icon={Banknote}
          title="Collected"
          value={formatCurrency(totalPaidInvoices)}
        />
        <StatCard
          Icon={Clock}
          title="Pending"
          value={formatCurrency(totalPendingInvoices)}
        />
        <StatCard Icon={Inbox} title="Total Invoices" value={invoiceCount} />
        <StatCard Icon={Users} title="Total Customers" value={customerCount} />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenues={revenues} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
