import { Link } from "@tanstack/react-router";
import NavLinks from "./nav-links";
import { Power } from "lucide-react";
import AcmeLogo from "../acme-logo";
import { Button } from "../ui/button";

export default function SideNav() {
  return (
    <div className="flex h-full shrink-0 flex-col px-3 py-4 md:w-64 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-primary p-4 md:h-40"
        to="/"
      >
        <AcmeLogo />
      </Link>
      <div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md  md:block"></div>
        <form>
          <Button variant="ghost" className="w-full justify-start gap-1 px-2">
            <Power className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </Button>
        </form>
      </div>
    </div>
  );
}
