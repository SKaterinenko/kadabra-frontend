import Link from "next/link";
import {getLocale} from "next-intl/server";
import {Slider} from "@/src/entities/Slider";
import {getProducts} from "@/src/shared/api/server/products";
import {H2} from "@/src/shared/ui/H2";

export const BestOfMonth = async () => {
	const locale = await getLocale();
	const { data: products } = await getProducts({}, locale);

	return (
		<section>
			<div className="flex justify-between mb-5 items-center">
				<H2>Лучшее за месяц</H2>
				<Link href="/best-of-month">
					<p className="cursor-pointer">Смотреть все</p>
				</Link>
			</div>

			<Slider data={products} />
		</section>
	);
};
