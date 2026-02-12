import {useQuery} from "@tanstack/react-query";
import {useLocale} from "next-intl";
import {getCategories, getCategoryById} from "../server/categories";

export function useGetCategories(slug?: string) {
	const locale = useLocale();

	return useQuery({
		queryKey: ["categories", slug, locale],
		queryFn: () => getCategories(locale),
		enabled: !slug,
	});
}

export function useGetCategoryById(id: number) {
	const locale = useLocale();

	return useQuery({
		queryKey: ["categories", id, locale],
		queryFn: () => getCategoryById(id, locale),
	});
}
