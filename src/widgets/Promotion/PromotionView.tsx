"use client";
import {useTranslations} from "next-intl";
import type {FC} from "react";
import {Slider} from "@/src/entities/Slider";
import type {IProduct} from "@/src/shared/api/types";
import {H2} from "@/src/shared/ui/H2";

type Props = {
	products?: IProduct[];
};

export const PromotionView: FC<Props> = ({ products }) => {
	const t = useTranslations();

	return (
		<section>
			<div className="grid grid-cols-[25%_75%] gap-5">
				<div className="flex flex-col gap-[35px] rounded-[3px] bg-primary px-10 py-[70px]">
					<H2 className="text-[48px] text-white!">{t("promoProducts")}</H2>

					<div>
						<p className="font-bold text-white! text-xl">-30%</p>
						<p className="font-bold text-white! text-xl">
							{t("onlyUntil")} 05.05.2026
						</p>
					</div>
				</div>

				<Slider data={products} slides={5} />
			</div>
		</section>
	);
};
