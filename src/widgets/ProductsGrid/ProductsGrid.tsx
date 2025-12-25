import {FC} from "react";
import {IProduct} from "@/src/shared/api/types";
import {ProductCard} from "@/src/shared/ui/ProductCard";

interface Props {
    data?: IProduct[];
}

export const ProductsGrid: FC<Props> = ({data}) => {
    return (
        <section className="grid grid-cols-5 gap-5">
            {data && data?.map((item) => <ProductCard key={item?.id} data={item} />)}
        </section>
    )
}