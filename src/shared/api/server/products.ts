import { buildQuery } from "@/src/shared/utils/buildQuery";
import { API_URL } from "../config";
import type {
	IProduct,
	IProductWithParents,
	ProductsFilters,
	ResProducts,
} from "../types";

export async function getProducts(
	filters: ProductsFilters,
): Promise<ResProducts> {
	const query = buildQuery(filters);
	const url = query ? `${API_URL}/products?${query}` : `${API_URL}/products`;

	const res = await fetch(url);

	if (!res.ok) {
		throw new Error("Failed to fetch products");
	}

	return res.json();
}

export async function getProductsByCategoryIds(
	ids: number[],
): Promise<IProduct[]> {
	const res = await fetch(`${API_URL}/products-by-category-ids`, {
		method: "POST",
		body: JSON.stringify({ ids }),
	});

	if (!res.ok) {
		throw new Error("Failed to fetch products");
	}

	return res.json();
}

export async function getProductsByProductsTypeIds(
	ids: number[],
): Promise<IProduct[]> {
	const res = await fetch(`${API_URL}/products-by-products-type-ids`, {
		method: "POST",
		body: JSON.stringify({ ids }),
	});

	if (!res.ok) {
		throw new Error("Failed to fetch products");
	}

	return res.json();
}

export async function getProductsByCategorySlug(
	slug?: string,
): Promise<IProduct[]> {
	const res = await fetch(`${API_URL}/products-by-category-slug/${slug}`);
	if (!res.ok) {
		throw new Error("Failed to fetch products");
	}
	return res.json();
}

export async function getProductsByManufacturerId(
	id?: number,
): Promise<IProduct[]> {
	const res = await fetch(`${API_URL}/products-by-manufacturer-id/${id}`);
	if (!res.ok) {
		throw new Error("Failed to fetch products");
	}
	return res.json();
}

export async function getProductBySlug(
	slug: string,
): Promise<IProductWithParents> {
	const res = await fetch(`${API_URL}/product/${slug}`);
	if (!res.ok) {
		throw new Error("Failed to fetch product");
	}
	return res.json();
}
