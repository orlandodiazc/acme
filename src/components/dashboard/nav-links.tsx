import { Link } from "@tanstack/react-router";
import { FileText, Home, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

export default function NavLinks() {
  return (
    <div className="flex flex-col">
      <Link
        to="/dashboard"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "gap-2 justify-start",
        )}
      >
        <Home />
        <p className="hidden md:block">Home</p>
      </Link>
      <Link
        to="/dashboard/invoices"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "gap-2 justify-start",
        )}
      >
        <FileText />
        <p className="hidden md:block">Invoices</p>
      </Link>
      <Link
        to="/dashboard/customers"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "gap-2 justify-start",
        )}
      >
        <Users />
        <p className="hidden md:block">Customers</p>
      </Link>
    </div>
  );
}
