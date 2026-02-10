import {z} from "zod";

export const reviewSchema = z.object({
	description: z
		.string()
		.min(1, "Минимум 1 символ")
		.max(72, "Максимум 72 символа"),
	rating: z
		.number({
			error: (iss) =>
				iss.input === undefined ? "Выставите оценку" : undefined,
		})
		.min(1, "Минимум 1 максимум 5")
		.max(5, "Минимум 1 максимум 5"),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
