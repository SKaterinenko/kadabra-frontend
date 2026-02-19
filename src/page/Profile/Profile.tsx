"use client";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import {useEffect} from "react";
import {Footer} from "@/src/entities/Footer";
import {Header} from "@/src/entities/Header";
import {useLogout} from "@/src/shared/api/client/authClient";
import {Button} from "@/src/shared/ui/Button";

export const Profile = () => {
	const t = useTranslations();
	const { mutate: logout, isPending, isSuccess } = useLogout();
	const router = useRouter();

	const logoutFunc = () => {
		logout();

		if (isSuccess) {
			router.push("/login");
		}
	};

	useEffect(() => {
		console.log("ENV:", process.env.NEXT_PUBLIC_API_URL);
	}, []);

	return (
		<main>
			<Header />
			<div className="container mt-10! min-h-screen">
				<h1>{t("personalArea")}</h1>
				<Button disabled={isPending} onClick={logoutFunc}>
					{t("logout")}
				</Button>
				<p>{process.env.NEXT_PUBLIC_API_URL}</p>
			</div>
			<Footer />
		</main>
	);
};
