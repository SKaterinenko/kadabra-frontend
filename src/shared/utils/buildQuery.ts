import {ProductsFilters} from "@/src/shared/api/types";

export function buildQuery(filters?: ProductsFilters) {
    const params = new URLSearchParams();

    if (filters?.categories?.length) {
        params.set('categories', filters?.categories.join(','));
    }

    if (filters?.types?.length) {
        params.set('types', filters?.types.join(','));
    }

    if (filters?.manufacturers?.length) {
        params.set('manufacturers', filters?.manufacturers.join(','));
    }

    return params.toString();
}
