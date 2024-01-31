import LatestInvoices from "@/components/dashboard/latest-invoices";
import RevenueChart from "@/components/dashboard/revenue-chart";
import StatCard from "@/components/dashboard/stat-card";
import { OverviewStats } from "@/lib/api.types";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { Banknote, Clock, Inbox, Users } from "lucide-react";

export const Route = createFileRoute("/_layout/dashboard/")({
  component: DashboardIndex,
  loader: async () => {
    const response = await fetch("http://localhost:8080/api/overview/stats");
    return response.json();
  },
});

function DashboardIndex() {
  const { revenues, latestInvoices } = useLoaderData({
    from: "/_layout/dashboard/",
  }) as OverviewStats;
  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard Icon={Banknote} title="Collected" value={4000} />
        <StatCard Icon={Clock} title="Pending" value={4000} />
        <StatCard Icon={Inbox} title="Total Invoices" value={4000} />
        <StatCard Icon={Users} title="Total Customers" value={4000} />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenues={revenues} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
