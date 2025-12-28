import { IProductsTypeByCategory} from "@/src/shared/api/types";
import {API_URL} from "@/src/shared/api/config";

export async function getProductsTypeByCategory(id?: string): Promise<IProductsTypeByCategory[]> {
    const res = await fetch(`${API_URL}/products-type-by-category-id/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }
    return res.json();
}
