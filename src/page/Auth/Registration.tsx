"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {useLogin} from "@/src/shared/api/client/authClient";
import {Button} from "@/src/shared/ui/Button";
import {H1} from "@/src/shared/ui/H1";
import {Input} from "@/src/shared/ui/Input";
import {Select} from "@/src/shared/ui/Select";
import {type RegisterFormData, registerSchema} from "./schema";

export const Registration = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});
	const { mutate: loginUser, isPending, isError, error } = useLogin();
	const router = useRouter();

	const onSubmit = async (data: RegisterFormData) => {
		loginUser(
			{
				email: data.email,
				password: data.password,
			},
			{
				onSuccess: () => {
					router.push("/");
				},
			},
		);
	};

	return (
		<section className="flex h-screen">
			<div className="w-1/2 h-full relative">
				<Image
					src="/images/authBanner1.png"
					alt="Photo"
					fill
					className="object-cover"
					priority
				/>
			</div>

			<div className="w-1/2 flex items-center justify-center">
				<div className="shadow p-[50px] w-[520px]">
					<div className="flex justify-between items-center">
						<H1 className="!text-4xl">Регистрация</H1>
						<Link href="/">
							<Image
								src="/images/logo.svg"
								width={125}
								height={25}
								alt="Logo"
							/>
						</Link>
					</div>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="mt-10 flex flex-col gap-4"
					>
						<div className="flex flex-col gap-2">
							<p>Имя:</p>
							<Input
								{...register("name")}
								className="w-full"
								classNameInput="w-full border border-light-gray"
								error={errors.email}
							/>
							{errors.name && (
								<p className="!text-red-500 text-sm">{errors.name.message}</p>
							)}
						</div>

						<div className="flex flex-col gap-2">
							<p>Фамилия:</p>
							<Input
								{...register("last_name")}
								className="w-full"
								classNameInput="w-full border border-light-gray"
								error={errors.last_name}
							/>
							{errors.last_name && (
								<p className="!text-red-500 text-sm">
									{errors.last_name.message}
								</p>
							)}
						</div>

						<div className="flex flex-col gap-2">
							<p>Номер телефона:</p>
							<Input
								{...register("phone_number")}
								className="w-full"
								classNameInput="w-full border border-light-gray"
								error={errors.phone_number}
							/>
							{errors.phone_number && (
								<p className="!text-red-500 text-sm">
									{errors.phone_number.message}
								</p>
							)}
						</div>

						<div className="flex flex-col gap-2">
							<p>Пол:</p>
							<Select
								{...register("gender")}
								placeholder="Пол"
								options={[
									{ value: "male", label: "Мужской" },
									{ value: "female", label: "Женский" },
								]}
							/>

							{errors.gender && (
								<p className="!text-red-500 text-sm">{errors.gender.message}</p>
							)}
						</div>

						<div className="flex flex-col gap-2">
							<div className="flex justify-between">
								<p>Пароль:</p>
								<p className="!text-gray cursor-pointer">Забыли пароль?</p>
							</div>

							<Input
								type="password"
								{...register("password")}
								className="w-full"
								classNameInput="w-full border border-light-gray"
								error={errors.password}
							/>
							{errors.password && (
								<p className="!text-red-500 text-sm">
									{errors.password.message}
								</p>
							)}
						</div>

						<Button type="submit" disabled={isPending}>
							{isPending ? "Входим..." : "Войти"}
						</Button>

						{isError && (
							<p className="!text-red-500 text-lg">
								{error?.message || "Ошибка входа"}
							</p>
						)}

						<p className="!text-gray flex justify-end">
							Еще нет аккаунта?{" "}
							<Link href="/register" className="ml-1 underline">
								Зарегистрируйтесь
							</Link>
						</p>
					</form>
				</div>
			</div>
		</section>
	);
};
