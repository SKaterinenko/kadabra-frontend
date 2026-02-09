import Link from "next/link";
import {getCategories} from "@/src/shared/api/server/categories";
import {H2} from "@/src/shared/ui/H2";
import {ProductCard} from "@/src/shared/ui/ProductCard";

export const Categories = async () => {
	const categories = await getCategories();

	return (
		<section>
			<div className="flex justify-between mb-5 items-center">
				<H2>Категории</H2>
				<Link href="/best-of-month">
					<p className="cursor-pointer">Смотреть все</p>
				</Link>
			</div>
			<div className="flex gap-6">
				{categories?.slice(0, 5)?.map((category) => (
					<ProductCard
						key={category?.id}
						data={category}
						subTitle="Более 200 товаров"
					/>
				))}
			</div>
		</section>
	);
};
