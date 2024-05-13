import { Badge, BadgeProps } from "@/components/ui/badge";
import { ApiSchema } from "@/lib/api/apiSchema";
import { Check, Clock, LucideIcon } from "lucide-react";

interface Variant {
  Icon: LucideIcon;
  description: string;
  styleVariant: BadgeProps["variant"];
}
const invoiceBadgeVariants: Record<ApiSchema["Invoice"]["status"], Variant> = {
  paid: {
    Icon: Check,
    description: "Paid",
    styleVariant: "success",
  },
  pending: {
    Icon: Clock,
    description: "Pending",
    styleVariant: "secondary",
  },
};

export default function InvoiceBadge({
  status,
}: {
  status: ApiSchema["Invoice"]["status"];
}) {
  const { styleVariant, description, Icon } = invoiceBadgeVariants[status];
  return (
    <Badge className="gap-1.5" variant={styleVariant} size="lg">
      <span>{description} </span> <Icon className="h-4 w-4" />
    </Badge>
  );
}
