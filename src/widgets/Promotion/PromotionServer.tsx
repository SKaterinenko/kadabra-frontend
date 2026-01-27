import { getProducts } from "@/src/shared/api/server/products";
import { PromotionView } from "./PromotionView";

export const PromotionServer = async () => {
    const products = await getProducts({});

    return <PromotionView products={products?.data} />;
};
