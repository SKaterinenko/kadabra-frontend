import { API_URL } from "@/src/shared/api/config";
import type { IManufacturer } from "@/src/shared/api/types";

export async function getManufacturersByCategorySlug(
	slug?: string,
): Promise<IManufacturer[]> {
	const res = await fetch(`${API_URL}/manufacturers-by-category-slug/${slug}`);
	if (!res.ok) {
		throw new Error("Failed to fetch manufacturers by category-slug");
	}
	return res.json();
}
