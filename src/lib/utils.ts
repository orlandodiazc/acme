import { ClassNameValue, twMerge } from "tailwind-merge";
import { Revenue } from "./api.types";

export function cn(...inputs: ClassNameValue[]) {
  return twMerge(inputs);
}

export const generateYAxis = (revenue: Revenue[]) => {

  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};
