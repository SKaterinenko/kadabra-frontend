import { useQuery } from '@tanstack/react-query';
import {getManufacturersByCategorySlug} from "@/src/shared/api/server/manufacturers";

export function useGetManufacturersByCategorySlug(slug?: string) {
    return useQuery({
        queryKey: ['manufacturers', slug],
        queryFn: () => getManufacturersByCategorySlug(slug),
        enabled: !!slug
    });
}