import { z } from "zod";

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, "Почта обязательна")
		.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Некорректная почта"),

	password: z
		.string()
		.min(4, "Минимум 4 символа")
		.max(72, "Максимум 72 символа"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
	name: z.string().min(2, "Имя обязательно"),
	last_name: z.string().min(2, "Фамилия обязательна"),
	birth_date: z.date({ error: "Некорректная дата" }),
	phone_number: z
		.string()
		.regex(/^\+?[0-9]{10,15}$/, "Неверный номер телефона")
		.optional(),
	gender: z.enum(["male", "female"], {
		error: "Выберите пол",
	}),
	email: z
		.string()
		.min(1, "Почта обязательна")
		.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Некорректная почта"),

	password: z
		.string()
		.min(4, "Минимум 4 символа")
		.max(72, "Максимум 72 символа"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
