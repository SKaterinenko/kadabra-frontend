import { Slider } from "@/src/entities/Slider";
import { getProducts } from "@/src/shared/api/server/products";
import { H2 } from "@/src/shared/ui/H2";

export const BestOfMonth = async () => {
	const { data: products } = await getProducts({});

	return (
		<section>
			<div className="flex justify-between mb-5 items-center">
				<H2>Лучшее за месяц</H2>
				<p className="cursor-pointer">Смотреть все</p>
			</div>

			<Slider data={products} />
		</section>
	);
};
