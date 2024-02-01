import { Globe } from "lucide-react";

export default function AcmeLogo() {
  return (
    <div className="flex items-center gap-0.5 text-5xl font-medium tracking-tighter">
      <Globe
        className="rotate-12 text-background"
        size={46}
        strokeWidth={1.75}
      />
      <h1 className="text-background">Acme</h1>
    </div>
  );
}
