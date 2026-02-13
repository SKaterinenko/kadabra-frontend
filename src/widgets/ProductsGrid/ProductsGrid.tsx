import type {FC} from "react";
import type {IProduct} from "@/src/shared/api/types";
import {ProductCard} from "@/src/shared/ui/ProductCard";
import {Skeleton} from "@/src/shared/ui/Skeleton/Skeleton";

interface Props {
	data?: IProduct[];
}

export const ProductsGrid: FC<Props> = ({ data }) => {
	return (
		<section className="grid grid-cols-5 gap-5">
			{!!data?.length &&
				data?.map((item) => <ProductCard key={item?.id} data={item} />)}
			{!data?.length &&
				Array.from({ length: 15 }).map((_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<Skeleton key={i} className="h-[250px] w-[200px]" />
				))}
		</section>
	);
};
