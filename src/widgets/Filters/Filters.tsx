'use client'

import {ICategory, IProductsTypeByCategory} from "@/src/shared/api/types";
import {Dispatch, FC, SetStateAction} from "react";
import {Checkbox} from "@/src/shared/ui/Checkbox";

interface Props {
    categories?: ICategory[]
    productsType?: IProductsTypeByCategory[]
    selectedIds: string[]
    setSelectedIds: Dispatch<SetStateAction<string[]>>
}

export const Filters:FC<Props> = ({categories, selectedIds, setSelectedIds, productsType}) => {
    const handleCheckboxChange = (categoryId: string, checked: boolean) => {
        if (checked) {
            setSelectedIds(prev => [...prev, categoryId]);
        } else {
            setSelectedIds(prev => prev.filter(id => id !== categoryId));
        }
    };

    return (
        <div className="p-5 shadow max-w-[250px]">
            <h3 className="text-[18px] font-bold">Категории</h3>
            <div className="gap-[12px] flex flex-col mt-[15px]">
                {categories && categories?.map((item) => (
                    <div key={item.id} className="flex gap-2 items-center cursor-pointer">
                        <Checkbox
                            id={item.id}
                            checked={selectedIds.includes(item.id)}
                            onCheckedChange={(checked) => {
                                handleCheckboxChange(item.id, checked as boolean);
                            }}
                        />
                        <label
                            htmlFor={item.id}
                            className="cursor-pointer"
                        >
                            {item.name}
                        </label>
                    </div>
                ))}
                {productsType && productsType?.map((item) =>
                    <div key={item?.id}>
                        <p>{item?.name}</p>
                        <div className="ml-[10px]">
                            {item?.products_type?.map((productsType) =>
                                <div key={productsType.id} className="flex gap-2 items-center cursor-pointer">
                                    <Checkbox
                                        id={productsType.id}
                                        checked={selectedIds.includes(productsType.id)}
                                        onCheckedChange={(checked) => {
                                            handleCheckboxChange(productsType.id, checked as boolean);
                                        }}
                                    />
                                    <label
                                        htmlFor={productsType.id}
                                        className="cursor-pointer"
                                    >
                                        {productsType.name}
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>)
                }
            </div>
            <h3 className="text-[18px] font-bold mt-4">Оценка</h3>
            <p>{selectedIds}</p>
        </div>
    )
}