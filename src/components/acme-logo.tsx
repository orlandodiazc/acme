import { Globe } from "lucide-react";

export default function AcmeLogo() {
  return (
    <div className="flex flex-row items-center gap-1 leading-none text-background">
      <Globe className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">Acme</p>
    </div>
  );
}
