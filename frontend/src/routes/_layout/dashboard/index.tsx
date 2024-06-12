import LatestInvoices from "@/components/dashboard/overview/latest-invoices";
import RevenueChart from "@/components/dashboard/overview/revenue-chart";
import StatCard from "@/components/dashboard/overview/stat-card";
import { ErrorPageComponent } from "@/components/errors";
import Spinner from "@/components/spinner";
import { overviewQuery } from "@/lib/api/queryOptions";
import { formatCurrency } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Banknote, Clock, Inbox, Users } from "lucide-react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const Route = createFileRoute("/_layout/dashboard/")({
  component: DashboardIndex,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(overviewQuery());
  },
});

function DashboardIndex() {
  return (
    <main>
      <h1 className="mb-4 text-2xl md:text-3xl">Overview</h1>
      <ErrorBoundary FallbackComponent={ErrorPageComponent}>
        <Suspense
          fallback={
            <div className="flex justify-center text-primary">
              <Spinner />
            </div>
          }
        >
          <Overview />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}

function Overview() {
  const { data: overview } = useSuspenseQuery(overviewQuery());
  return (
    <>
      <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          Icon={Banknote}
          title="Collected"
          value={formatCurrency(overview.totalPaidInvoices)}
        />
        <StatCard
          Icon={Clock}
          title="Pending"
          value={formatCurrency(overview.totalPendingInvoices)}
        />
        <StatCard
          Icon={Inbox}
          title="Total Invoices"
          value={overview.invoiceCount}
        />
        <StatCard
          Icon={Users}
          title="Total Customers"
          value={overview.customerCount}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenues={overview.revenues} />
        <LatestInvoices latestInvoices={overview.latestInvoices} />
      </div>
    </>
  );
}
