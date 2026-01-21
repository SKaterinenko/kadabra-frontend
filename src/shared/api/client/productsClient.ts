
import {useQuery} from "@tanstack/react-query";
import {
    getProducts,
    getProductsByCategoryIds,
    getProductsByCategorySlug, getProductsByManufacturerId,
    getProductsByProductsTypeIds
} from "../server/products";


export function useGetProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });
}

export function useGetProductsByCategoryIds(ids: number[]) {
    return useQuery({
        queryKey: ['products-by-category-id', 'by-ids', ids],
        queryFn: () => getProductsByCategoryIds(ids),
        enabled: ids.length > 0,
    });
}

export function useGetProductsByProductsTypeIds(ids: number[]) {
    return useQuery({
        queryKey: ['products-by-products-type', 'by-ids', ids],
        queryFn: () => getProductsByProductsTypeIds(ids),
    });
}

export function useGetProductsByCategorySlug(slug?: string) {
    return useQuery({
        queryKey: ['products', slug],
        queryFn: () => getProductsByCategorySlug(slug),
        enabled: !!slug
    });
}

export function useGetProductsByManufacturerId(id?: number) {
    return useQuery({
        queryKey: ['products', id],
        queryFn: () => getProductsByManufacturerId(id),
        enabled: !!id
    });
}