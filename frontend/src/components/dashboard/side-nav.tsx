import { Link, useNavigate } from "@tanstack/react-router";
import NavLinks from "./nav-links";
import { Power } from "lucide-react";
import AcmeLogo from "../acme-logo";
import { Button } from "../ui/button";
import { useLogoutMutation } from "@/lib/api/queryOptions";

export default function SideNav() {
  const { mutate } = useLogoutMutation();
  const navigate = useNavigate();
  function handleClick() {
    mutate(undefined, {
      onSuccess() {
        navigate({ to: "/" });
      },
    });
  }
  return (
    <header className="flex shrink-0 flex-col px-2 py-3 md:w-64 md:py-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-primary p-4 md:h-40"
        to="/"
      >
        <AcmeLogo />
      </Link>
      <div className="flex grow md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden grow md:block" />
        <Button
          variant="ghost"
          className="h-full justify-start gap-1 sm:px-4 md:h-auto md:px-2"
          onClick={handleClick}
        >
          <Power className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </Button>
      </div>
    </header>
  );
}
