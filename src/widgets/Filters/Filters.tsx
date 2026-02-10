"use client";

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {type Dispatch, type FC, type SetStateAction, useCallback, useEffect,} from "react";
import type {ICategory, IManufacturer, IProductsTypeByCategory,} from "@/src/shared/api/types";
import {Skeleton} from "@/src/shared/ui/Skeleton/Skeleton";
import {FilterItem} from "./FiltersItem";

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

export const Filters: FC<Props> = ({
	categories,
	productsType,
	manufacturers,
	filters,
	setFilters,
}) => {
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

	// ✅ Мемоизируем updateFilter
	const updateFilter = useCallback(
		(key: keyof FiltersState, id: number, checked: boolean) => {
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
		},
		[filters, pathname, router, searchParams, setFilters],
	);

	const toggleCategory = useCallback(
		(id: number) => {
			updateFilter("categories", id, !filters.categories.includes(id));
		},
		[filters.categories, updateFilter],
	);

	const toggleType = useCallback(
		(id: number) => {
			updateFilter("types", id, !filters.types.includes(id));
		},
		[filters.types, updateFilter],
	);

	const toggleManufacturer = useCallback(
		(id: number) => {
			updateFilter("manufacturers", id, !filters.manufacturers.includes(id));
		},
		[filters.manufacturers, updateFilter],
	);

	return (
		<div className="p-5 shadow max-w-[250px]">
			{/* Categories */}
			<h3 className="text-[18px] font-bold">Категории</h3>
			<div className="mt-3 flex flex-col gap-2">
				{categories?.map((el) => (
					<FilterItem
						key={el.id}
						id={`cat-${el.id}`}
						label={el.name}
						checked={filters.categories.includes(el.id)}
						onToggle={() => toggleCategory(el.id)}
					/>
				))}
			</div>

			{/* Types */}
			{productsType?.map((item) => (
				<div key={item.id} className="mt-4">
					<p className="font-medium">{item.name}</p>
					<div className="ml-2 mt-2 flex flex-col gap-2">
						{item.products_type.map((el) => (
							<FilterItem
								key={el.id}
								id={`type-${el.id}`}
								label={el.name}
								checked={filters.types.includes(el.id)}
								onToggle={() => toggleType(el.id)}
							/>
						))}
					</div>
				</div>
			))}

			{!categories?.length &&
				!productsType?.length &&
				Array.from({ length: 3 }).map((_, i) => (
					<Skeleton key={i} className="h-[25px] w-[180px] mb-2" />
				))}

			{!categories?.length && (
				<>
					<h3 className="text-[18px] font-bold mt-4">Бренды</h3>
					<div className="mt-3 flex flex-col gap-2">
						{manufacturers?.map((item) => (
							<FilterItem
								key={item.id}
								id={`man-${item.id}`}
								label={item.name}
								checked={filters.manufacturers.includes(item.id)}
								onToggle={() => toggleManufacturer(item.id)}
							/>
						))}
					</div>

					{!manufacturers?.length &&
						Array.from({ length: 3 }).map((_, i) => (
							<Skeleton key={i} className="h-[25px] w-[180px] mb-2" />
						))}
				</>
			)}
		</div>
	);
};
