"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { type FC, useEffect, useMemo, useState } from "react";
import { Footer } from "@/src/entities/Footer";
import { Header } from "@/src/entities/Header";
import { useGetCategories } from "@/src/shared/api/client/categoriesClient";
import { useGetManufacturersByCategorySlug } from "@/src/shared/api/client/manufacturersClient";
import { useGetProducts } from "@/src/shared/api/client/productsClient";
import { useGetProductsTypeByCategorySlug } from "@/src/shared/api/client/productsTypeClient";
import type { ICategory } from "@/src/shared/api/types";
import { Banner } from "@/src/shared/ui/Banner";
import { H1 } from "@/src/shared/ui/H1";
import { PaginationComponents } from "@/src/shared/ui/Pagination";
import { Skeleton } from "@/src/shared/ui/Skeleton/Skeleton";
import { Filters } from "@/src/widgets/Filters";
import { ProductsGrid } from "@/src/widgets/ProductsGrid";
import { PromotionClient } from "@/src/widgets/Promotion/PromotionClient";

interface Props {
	category?: ICategory;
}

interface FiltersState {
	categories: number[];
	types: number[];
	manufacturers: number[];
}

const LIMIT = 20;

export const Category: FC<Props> = ({ category }) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const pageFromUrl = Number(searchParams.get("page")) || 1;

	const [page, setPage] = useState(pageFromUrl);

	const [filters, setFilters] = useState<FiltersState>({
		categories: [],
		types: [],
		manufacturers: [],
	});

	const offset = useMemo(() => {
		return (page - 1) * LIMIT;
	}, [page]);

	useEffect(() => {
		const params = new URLSearchParams(searchParams.toString());

		if (page > 1) {
			params.set("page", String(page));
		} else {
			params.delete("page");
		}

		router.replace(`?${params.toString()}`, { scroll: false });
	}, [page]);

	const effectiveCategories =
		filters.categories.length > 0
			? filters.categories
			: category?.id
				? [category.id]
				: [];

	const { data: categories } = useGetCategories(category?.slug);

	const { data: products } = useGetProducts({
		categories: effectiveCategories,
		types: filters.types,
		manufacturers: filters.manufacturers,
		offset,
		limit: LIMIT,
	});

	const { data: productsType } = useGetProductsTypeByCategorySlug(
		category?.slug,
	);

	const { data: manufacturers } = useGetManufacturersByCategorySlug(
		category?.slug,
	);

	return (
		<main>
			<Header />
			<Banner path="/images/banner4.jpg" />

			<div className="container">
				<div className="mt-[90px] flex flex-col gap-[50px]">
					<H1>{category?.name}</H1>
					<div className="flex gap-1">
						Показано {offset + 1}-{LIMIT * page} результатов из{" "}
						{products?.total_count ?? (
							<Skeleton className="h-[25px] w-[20px] mb-2" />
						)}
					</div>
					<div className="grid grid-cols-[15%_85%] gap-5">
						<Filters
							categories={categories}
							productsType={productsType}
							manufacturers={manufacturers}
							filters={filters}
							setFilters={setFilters}
						/>

						<ProductsGrid data={products?.data} />
					</div>

					<div className="flex justify-center">
						<PaginationComponents
							limit={LIMIT}
							offset={offset}
							setOffset={(newOffset) => setPage(newOffset / LIMIT + 1)}
							totalCount={products?.total_count}
						/>
					</div>

					<Banner path="/images/banner5.jpg" />
					<PromotionClient />
				</div>
			</div>

			<Footer />
		</main>
	);
};
