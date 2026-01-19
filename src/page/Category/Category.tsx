"use client"

import {Header} from "@/src/entities/Header";
import {Banner} from "@/src/shared/ui/Banner";
import {Footer} from "@/src/entities/Footer";
import {H1} from "@/src/shared/ui/H1";
import {Filters} from "@/src/widgets/Filters";
import {ProductsGrid} from "@/src/widgets/ProductsGrid";
import {FC, useState} from "react";
import {useGetCategories} from "@/src/shared/api/client/categoriesClient";
import {
    useGetProducts,
    useGetProductsByProductsTypeIds
} from "@/src/shared/api/client/productsClient";
import {useGetProductsTypeByCategorySlug} from "@/src/shared/api/client/productsTypeClient";
import {PromotionClient} from "@/src/widgets/Promotion/PromotionClient";

interface Props {
    name: string;
    slug?: string;
}

export const Category:FC<Props> =  ({name, slug}) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const { data: categories } = useGetCategories(slug);
    const { data: products } = useGetProducts();
    const {data: productsType} = useGetProductsTypeByCategorySlug(slug)
    const {data: productsByIds} = useGetProductsByProductsTypeIds(selectedIds)

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
                    <Banner path="/images/banner5.jpg" />
                    <PromotionClient/>
                </div>
            </div>
            <Footer/>
        </main>
    )
}