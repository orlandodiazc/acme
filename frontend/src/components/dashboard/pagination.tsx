import { generatePagination } from "@/lib/utils";
import { Fragment } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

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
            search={(prev: { page: number; searchQuery?: string }) => ({
              ...prev,
              page: prev.page - 1,
            })}
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
            search={(prev: { page: number; searchQuery?: string }) => ({
              ...prev,
              page: prev.page + 1,
            })}
            disabled={currentPage >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
