import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useLocale} from "next-intl";
import {createReview, getReviewsById} from "@/src/shared/api/server/reviews";
import type {ReviewsFilters} from "../types";

export function useGetReviewsById(id: number, filters: ReviewsFilters) {
	const locale = useLocale();

	return useQuery({
		queryKey: ["reviews", id, filters, locale],
		queryFn: () => getReviewsById(id, filters, locale),
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
