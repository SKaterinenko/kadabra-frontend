import type { IRating } from "@/src/shared/api/types";

export const getAverageRating = (ratings?: IRating) => {
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
