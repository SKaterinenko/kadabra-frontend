"use client";

import { PromotionView } from "./PromotionView";
import {useGetProducts} from "@/src/shared/api/client/productsClient";

export const PromotionClient = () => {
    const {data: products} = useGetProducts({})

    return <PromotionView products={products} />;
};
