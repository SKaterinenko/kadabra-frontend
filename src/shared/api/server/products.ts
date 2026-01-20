import {IProduct} from "../types";
import {API_URL} from "../config";

export async function getProducts(): Promise<IProduct[]> {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }
    return res.json();
}

export async function getProductsByCategoryIds(ids: string[]): Promise<IProduct[]> {
    const res = await fetch(`${API_URL}/products-by-category-ids`, {
        method: 'POST',
        body: JSON.stringify({ ids }),
    });

    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }

    return res.json();
}

export async function getProductsByProductsTypeIds(ids: string[]): Promise<IProduct[]> {
    const res = await fetch(`${API_URL}/products-by-products-type-ids`, {
        method: 'POST',
        body: JSON.stringify({ ids }),
    });

    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }

    return res.json();
}

export async function getProductsByCategorySlug(slug?: string): Promise<IProduct[]> {
    const res = await fetch(`${API_URL}/products-by-category-slug/${slug}`);
    if (!res.ok) {
        throw new Error('Failed to fetch products type');
    }
    return res.json();
}