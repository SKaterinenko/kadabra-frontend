import {IProduct} from "../types";
import {API_URL} from "../config";

export async function getProducts(): Promise<IProduct[]> {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }
    return res.json();
}

export async function getProductsByIds(ids: string[]): Promise<IProduct[]> {
    const res = await fetch(`${API_URL}/productsByIds`, {
        method: 'POST',
        body: JSON.stringify({ ids }),
    });

    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }

    return res.json();
}