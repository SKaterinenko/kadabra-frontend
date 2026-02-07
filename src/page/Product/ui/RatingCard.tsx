import type {FC} from "react";
import type {IRating} from "@/src/shared/api/types";
import {H3} from "@/src/shared/ui/H3";
import StarRating from "@/src/shared/ui/StarRating/StarRating";

interface Props {
	ratings?: IRating;
}

export const RatingCard: FC<Props> = ({ ratings }) => {
	return (
		<div className="shadow p-5 w-[385px]">
			<H3>Оценки</H3>
			<div className="flex gap-3">
				<StarRating size={16} initialRating={4} />
				<p>4.3 из 5</p>
			</div>
			<p>{ratings?.total_count} отзывов</p>
			<div className="mt-5">
				<p>5 звезд: {ratings?.rating_5}</p>
				<p>4 звезд: {ratings?.rating_4}</p>
				<p>3 звезд: {ratings?.rating_3}</p>
				<p>2 звезд: {ratings?.rating_2}</p>
				<p>1 звезд: {ratings?.rating_1}</p>
			</div>
		</div>
	);
};
