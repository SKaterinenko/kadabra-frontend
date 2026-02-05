import { useQuery } from "@tanstack/react-query";
import type { ProductsFilters } from "@/src/shared/api/types";
import {
	getProducts,
	getProductsByCategoryIds,
	getProductsByCategorySlug,
	getProductsByManufacturerId,
	getProductsByProductsTypeIds,
} from "../server/products";

export function useGetProducts(filters: ProductsFilters) {
	return useQuery({
		queryKey: ["products", filters],
		queryFn: () => getProducts(filters),
		staleTime: 1000 * 60 * 5, // 5 минут
	});
}

export function useGetProductsByCategoryIds(ids: number[]) {
	return useQuery({
		queryKey: ["products-by-category-id", "by-ids", ids],
		queryFn: () => getProductsByCategoryIds(ids),
		enabled: ids.length > 0,
	});
}

export function useGetProductsByProductsTypeIds(ids: number[]) {
	return useQuery({
		queryKey: ["products-by-products-type", "by-ids", ids],
		queryFn: () => getProductsByProductsTypeIds(ids),
	});
}

export function useGetProductsByCategorySlug(slug?: string) {
	return useQuery({
		queryKey: ["products", slug],
		queryFn: () => getProductsByCategorySlug(slug),
		enabled: !!slug,
	});
}

export function useGetProductsByManufacturerId(id?: number) {
	return useQuery({
		queryKey: ["products", id],
		queryFn: () => getProductsByManufacturerId(id),
		enabled: !!id,
	});
}
