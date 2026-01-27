import {ProductsFilters} from "@/src/shared/api/types";

export function buildQuery(filters: ProductsFilters): string {
    const params = new URLSearchParams();

    if (filters?.categories?.length) {
        params?.append('categories', filters?.categories?.join(','));
    }
    if (filters?.types?.length) {
        params?.append('types', filters?.types?.join(','));
    }
    if (filters?.manufacturers?.length) {
        params?.append('manufacturers', filters?.manufacturers?.join(','));
    }
    if (filters?.offset) {
        params?.append('offset', filters?.offset.toString());
    }

    return params?.toString();
}