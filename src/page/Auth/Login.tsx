"use client";
import {zodResolver} from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import {useForm} from "react-hook-form";
import {useLogin} from "@/src/shared/api/client/authClient";
import {Button} from "@/src/shared/ui/Button";
import {H1} from "@/src/shared/ui/H1";
import {Input} from "@/src/shared/ui/Input";
import {type LoginFormData, loginSchema} from "./schema";

export const Login = () => {
	const t = useTranslations();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});
	const { mutate: loginUser, isPending, isError, error } = useLogin();
	const router = useRouter();

	const onSubmit = async (data: LoginFormData) => {
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
			<div className="relative h-full w-1/2">
				<Image
					src="/images/authBanner1.png"
					alt="Photo"
					fill
					className="object-cover"
					priority
				/>
			</div>

			<div className="flex w-1/2 items-center justify-center">
				<div className="w-[520px] p-[50px] shadow">
					<div className="flex items-center justify-between">
						<H1 className="!text-4xl">{t("login")}</H1>
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
							<div className="flex justify-between">
								<p>{t("password")}</p>
								<p className="!text-gray cursor-pointer">
									{t("forgotPassword")}
								</p>
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
							{isPending ? t("signInLoad") : t("signIn")}
						</Button>

						{isError && (
							<p className="!text-red-500 text-lg">
								{error?.message || t("enterError")}
							</p>
						)}

						<p className="!text-gray flex justify-end">
							<Link href="/registration">{t("noAcc")}</Link>
						</p>
					</form>
				</div>
			</div>
		</section>
	);
};
