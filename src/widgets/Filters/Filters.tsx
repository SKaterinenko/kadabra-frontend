'use client'

import {ICategory} from "@/src/shared/api/types";
import {Dispatch, FC, SetStateAction} from "react";
import {Checkbox} from "@/src/shared/ui/Checkbox";

interface Props {
    categories?: ICategory[]
    selectedIds: string[]
    setSelectedIds: Dispatch<SetStateAction<string[]>>
}

export const Filters:FC<Props> = ({categories, selectedIds, setSelectedIds}) => {
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
                {categories && categories.map((category) => (
                    <div key={category.id} className="flex gap-2 items-center">
                        <Checkbox
                            id={category.id}
                            checked={selectedIds.includes(category.id)}
                            onCheckedChange={(checked) => {
                                handleCheckboxChange(category.id, checked as boolean);
                            }}
                        />
                        <label
                            htmlFor={category.id}
                            className="cursor-pointer"
                        >
                            {category.name}
                        </label>
                    </div>
                ))}
            </div>
            <h3 className="text-[18px] font-bold mt-4">Оценка</h3>
        </div>
    )
}