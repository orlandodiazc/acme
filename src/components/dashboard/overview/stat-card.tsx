import { type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

interface StatCard {
  Icon?: LucideIcon;
  title: string;
  value: number | string;
}

export default function StatCard({ Icon, title, value }: StatCard) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-accent-foreground">
          {Icon ? <Icon className="h-5 w-5" strokeWidth={1.8} /> : null}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-2xl">{value}</p>
      </CardContent>
    </Card>
  );
}
