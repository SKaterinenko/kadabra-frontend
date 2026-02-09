import type {FC} from "react";
import {RatingBar} from "@/src/page/Product/ui/RatingBar";
import {RatingCardSkeleton} from "@/src/page/Product/ui/RatingCardSkeleton";
import type {IRating} from "@/src/shared/api/types";
import {H3} from "@/src/shared/ui/H3";
import {StarRating} from "@/src/shared/ui/StarRating";

interface Props {
	ratings?: IRating;
}

export const RatingCard: FC<Props> = ({ ratings }) => {
	const getAverageRating = () => {
		const totalRatings =
			ratings &&
			ratings?.rating_1 +
				ratings?.rating_2 +
				ratings?.rating_3 +
				ratings?.rating_4 +
				ratings?.rating_5;

		if (totalRatings === 0) return 0;

		const totalScore =
			ratings &&
			ratings?.rating_1 +
				ratings?.rating_2 * 2 +
				ratings?.rating_3 * 3 +
				ratings?.rating_4 * 4 +
				ratings?.rating_5 * 5;

		if (totalScore && totalRatings) {
			return totalScore / totalRatings;
		}
	};

	if (!ratings) return <RatingCardSkeleton />;

	return (
		<div className="shadow p-5 w-[385px]">
			<H3>Оценки</H3>
			<div className="flex gap-3 mt-4">
				<StarRating
					size={16}
					initialRating={Number(getAverageRating()?.toFixed(0))}
				/>
				<p>{getAverageRating()} из 5</p>
			</div>
			<p>{ratings?.total_count} отзывов</p>
			<div className="mt-5">
				<RatingBar
					total={ratings?.total_count}
					label="5 звезд"
					rating={ratings?.rating_5}
				/>
				<RatingBar
					total={ratings?.total_count}
					label="4 звезды"
					rating={ratings?.rating_4}
				/>
				<RatingBar
					total={ratings?.total_count}
					label="3 звезды"
					rating={ratings?.rating_3}
				/>
				<RatingBar
					total={ratings?.total_count}
					label="2 звезды"
					rating={ratings?.rating_2}
				/>
				<RatingBar
					total={ratings?.total_count}
					label="1 звезда"
					rating={ratings?.rating_1}
				/>
			</div>
		</div>
	);
};
