import SideNav from "@/components/dashboard/side-nav";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  beforeLoad: ({ context: { auth } }) => {
    if (!auth?.isAuthenticated) throw redirect({ to: "/login" });
  },
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="flex h-full flex-col md:flex-row md:overflow-hidden">
      <SideNav />
      <div className="flex-grow px-5 py-3 md:overflow-y-auto md:px-8 md:py-10">
        <Outlet />
      </div>
    </div>
  );
}
