import { API_URL } from "@/src/shared/api/config";
import type {
	ICreateReview,
	IReviewsResponse,
	IReviewWithoutUser,
	ReviewsFilters,
} from "@/src/shared/api/types";
import { buildQuery } from "@/src/shared/utils/buildQuery";

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

export async function createReview(
	review: ICreateReview,
): Promise<IReviewWithoutUser> {
	const formData = new FormData();

	// Добавляем текстовые поля
	formData.append("product_id", review.product_id.toString());
	formData.append("description", review.description);
	formData.append("rating", review.rating.toString());

	// Добавляем файлы (если есть)
	if (review.images && review.images.length > 0) {
		review.images.forEach((file, index) => {
			formData.append("images", file);
		});
	}

	const res = await fetch(`${API_URL}/reviews`, {
		method: "POST",
		// НЕ указываем Content-Type, браузер сам установит multipart/form-data с boundary
		credentials: "include",
		body: formData,
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Failed to create review");
	}

	return data;
}
