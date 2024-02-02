import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { generatePagination } from "@/lib/utils";
import { InvoiceSearch } from "@/routes/_layout/dashboard/invoices";
import { Fragment } from "react";

export default function DashboardPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pageList = generatePagination(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            search={(prev: InvoiceSearch) => {
              if (prev.page <= 1) return prev;
              return { ...prev, page: prev.page - 1 };
            }}
            disabled={currentPage <= 1}
          />
        </PaginationItem>
        {pageList.map((value, index) => {
          return (
            <Fragment key={index}>
              {value === "..." ? (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem>
                  <PaginationLink
                    search={() => ({ page: value })}
                    isActive={value === currentPage}
                  >
                    {value}
                  </PaginationLink>
                </PaginationItem>
              )}
            </Fragment>
          );
        })}

        <PaginationItem>
          <PaginationNext
            search={(prev: InvoiceSearch) => {
              if (prev.page >= totalPages) return prev;
              return { ...prev, page: prev.page + 1 };
            }}
            disabled={currentPage >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
