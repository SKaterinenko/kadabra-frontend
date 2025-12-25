"use client"

import {Header} from "@/src/entities/Header";
import {Banner} from "@/src/shared/ui/Banner";
import {Footer} from "@/src/entities/Footer";
import {H1} from "@/src/shared/ui/H1";
import {Filters} from "@/src/widgets/Filters";
import {ProductsGrid} from "@/src/widgets/ProductsGrid";
import {useState} from "react";
import {useGetCategories} from "@/src/shared/api/client/categoriesClient";
import {useGetProducts, useGetProductsByIds} from "@/src/shared/api/client/productsClient";

export const Category =  () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const { data: categories } = useGetCategories();
    const { data: products } = useGetProducts();

    const {data: productsByIds} = useGetProductsByIds(selectedIds)
    console.log(productsByIds, "BYIDS")
    console.log(products, "PRODUCT")

    return (
        <main>
            <Header/>
            <Banner path="/images/banner4.jpg"/>
            <div className="container">
                <div className="mt-[90px] flex flex-col gap-[50px]">
                    <H1>Лучшее за месяц</H1>
                    <div className="grid grid-cols-[15%_85%] gap-5">
                        <Filters categories={categories} selectedIds={selectedIds} setSelectedIds={setSelectedIds}  />
                        <ProductsGrid data={productsByIds ? productsByIds : products}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </main>
    )
}