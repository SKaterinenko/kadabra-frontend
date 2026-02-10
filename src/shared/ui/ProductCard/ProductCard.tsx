import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import {type FC, memo} from "react";
import type {ICategory, IProduct} from "@/src/shared/api/types";
import {StarRating} from "@/src/shared/ui/StarRating";
import {getAverageRating} from "@/src/shared/utils/avgRating";
import {ProductCardSkeleton} from "./ProductCardSkeleton";

interface Props {
	data: IProduct | ICategory;
	subTitle?: string;
}

export const ProductCard: FC<Props> = memo(({ data, subTitle }) => {
	const prices =
		"variations" in data && data.variations
			? data.variations.map((el) => el.price)
			: [];

	const rating = "rating" in data && data.rating ? data.rating : undefined;

	const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
	const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

	const imageUrl =
		"variations" in data && data.variations?.[0]?.image
			? data.variations[0].image
			: "/images/noProduct.png";

	const url =
		"variations" in data && data.variations
			? `/product/${data?.slug}`
			: `/category/${data?.slug}`;

	if (!data) return <ProductCardSkeleton />;

	return (
		<Link href={url} className="shadow rounded-[3px]">
			<Image
				src={imageUrl}
				className="w-full h-auto w-[300px] h-[222px] object-contain"
				width={300}
				height={222}
				alt="Product"
			/>
			<div className="py-[25px] px-[15px]">
				{minPrice > 0 && (
					<p className="font-bold">
						${minPrice} - ${maxPrice}
					</p>
				)}
				<p className={clsx(subTitle && "font-bold text-2xl")}>{data?.name}</p>
				<div className="mt-[10px]">
					{!subTitle ? (
						<StarRating
							initialRating={Math.floor(getAverageRating(rating) ?? 0)}
							editable={false}
							size={20}
						/>
					) : (
						<p className="text-primary!">{subTitle}</p>
					)}
				</div>
			</div>
		</Link>
	);
});
