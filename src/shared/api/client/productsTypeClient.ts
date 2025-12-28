
import {useQuery} from "@tanstack/react-query";
import {getProductsTypeByCategory} from "@/src/shared/api/server/productsType";

export function useGetProductsTypeByCategory(id?: string) {
    return useQuery({
        queryKey: ['products', id],
        queryFn: () => getProductsTypeByCategory(id),
        enabled: !!id
    });
}