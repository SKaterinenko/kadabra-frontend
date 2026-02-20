import type {IProductsTypeByCategory} from "@/src/shared/api/types";
import {API_URL} from "../config";

export async function getProductsTypeByCategoryId(
	id?: number,
	locale?: string,
): Promise<IProductsTypeByCategory[]> {
	const res = await fetch(`${API_URL}/products-type-by-category-id/${id}`, {
		headers: { "Accept-Language": locale ?? "ru" },
	});
	if (!res.ok) {
		throw new Error("Failed to fetch products type");
	}
	return res.json();
}

export async function getProductsTypeByCategorySlug(
	slug?: string,
	locale?: string,
): Promise<IProductsTypeByCategory[]> {
	const res = await fetch(`${API_URL}/products-type-by-category-slug/${slug}`, {
		headers: { "Accept-Language": locale ?? "ru" },
	});
	if (!res.ok) {
		throw new Error("Failed to fetch products type");
	}
	return res.json();
}
