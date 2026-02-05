import { API_URL } from "@/src/shared/api/config";
import type { IProductsTypeByCategory } from "@/src/shared/api/types";

export async function getProductsTypeByCategoryId(
	id?: number,
): Promise<IProductsTypeByCategory[]> {
	const res = await fetch(`${API_URL}/products-type-by-category-id/${id}`);
	if (!res.ok) {
		throw new Error("Failed to fetch products type");
	}
	return res.json();
}

export async function getProductsTypeByCategorySlug(
	slug?: string,
): Promise<IProductsTypeByCategory[]> {
	const res = await fetch(`${API_URL}/products-type-by-category-slug/${slug}`);
	if (!res.ok) {
		throw new Error("Failed to fetch products type");
	}
	return res.json();
}
