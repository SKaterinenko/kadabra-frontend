import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Почта обязательна")
        .regex(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Некорректная почта"
        ),

    password: z
        .string()
        .min(4, "Минимум 4 символа")
        .max(72, "Максимум 72 символа"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
