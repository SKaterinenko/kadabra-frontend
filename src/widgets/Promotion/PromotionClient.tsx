"use client";

import { useGetProducts } from "@/src/shared/api/client/productsClient";
import { PromotionView } from "./PromotionView";

export const PromotionClient = () => {
	const { data: products } = useGetProducts({});

	return <PromotionView products={products?.data} />;
};
