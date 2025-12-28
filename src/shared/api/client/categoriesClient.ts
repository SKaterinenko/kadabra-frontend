import { useQuery } from '@tanstack/react-query';
import {getCategories, getCategoryById} from "../server/categories";

export function useGetCategories(id?: string) {
    return useQuery({
        queryKey: ['categories', id],
        queryFn: getCategories,
        enabled: !id,
    });
}

export function useGetCategoryById(id: string) {
    return useQuery({
        queryKey: ['categories', id],
        queryFn: () => getCategoryById(id),
    });
}