import {API_URL} from "@/src/shared/api/config";
import type {ICreateReview, IReviewsResponse, IReviewWithoutUser, ReviewsFilters,} from "@/src/shared/api/types";
import {buildQuery} from "@/src/shared/utils/buildQuery";

export async function getReviewsById(
	id: number,
	filters: ReviewsFilters,
	locale?: string,
): Promise<IReviewsResponse> {
	const query = buildQuery(filters);
	const url = query
		? `${API_URL}/reviews/${id}?${query}`
		: `${API_URL}/reviews/${id}`;

	const res = await fetch(url, {
		headers: { "Accept-Language": locale ?? "ru" },
	});

	if (!res.ok) {
		throw new Error("Failed to fetch reviews");
	}

	return res.json();
}

export async function createReview(
	review: ICreateReview,
): Promise<IReviewWithoutUser> {
	const formData = new FormData();

	formData.append("product_id", review.product_id.toString());
	formData.append("description", review.description);
	formData.append("rating", review.rating.toString());

	if (review.images && review.images.length > 0) {
		review.images.forEach((file) => {
			formData.append("images", file);
		});
	}

	const res = await fetch(`${API_URL}/reviews`, {
		method: "POST",
		credentials: "include",
		body: formData,
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Failed to create review");
	}

	return data;
}
