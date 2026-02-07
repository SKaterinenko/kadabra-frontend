import {useQuery} from "@tanstack/react-query";
import {getReviewsById} from "@/src/shared/api/server/reviews";
import type {ReviewsFilters} from "@/src/shared/api/types";

export function useGetReviewsById(id: number, filters: ReviewsFilters) {
	return useQuery({
		queryKey: ["reviews", id, filters],
		queryFn: () => getReviewsById(id, filters),
		enabled: !!id,
	});
}
