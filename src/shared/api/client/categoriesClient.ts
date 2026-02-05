import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategoryById } from "../server/categories";

export function useGetCategories(slug?: string) {
	return useQuery({
		queryKey: ["categories", slug],
		queryFn: getCategories,
		enabled: !slug,
	});
}

export function useGetCategoryById(id: number) {
	return useQuery({
		queryKey: ["categories", id],
		queryFn: () => getCategoryById(id),
	});
}
