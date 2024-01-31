import { Link } from "@tanstack/react-router";
import NavLinks from "./nav-links";
import { Button } from "../ui/button";
import { PowerIcon } from "lucide-react";
import AcmeLogo from "../acme-logo";

export default function SideNav() {
  return (
    <div className="w-full flex-none md:w-64">
      <div className="flex h-full flex-col px-3 py-4 md:px-2">
        <Link
          className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
          to="/"
        >
          <div className="w-32 text-white md:w-40">
            <AcmeLogo />
          </div>
        </Link>
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLinks />
          <form>
            <Button variant="ghost" className="gap-1">
              <PowerIcon />
              <div className="hidden md:block">Sign Out</div>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
