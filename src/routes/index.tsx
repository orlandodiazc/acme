import AcmeLogo from "@/components/acme-logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-primary p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg  px-6 py-10 md:w-2/5 md:px-20">
          <p className="text-xl md:text-3xl md:leading-normal tracking-tight">
            <strong>Welcome to Acme.</strong> This is the example for the{" "}
            <a href="https://nextjs.org/learn/" className="text-primary">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            to="/login"
            className={cn(buttonVariants({ size: "lg" }), "self-start gap-3")}
          >
            <span className="text-lg">Log in</span>
            <ArrowRight size={26} />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <img className="md:hidden" src="hero-mobile.png" />
          <img className="hidden md:block" src="hero-desktop.png" />
        </div>
      </div>
    </main>
  );
}
