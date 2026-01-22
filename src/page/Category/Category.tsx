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
    useGetProducts
} from "@/src/shared/api/client/productsClient";
import {useGetProductsTypeByCategorySlug} from "@/src/shared/api/client/productsTypeClient";
import {PromotionClient} from "@/src/widgets/Promotion/PromotionClient";
import {useGetManufacturersByCategorySlug} from "@/src/shared/api/client/manufacturersClient";
import {ICategory} from "@/src/shared/api/types";

interface Props {
    category: ICategory;
}

interface FiltersState {
    categories: number[];
    types: number[];
    manufacturers: number[];
}

export const Category: FC<Props> = ({ category }) => {
    const { id, slug, name } = category;

    const [filters, setFilters] = useState<FiltersState>({
        categories: [],
        types: [],
        manufacturers: [],
    });

    const effectiveCategories =
        filters.categories.length > 0
            ? filters.categories
            : [id];

    const { data: categories } = useGetCategories(slug);

    const { data: products } = useGetProducts({
        categories: effectiveCategories,
        types: filters.types,
        manufacturers: filters.manufacturers,
    });

    const { data: productsType } = useGetProductsTypeByCategorySlug(slug);
    const { data: manufacturers } = useGetManufacturersByCategorySlug(slug);

    return (
        <main>
            <Header />
            <Banner path="/images/banner4.jpg" />

            <div className="container">
                <div className="mt-[90px] flex flex-col gap-[50px]">
                    <H1>{name}</H1>

                    <div className="grid grid-cols-[15%_85%] gap-5">
                        <Filters
                            categories={categories}
                            productsType={productsType}
                            manufacturers={manufacturers}
                            filters={filters}
                            setFilters={setFilters}
                        />
                        <ProductsGrid data={products} />
                    </div>

                    <Banner path="/images/banner5.jpg" />
                    <PromotionClient />
                </div>
            </div>

            <Footer />
        </main>
    );
};
