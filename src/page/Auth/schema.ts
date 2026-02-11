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

export const registerSchema = z
	.object({
		first_name: z.string().min(2, "Имя обязательно"),
		last_name: z.string().min(2, "Фамилия обязательна"),
		birth_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Некорректная дата"),
		phone_number: z
			.string()
			.min(1, "Номер телефона обязателен")
			.regex(/^\+[1-9]\d{1,14}$/, "Номер должен быть в формате +998901234567"),
		gender: z.enum(["male", "female"], {
			error: "Выберите пол",
		}),
		email: z
			.string()
			.min(1, "Почта обязательна")
			.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Некорректная почта"),
		password: z
			.string()
			.min(4, { error: "Минимум 4 символа" })
			.max(72, { error: "Максимум 72 символа" }),

		repeat_password: z
			.string()
			.min(4, { error: "Минимум 4 символа" })
			.max(72, { error: "Максимум 72 символа" }),
	})
	.refine((data) => data.password === data.repeat_password, {
		message: "Пароли не совпадают",
		path: ["repeat_password"],
	});

export type RegisterFormData = z.infer<typeof registerSchema>;
