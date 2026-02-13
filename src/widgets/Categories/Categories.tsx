import Link from "next/link";
import {getLocale, getTranslations} from "next-intl/server";
import {getCategories} from "@/src/shared/api/server/categories";
import {H2} from "@/src/shared/ui/H2";
import {ProductCard} from "@/src/shared/ui/ProductCard";

export const Categories = async () => {
	const t = await getTranslations();
	const locale = await getLocale();
	const categories = await getCategories(locale);

	return (
		<section>
			<div className="mb-5 flex items-center justify-between">
				<H2>{t("categories")}</H2>
				<Link href="/best-of-month">
					<p className="cursor-pointer">{t("seeAll")}</p>
				</Link>
			</div>
			<div className="flex gap-6">
				{categories?.slice(0, 5)?.map((category) => (
					<ProductCard
						key={category?.id}
						data={category}
						subTitle={`${t("more")} 200 ${t("products")}`}
					/>
				))}
			</div>
		</section>
	);
};
