import AcmeLogo from "@/components/acme-logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, createFileRoute, redirect } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (context.auth) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: Home,
});

function Home() {
  return (
    <main className="flex flex-col p-3 lg:p-6">
      <div className="flex h-28 shrink-0 items-end rounded-lg bg-primary p-4 lg:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col items-center gap-2 lg:mt-4 lg:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg  p-5 lg:w-2/5 lg:px-20">
          <p className="max-w-md text-xl tracking-tight lg:text-3xl lg:leading-normal">
            <strong>Welcome to Acme.</strong> This is a clone for{" "}
            <a href="https://nextjs.org/learn/" className="text-primary">
              Next.js Learn Course
            </a>
            , designed to keep track of customer invoices.
          </p>
          <Link
            to="/login"
            className={cn(buttonVariants({ size: "lg" }), "gap-3 self-start")}
          >
            <span className="text-lg">Log in</span>
            <ArrowRight size={26} />
          </Link>
        </div>
        <div className="flex items-center justify-center p-4 lg:w-3/5 lg:px-28 lg:py-12">
          <img className="lg:hidden" src="hero-mobile.png" />
          <img className="hidden lg:block" src="hero-desktop.png" />
        </div>
      </div>
    </main>
  );
}
