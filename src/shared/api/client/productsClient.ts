
import {useQuery} from "@tanstack/react-query";
import {getProducts, getProductsByIds} from "../server/products";


export function useGetProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });
}

export function useGetProductsByIds(ids: string[]) {
    return useQuery({
        queryKey: ['products', 'by-ids', ids],
        queryFn: () => getProductsByIds(ids),
        enabled: ids.length > 0,
    });
}