
import {useQuery} from "@tanstack/react-query";
import {getProductsTypeByCategoryId, getProductsTypeByCategorySlug} from "@/src/shared/api/server/productsType";

export function useGetProductsTypeByCategoryId(id?: string) {
    return useQuery({
        queryKey: ['products-type', id],
        queryFn: () => getProductsTypeByCategoryId(id),
        enabled: !!id
    });
}

export function useGetProductsTypeByCategorySlug(slug?: string) {
    return useQuery({
        queryKey: ['products-type', slug],
        queryFn: () => getProductsTypeByCategorySlug(slug),
        enabled: !!slug
    });
}