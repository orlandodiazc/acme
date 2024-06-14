import { Link } from "@tanstack/react-router";
import { FileText, Home, Users } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

const links = [
  { name: "Home", href: "/dashboard", icon: Home },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: FileText,
  },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
];

export default function NavLinks() {
  return (
    <nav className="grow">
      <ul className="flex md:flex-col">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <li className="grow" key={link.name}>
              <Link
                to={link.href}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  "w-full justify-center gap-1 px-2 md:justify-start",
                )}
                activeProps={{ className: "bg-accent" }}
                activeOptions={{
                  exact: link.href === "/dashboard" ? true : false,
                }}
              >
                <LinkIcon className="w-6" />
                <p className="hidden md:block">{link.name}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
