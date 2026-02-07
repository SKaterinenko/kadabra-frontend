import {API_URL} from "@/src/shared/api/config";
import type {IReviewsResponse, ReviewsFilters} from "@/src/shared/api/types";
import {buildQuery} from "@/src/shared/utils/buildQuery";

export async function getReviewsById(
	id: number,
	filters: ReviewsFilters,
): Promise<IReviewsResponse> {
	const query = buildQuery(filters);
	const url = query
		? `${API_URL}/reviews/${id}?${query}`
		: `${API_URL}/reviews/${id}`;

	const res = await fetch(url);

	if (!res.ok) {
		throw new Error("Failed to fetch reviews");
	}

	return res.json();
}
