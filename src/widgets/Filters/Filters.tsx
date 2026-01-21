'use client';

import { ICategory, IProductsTypeByCategory } from "@/src/shared/api/types";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { Checkbox } from "@/src/shared/ui/Checkbox";
import { Skeleton } from "@/src/shared/ui/Skeleton/Skeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
    categories?: ICategory[];
    productsType?: IProductsTypeByCategory[];
    selectedIds: number[];
    setSelectedIds: Dispatch<SetStateAction<number[]>>;
}

export const Filters: FC<Props> = ({categories, productsType, selectedIds, setSelectedIds}) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const filters = searchParams.get("filters");
        if (!filters) return;

        const ids = filters
            .split(",")
            .map(Number)
            .filter(Boolean);

        setSelectedIds(ids);
    }, [searchParams, setSelectedIds]);


    const handleCheckboxChange = (id: number, checked: boolean) => {
        const updated = checked
            ? [...selectedIds, id]
            : selectedIds.filter((item) => item !== id);

        setSelectedIds(updated);

        const params = new URLSearchParams(searchParams.toString());

        if (updated.length) {
            params.set("filters", updated.join(","));
        } else {
            params.delete("filters");
        }

        router.replace(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    };

    return (
        <div className="p-5 shadow max-w-[250px]">
            <h3 className="text-[18px] font-bold">Категории</h3>

            <div className="gap-[12px] flex flex-col mt-[15px]">
                {categories?.map((item) => (
                    <div key={item.id} className="flex gap-2 items-center">
                        <Checkbox
                            id={String(item.id)}
                            checked={selectedIds.includes(item.id)}
                            onCheckedChange={(checked) =>
                                handleCheckboxChange(item.id, checked as boolean)
                            }
                        />
                        <label htmlFor={String(item.id)}>{item.name}</label>
                    </div>
                ))}

                {!categories?.length && !productsType?.length &&
                    Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-[25px] w-[180px]" />
                    ))}

                {productsType?.map((item) => (
                    <div key={item.id}>
                        <p className="font-medium">{item.name}</p>

                        <div className="ml-[10px] mt-2 flex flex-col gap-2">
                            {item.products_type.map((type) => (
                                <div key={type.id} className="flex gap-2 items-center">
                                    <Checkbox
                                        id={String(type.id)}
                                        checked={selectedIds.includes(type.id)}
                                        onCheckedChange={(checked) =>
                                            handleCheckboxChange(type.id, checked as boolean)
                                        }
                                    />
                                    <label htmlFor={String(type.id)}>{type.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
