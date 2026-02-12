import {buildQuery} from "@/src/shared/utils/buildQuery";
import {API_URL} from "../config";
import type {IProductWithParents, ProductsFilters, ResProducts,} from "../types";

export async function getProducts(
	filters: ProductsFilters,
	locale: string,
): Promise<ResProducts> {
	const query = buildQuery(filters);
	const url = query ? `${API_URL}/products?${query}` : `${API_URL}/products`;

	const res = await fetch(url, {
		headers: {
			"Accept-Language": locale,
		},
	});

	if (!res.ok) {
		throw new Error("Failed to fetch products");
	}

	return res.json();
}

export async function getProductBySlug(
	slug: string,
	locale: string,
): Promise<IProductWithParents> {
	const res = await fetch(`${API_URL}/product/${slug}`, {
		headers: { "Accept-Language": locale ?? "ru" },
	});

	if (!res.ok) {
		throw new Error("Failed to fetch product");
	}
	return res.json();
}

// export async function getProductsByCategoryIds(
// 	ids: number[],
// ): Promise<IProduct[]> {
// 	const res = await fetch(`${API_URL}/products-by-category-ids`, {
// 		method: "POST",
// 		body: JSON.stringify({ ids }),
// 	});
//
// 	if (!res.ok) {
// 		throw new Error("Failed to fetch products");
// 	}
//
// 	return res.json();
// }
//
// export async function getProductsByProductsTypeIds(
// 	ids: number[],
// ): Promise<IProduct[]> {
// 	const res = await fetch(`${API_URL}/products-by-products-type-ids`, {
// 		method: "POST",
// 		body: JSON.stringify({ ids }),
// 	});
//
// 	if (!res.ok) {
// 		throw new Error("Failed to fetch products");
// 	}
//
// 	return res.json();
// }
//
// export async function getProductsByCategorySlug(
// 	slug?: string,
// ): Promise<IProduct[]> {
// 	const res = await fetch(`${API_URL}/products-by-category-slug/${slug}`);
// 	if (!res.ok) {
// 		throw new Error("Failed to fetch products");
// 	}
// 	return res.json();
// }
//
// export async function getProductsByManufacturerId(
// 	id?: number,
// ): Promise<IProduct[]> {
// 	const res = await fetch(`${API_URL}/products-by-manufacturer-id/${id}`);
// 	if (!res.ok) {
// 		throw new Error("Failed to fetch products");
// 	}
// 	return res.json();
// }
