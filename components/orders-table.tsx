"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { Order } from "@/app/types/Order";
import formatAmountToBrl from "@/app/utils/functions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type OrdersProps = {
  orders: Order[];
};

export default function OrdersTable({ orders }: OrdersProps) {
  const statusMap = new Map();
  statusMap.set("completed", "Completo");
  statusMap.set("pending", "Pendente");

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  function handleClickSort(typeSort: string) {
    const params = new URLSearchParams(searchParams);

    if (params.get("sort") === typeSort) {
      params.set("sort", `-${typeSort}`);
    } else if (params.get("sort") === `-${typeSort}`) {
      params.delete("sort");
    } else if (typeSort) {
      params.set("sort", typeSort);
    }
    replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  function getSortIcon(key: string) {
    if (searchParams.get("sort") === key) {
      return <ChevronDown className="w-4" />;
    } else if (searchParams.get("sort") === `-${key}`) {
      return <ChevronUp className="w-4" />;
    }
    return <ChevronsUpDown className="w-4" />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="table-cell">Cliente</TableHead>
          <TableHead className="table-cell">Status</TableHead>
          <TableHead
            className="hidden md:table-cell cursor-pointer justify-end items-center gap-1"
            onClick={() => handleClickSort("order_date")}
          >
            <div className="flex items-center gap-1">
              Data
              {getSortIcon("order_date")}
            </div>
          </TableHead>
          <TableHead
            className="text-right cursor-pointer flex justify-end items-center gap-1"
            onClick={() => handleClickSort("amount_in_cents")}
          >
            Valor
            {getSortIcon("amount_in_cents")}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>
              <div className="font-medium">{order.customer_name}</div>
              <div className="hidden md:inline text-sm text-muted-foreground">
                {order.customer_email}
              </div>
            </TableCell>
            <TableCell>
              <Badge className={`text-xs`} variant="outline">
                {statusMap.get(order.status)}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {order.order_date.toString()}
            </TableCell>
            <TableCell className="text-right">
              {formatAmountToBrl(order.amount_in_cents / 100)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
