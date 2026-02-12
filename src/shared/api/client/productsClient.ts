import {useQuery} from "@tanstack/react-query";
import {useLocale} from "next-intl";
import type {ProductsFilters} from "@/src/shared/api/types";
import {getProducts} from "../server/products";

export function useGetProducts(filters: ProductsFilters) {
	const locale = useLocale();

	return useQuery({
		queryKey: ["products", filters, locale], // ← locale в ключ чтобы при смене языка перезапросило
		queryFn: () => getProducts(filters, locale),
		staleTime: 1000 * 60 * 5,
	});
}

// export function useGetProductsByCategoryIds(ids: number[]) {
// 	return useQuery({
// 		queryKey: ["products-by-category-id", "by-ids", ids],
// 		queryFn: () => getProductsByCategoryIds(ids),
// 		enabled: ids.length > 0,
// 	});
// }
//
// export function useGetProductsByProductsTypeIds(ids: number[]) {
// 	return useQuery({
// 		queryKey: ["products-by-products-type", "by-ids", ids],
// 		queryFn: () => getProductsByProductsTypeIds(ids),
// 	});
// }
//
// export function useGetProductsByCategorySlug(slug?: string) {
// 	return useQuery({
// 		queryKey: ["products", slug],
// 		queryFn: () => getProductsByCategorySlug(slug),
// 		enabled: !!slug,
// 	});
// }
//
// export function useGetProductsByManufacturerId(id?: number) {
// 	return useQuery({
// 		queryKey: ["products", id],
// 		queryFn: () => getProductsByManufacturerId(id),
// 		enabled: !!id,
// 	});
// }
