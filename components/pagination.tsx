"use client";

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { link } from "fs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Link = {
  url: string;
  label: string;
  active: boolean;
};

type LinkProps = {
  links: Link[];
  maxPage: number;
};

export default function Pagination({ links, maxPage }: LinkProps) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  function handleClickItemPagination(pageNumber: number) {
    const params = new URLSearchParams(searchParams);

    if (pageNumber > 1 || (pageNumber !== 1 && pageNumber < maxPage)) {
      params.set("page", `${pageNumber}`);
    } else {
      params.delete("page");
    }
    replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem
          className={`${links[0].url ? "cursor-pointer" : "hidden"}`}
        >
          <PaginationPrevious
            onClick={() =>
              handleClickItemPagination(
                Number(searchParams.get("page") || 1) - 1
              )
            }
          />
        </PaginationItem>

        {links.map((link, index) => {
          if (
            link.label.includes("Anterior") ||
            link.label.includes("Próximo")
          ) {
            return null;
          }

          if (link.label === "...") {
            return (
              <PaginationItem key={index} className="hidden md:inline-flex">
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={index} className="cursor-pointer">
              <PaginationLink
                onClick={() => handleClickItemPagination(Number(link.label))}
                isActive={link.active}
                dangerouslySetInnerHTML={{ __html: link.label }}
              ></PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem
          className={`${
            links[links.length - 1].url ? "cursor-pointer" : "hidden"
          }`}
        >
          <PaginationNext
            onClick={() =>
              handleClickItemPagination(
                Number(searchParams.get("page") || 1) + 1
              )
            }
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
}
