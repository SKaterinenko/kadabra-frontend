import {IProduct} from "./types";

const API_URL = process.env.API_URL;

export async function getProductsServer(): Promise<IProduct[]> {
    const res = await fetch(`${API_URL}/products`);
    return res.json();
}

