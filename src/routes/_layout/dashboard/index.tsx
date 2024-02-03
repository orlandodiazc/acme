import LatestInvoices from "@/components/dashboard/overview/latest-invoices";
import RevenueChart from "@/components/dashboard/overview/revenue-chart";
import StatCard from "@/components/dashboard/overview/stat-card";
import Spinner from "@/components/spinner";
import { fetchOverview } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { Banknote, Clock, Inbox, Users } from "lucide-react";

export const Route = createFileRoute("/_layout/dashboard/")({
  component: DashboardIndex,
  pendingComponent: () => (
    <>
      <h1 className="mb-4 text-xl md:text-2xl">Overview</h1>
      <Spinner />
    </>
  ),
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
  } = Route.useLoaderData();
  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Overview</h1>
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
