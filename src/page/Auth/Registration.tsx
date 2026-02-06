"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {Controller, useForm} from "react-hook-form";
import {useRegister} from "@/src/shared/api/client/authClient";
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
		control,
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});
	const { mutate: registerUser, isPending, isError, error } = useRegister();
	const router = useRouter();

	const onSubmit = async (data: RegisterFormData) => {
		registerUser(
			{ ...data },
			{
				onSuccess: () => {
					router.push("/");
				},
			},
		);
	};

	return (
		<section className="flex">
			<div className="w-1/2 h-120vh relative">
				<Image
					src="/images/authBanner2.png"
					alt="Photo"
					fill
					className="object-cover"
					priority
				/>
			</div>

			<div className="w-1/2 flex items-center justify-center">
				<div className="shadow p-[45px] w-[520px]">
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
								{...register("first_name")}
								className="w-full"
								classNameInput="w-full border border-light-gray"
								error={errors.email}
							/>
							{errors.first_name && (
								<p className="!text-red-500 text-sm">
									{errors.first_name.message}
								</p>
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
							<p>Дата рождения:</p>
							<Input
								type="date"
								{...register("birth_date")}
								className="w-full"
								classNameInput="w-full border border-light-gray"
							/>
							{errors.birth_date && (
								<p className="!text-red-500 text-sm">
									{errors.birth_date.message}
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
							<p>Почта:</p>
							<Input
								{...register("email")}
								className="w-full"
								classNameInput="w-full border border-light-gray"
								error={errors.email}
							/>
							{errors.email && (
								<p className="!text-red-500 text-sm">{errors.email.message}</p>
							)}
						</div>

						<div className="flex flex-col gap-2">
							<p>Пол:</p>
							<Controller
								name="gender"
								control={control}
								render={({ field }) => (
									<Select
										placeholder="Пол"
										value={field.value}
										onValueChange={field.onChange}
										options={[
											{ value: "male", label: "Мужской" },
											{ value: "female", label: "Женский" },
										]}
									/>
								)}
							/>

							{errors.gender && (
								<p className="!text-red-500 text-sm">{errors.gender.message}</p>
							)}
						</div>

						<div className="flex flex-col gap-2">
							<div className="flex justify-between">
								<p>Пароль:</p>
								<p className="!text-gray cursor-pointer">Минимум 4 символа</p>
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

							<div className="flex justify-between">
								<p>Повторите пароль:</p>
							</div>
							<Input
								type="password"
								{...register("repeat_password")}
								className="w-full"
								classNameInput="w-full border border-light-gray"
								error={errors.repeat_password}
							/>
							{errors.repeat_password && (
								<p className="!text-red-500 text-sm">
									{errors.repeat_password.message}
								</p>
							)}
						</div>

						<Button type="submit" disabled={isPending}>
							{isPending ? "Регистрация..." : "Регистрация"}
						</Button>

						{isError && (
							<p className="!text-red-500 text-lg">
								{error?.message || "Ошибка входа"}
							</p>
						)}

						<p className="!text-gray flex justify-end">
							<Link href="/login">Уже есть аккаунт? Войдите</Link>
						</p>
					</form>
				</div>
			</div>
		</section>
	);
};
