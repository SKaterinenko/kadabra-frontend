import {IManufacturer} from "@/src/shared/api/types";
import {API_URL} from "@/src/shared/api/config";

export async function getManufacturersByCategorySlug(slug?: string): Promise<IManufacturer[]> {
    const res = await fetch(`${API_URL}/manufacturers-by-category-slug/${slug}`);
    if (!res.ok) {
        throw new Error('Failed to fetch manufacturers by category-slug');
    }
    return res.json();
}