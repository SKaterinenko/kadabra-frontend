"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import {Controller, useForm} from "react-hook-form";
import {useRegister} from "@/src/shared/api/client/authClient";
import {Button} from "@/src/shared/ui/Button";
import {H1} from "@/src/shared/ui/H1";
import {Input} from "@/src/shared/ui/Input";
import {Select} from "@/src/shared/ui/Select";
import {type RegisterFormData, registerSchema} from "./schema";

export const Registration = () => {
	const t = useTranslations();
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
			<div className="relative h-120vh w-1/2">
				<Image
					src="/images/authBanner2.png"
					alt="Photo"
					fill
					className="object-cover"
					priority
				/>
			</div>

			<div className="flex w-1/2 items-center justify-center">
				<div className="w-[520px] p-[45px] shadow">
					<div className="flex items-center justify-between">
						<H1 className="!text-4xl">{t("registration")}</H1>
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
							<p>{t("name")}</p>
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
							<p>{t("lastName")}</p>
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
							<p>{t("dateBirth")}</p>
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
							<p>{t("phone")}</p>
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
							<p>{t("email")}</p>
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
							<p>{t("gender")}</p>
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
								<p>{t("password")}</p>
								<p className="!text-gray cursor-pointer">{t("minPassword")}</p>
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
								<p>{t("repeatPassword")}</p>
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
							{isPending ? `${t("registration")}...` : t("registration")}
						</Button>

						{isError && (
							<p className="!text-red-500 text-lg">
								{error?.message || t("enterError")}
							</p>
						)}

						<p className="!text-gray flex justify-end">
							<Link href="/login">{t("haveAcc")}</Link>
						</p>
					</form>
				</div>
			</div>
		</section>
	);
};
