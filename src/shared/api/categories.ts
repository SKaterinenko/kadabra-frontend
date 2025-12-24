import {ICategory} from "./types";

const API_URL = process.env.API_URL;

export async function getCategoriesServer(): Promise<ICategory[]> {
    const res = await fetch(`${API_URL}/categories`);
    return res.json();
}