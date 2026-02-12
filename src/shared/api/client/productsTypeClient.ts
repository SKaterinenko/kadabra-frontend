import {useQuery} from "@tanstack/react-query";
import {useLocale} from "next-intl";
import {getProductsTypeByCategoryId, getProductsTypeByCategorySlug,} from "@/src/shared/api/server/productsType";

export function useGetProductsTypeByCategoryId(id?: number) {
	const locale = useLocale();

	return useQuery({
		queryKey: ["products-type", id, locale],
		queryFn: () => getProductsTypeByCategoryId(id, locale),
		enabled: !!id,
	});
}

export function useGetProductsTypeByCategorySlug(slug?: string) {
	const locale = useLocale();

	return useQuery({
		queryKey: ["products-type", slug, locale],
		queryFn: () => getProductsTypeByCategorySlug(slug, locale),
		enabled: !!slug,
	});
}
