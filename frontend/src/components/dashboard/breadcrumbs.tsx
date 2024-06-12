import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: { label: string; to: string; isActive?: boolean }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className="flex text-xl md:text-2xl">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={index}
            aria-current={breadcrumb.isActive}
            className={cn(
              breadcrumb.isActive ? "text-gray-900" : "text-gray-500",
            )}
          >
            <Link to={breadcrumb.to}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
