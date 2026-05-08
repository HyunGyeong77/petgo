import { fetchProduct } from "@/services/products.api";
import { useQuery } from "@tanstack/react-query";
import { ProductsData } from "@/lib/supplies";

export const useProduct = (): ProductsData | undefined => {
  const { data } = useQuery({
    queryKey: ["all-products"],
    queryFn: () => fetchProduct()
  });

  return data?.result;
}