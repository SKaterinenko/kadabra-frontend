import {useQuery} from "@tanstack/react-query";
import {useLocale} from "next-intl";
import {getManufacturersByCategorySlug} from "@/src/shared/api/server/manufacturers";

export function useGetManufacturersByCategorySlug(slug?: string) {
	const locale = useLocale();

	return useQuery({
		queryKey: ["manufacturers", slug, locale],
		queryFn: () => getManufacturersByCategorySlug(slug, locale),
		enabled: !!slug,
	});
}
