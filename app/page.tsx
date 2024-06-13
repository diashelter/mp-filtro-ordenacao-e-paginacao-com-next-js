import FilterDropdown from "@/components/filter-dropdown";
import OrdersTable from "@/components/orders-table";
import Pagination from "@/components/pagination";
import SearchInput from "@/components/search-input";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";

type ISearchParams = {
  searchParams?: {
    search?: string;
    status?: string;
    sort?: string;
    page?: number;
  };
};

export default async function Component({ searchParams }: ISearchParams) {
  const urlBase = "https://apis.codante.io/api/orders-api/orders";
  const searchString = searchParams?.search;
  const statuString = searchParams?.status;
  const sortString = searchParams?.sort;
  const page = searchParams?.page;

  const response = await axios.get(urlBase, {
    params: {
      search: searchString,
      status: statuString,
      sort: sortString,
      page: page,
    },
  });

  const orders = response.data.data;
  const links = response.data.meta.links;
  const maxPage = response.data.meta.last_page;

  return (
    <main className="container px-1 py-10 md:p-10">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Pedidos</CardTitle>
          <CardDescription>
            Uma listagem de pedidos do seu negócio.
          </CardDescription>
          <div className="flex pt-10 gap-4">
            <SearchInput />
            <FilterDropdown />
          </div>
        </CardHeader>
        <CardContent>
          <OrdersTable orders={orders} />
          <div className="mt-8">
            <Pagination links={links} maxPage={maxPage}/>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
