// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

import { Revenue } from "@/lib/api.types";
import { generateYAxis } from "@/lib/utils";
import { Calendar } from "lucide-react";

export default function RevenueChart({ revenues }: { revenues: Revenue[] }) {
  const chartHeight = 350;

  const { yAxisLabels, topLabel } = generateYAxis(revenues);

  if (!revenues || revenues.length === 0) {
    return <p className="mt-4 text-muted-foreground">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl">Recent Revenue</h2>
      <div className="rounded-lg border p-4">
        <div className="grid grid-cols-13 items-end gap-0.5 rounded-md p-4 sm:gap-3 md:gap-4">
          <div
            className="mb-6 flex flex-col justify-between text-[10px] text-muted-foreground sm:text-sm"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label} className="">
                {label}
              </p>
            ))}
          </div>

          {revenues.map(({ monthName, revenue }) => (
            <div key={monthName} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-400"
                style={{
                  height: `${(chartHeight / topLabel) * revenue}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-muted-foreground sm:rotate-0">
                {monthName}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2">
          <Calendar className="h-5 w-5 text-accent-foreground" />
          <h3 className="ml-2 text-sm text-accent-foreground ">
            Last 12 months
          </h3>
        </div>
      </div>
    </div>
  );
}
