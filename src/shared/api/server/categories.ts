import {ICategory} from "../types";
import {API_URL} from "../config";


export async function getCategories(): Promise<ICategory[]> {
    const res = await fetch(`${API_URL}/categories`);
    if (!res.ok) {
        throw new Error('Failed to fetch categories');
    }
    return res.json();
}

export async function getCategoryById(id: string): Promise<ICategory> {
    const res = await fetch(`${API_URL}/categories/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch category');
    }
    return res.json();
}