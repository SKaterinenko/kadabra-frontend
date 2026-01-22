'use client';

import {
    ICategory,
    IManufacturer,
    IProductsTypeByCategory,
} from "@/src/shared/api/types";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { Checkbox } from "@/src/shared/ui/Checkbox";
import { Skeleton } from "@/src/shared/ui/Skeleton/Skeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface FiltersState {
    categories: number[];
    types: number[];
    manufacturers: number[];
}

interface Props {
    categories?: ICategory[];
    productsType?: IProductsTypeByCategory[];
    manufacturers?: IManufacturer[];
    filters: FiltersState;
    setFilters: Dispatch<SetStateAction<FiltersState>>;
}

export const Filters: FC<Props> = ({categories, productsType, manufacturers, filters, setFilters}) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // восстановление из URL
    useEffect(() => {
        const categories = searchParams.get("categories");
        const types = searchParams.get("types");
        const manufacturers = searchParams.get("manufacturers");

        setFilters({
            categories: categories?.split(",").map(Number).filter(Boolean) ?? [],
            types: types?.split(",").map(Number).filter(Boolean) ?? [],
            manufacturers:
                manufacturers?.split(",").map(Number).filter(Boolean) ?? [],
        });
    }, [searchParams, setFilters]);

    // универсальный обработчик
    const updateFilter = (
        key: keyof FiltersState,
        id: number,
        checked: boolean
    ) => {
        const updated = checked
            ? [...filters[key], id]
            : filters[key].filter((item) => item !== id);

        const nextFilters = {
            ...filters,
            [key]: updated,
        };

        setFilters(nextFilters);

        const params = new URLSearchParams(searchParams.toString());

        if (updated.length) {
            params.set(key, updated.join(","));
        } else {
            params.delete(key);
        }

        router.replace(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    };

    return (
        <div className="p-5 shadow max-w-[250px]">
            {/* Categories */}
            <h3 className="text-[18px] font-bold">Категории</h3>
            <div className="mt-3 flex flex-col gap-2">
                {categories?.map((item) => (
                    <div key={item.id} className="flex gap-2 items-center">
                        <Checkbox
                            id={`cat-${item.id}`}
                            checked={filters.categories.includes(item.id)}
                            onCheckedChange={(checked) =>
                                updateFilter("categories", item.id, checked as boolean)
                            }
                        />
                        <label htmlFor={`cat-${item.id}`}>{item.name}</label>
                    </div>
                ))}
            </div>

            {/* Types */}
            {productsType?.map((item) => (
                <div key={item.id} className="mt-4">
                    <p className="font-medium">{item.name}</p>
                    <div className="ml-2 mt-2 flex flex-col gap-2">
                        {item.products_type.map((type) => (
                            <div key={type.id} className="flex gap-2 items-center">
                                <Checkbox
                                    id={`type-${type.id}`}
                                    checked={filters.types.includes(type.id)}
                                    onCheckedChange={(checked) =>
                                        updateFilter("types", type.id, checked as boolean)
                                    }
                                />
                                <label htmlFor={`type-${type.id}`}>{type.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Manufacturers */}
            <h3 className="text-[18px] font-bold mt-4">Бренды</h3>
            <div className="mt-3 flex flex-col gap-2">
                {manufacturers?.map((item) => (
                    <div key={item.id} className="flex gap-2 items-center">
                        <Checkbox
                            id={`man-${item.id}`}
                            checked={filters.manufacturers.includes(item.id)}
                            onCheckedChange={(checked) =>
                                updateFilter("manufacturers", item.id, checked as boolean)
                            }
                        />
                        <label htmlFor={`man-${item.id}`}>{item.name}</label>
                    </div>
                ))}
            </div>

            {!categories?.length && !manufacturers?.length && (
                <Skeleton className="h-[25px] w-[180px]" />
            )}
        </div>
    );
};
