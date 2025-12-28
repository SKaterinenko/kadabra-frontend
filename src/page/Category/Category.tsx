"use client"

import {Header} from "@/src/entities/Header";
import {Banner} from "@/src/shared/ui/Banner";
import {Footer} from "@/src/entities/Footer";
import {H1} from "@/src/shared/ui/H1";
import {Filters} from "@/src/widgets/Filters";
import {ProductsGrid} from "@/src/widgets/ProductsGrid";
import {FC, useState} from "react";
import {useGetCategories} from "@/src/shared/api/client/categoriesClient";
import {useGetProducts, useGetProductsByIds} from "@/src/shared/api/client/productsClient";
import {useGetProductsTypeByCategory} from "@/src/shared/api/client/productsTypeClient";

interface Props {
    name: string;
    id?: string;
}

export const Category:FC<Props> =  ({name, id}) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const { data: categories } = useGetCategories(id);
    const { data: products } = useGetProducts();
    const {data: productsType} = useGetProductsTypeByCategory(id)
    const {data: productsByIds} = useGetProductsByIds(selectedIds)

    return (
        <main>
            <Header/>
            <Banner path="/images/banner4.jpg"/>
            <div className="container">
                <div className="mt-[90px] flex flex-col gap-[50px]">
                    <H1>{name}</H1>
                    <div className="grid grid-cols-[15%_85%] gap-5">
                        <Filters categories={categories} productsType={productsType} selectedIds={selectedIds} setSelectedIds={setSelectedIds}  />
                        <ProductsGrid data={productsByIds ? productsByIds : products}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </main>
    )
}