import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createReview, getReviewsById } from "@/src/shared/api/server/reviews";
import type { ReviewsFilters } from "../types";

export function useGetReviewsById(id: number, filters: ReviewsFilters) {
	return useQuery({
		queryKey: ["reviews", id, filters],
		queryFn: () => getReviewsById(id, filters),
		enabled: !!id,
	});
}

export function useCreateReview() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createReview,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["reviews"],
			});
		},
	});
}
