import {API_URL} from "../config";
import type {ICategory} from "../types";

export async function getCategories(locale: string): Promise<ICategory[]> {
	const res = await fetch(`${API_URL}/categories`, {
		headers: { "Accept-Language": locale },
	});
	if (!res.ok) {
		throw new Error("Failed to fetch categories");
	}
	return res.json();
}

export async function getCategoryById(
	id: number,
	locale: string,
): Promise<ICategory> {
	const res = await fetch(`${API_URL}/categories/${id}`, {
		headers: { "Accept-Language": locale },
	});
	if (!res.ok) {
		throw new Error("Failed to fetch category");
	}
	return res.json();
}

export async function getCategoryBySlug(
	slug: string,
	locale: string,
): Promise<ICategory> {
	const res = await fetch(`${API_URL}/categories/${slug}`, {
		headers: { "Accept-Language": locale },
	});
	if (!res.ok) {
		throw new Error("Failed to fetch category by slug");
	}
	return res.json();
}
