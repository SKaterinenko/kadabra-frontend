import Link from "next/link";
import {getLocale, getTranslations} from "next-intl/server";
import {Slider} from "@/src/entities/Slider";
import {getProducts} from "@/src/shared/api/server/products";
import {H2} from "@/src/shared/ui/H2";

export const BestOfMonth = async () => {
	const locale = await getLocale();
	const { data: products } = await getProducts({}, locale);
	const t = await getTranslations();

	return (
		<section>
			<div className="mb-5 flex items-center justify-between">
				<H2>{t("bestOfMonth")}</H2>
				<Link href="/best-of-month">
					<p className="cursor-pointer">{t("seeAll")}</p>
				</Link>
			</div>

			<Slider data={products} />
		</section>
	);
};
