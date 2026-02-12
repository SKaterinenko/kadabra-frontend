import {getLocale} from "next-intl/server";
import {getProducts} from "@/src/shared/api/server/products";
import {PromotionView} from "./PromotionView";

export const PromotionServer = async () => {
	const locale = await getLocale();
	const products = await getProducts({}, locale);

	return <PromotionView products={products?.data} />;
};
