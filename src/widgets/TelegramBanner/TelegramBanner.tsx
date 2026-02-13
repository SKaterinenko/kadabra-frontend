import Image from "next/image";
import Link from "next/link";
import {getTranslations} from "next-intl/server";
import type {FC} from "react";
import {Button} from "@/src/shared/ui/Button";

export const TelegramBanner: FC = async () => {
	const t = await getTranslations();

	return (
		<section className="flex gap-[35px]">
			<div className="flex w-[1195px] flex-col items-center rounded-[3px] p-[30px] text-center shadow">
				<Image
					className="mb-[27px]"
					src="/images/logo.svg"
					width={300}
					height={81}
					alt="Logo"
				/>
				<div className="mt-[80px] flex items-center justify-center gap-[72px]">
					<div className="flex flex-col items-center gap-[30px]">
						<Image src="/images/dollar.svg" alt="Icon" width={70} height={70} />
						<p className="font-bold text-xl">{t("prices")}</p>
					</div>
					<div className="flex flex-col items-center gap-[30px]">
						<Image
							src="/images/delivery.svg"
							alt="Icon"
							width={97}
							height={69}
						/>
						<p className="font-bold text-xl">{t("delivery")}</p>
					</div>
					<div className="flex flex-col items-center gap-[30px]">
						<Image
							src="/images/quality.svg"
							alt="Icon"
							width={53}
							height={70}
						/>
						<p className="font-bold text-xl">{t("quality")}</p>
					</div>
					<div className="flex flex-col items-center gap-[30px]">
						<Image
							src="/images/payment.svg"
							alt="Icon"
							width={75}
							height={60}
						/>
						<p className="font-bold text-xl">{t("anyPay")}</p>
					</div>
				</div>
			</div>
			<div className="flex w-[385px] flex-col items-center gap-10 rounded-[3px] bg-secondary p-[30px] shadow">
				<p className="font-bold text-[30px] text-white!">{t("telegram")}</p>
				<Link
					className="w-full cursor-pointer"
					href="https://t.me/SKaterinenko"
					target="_blank"
				>
					<Button variant="white" className="flex justify-center gap-[10px]">
						<Image
							src="/images/telegram.svg"
							alt="Telegram"
							width={22}
							height={20}
						/>
						<p className="text-white!">{t("goTo")}</p>
					</Button>
				</Link>

				<p className="font-bold text-[28px] text-white!">{t("telegramDesc")}</p>
			</div>
		</section>
	);
};
