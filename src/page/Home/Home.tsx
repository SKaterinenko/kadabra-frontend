import {Footer} from "@/src/entities/Footer";
import {Header} from "@/src/entities/Header";
import {Banner} from "@/src/shared/ui/Banner";
import {BestOfMonth} from "@/src/widgets/BestOfMonth";
import {Categories} from "@/src/widgets/Categories";
import {LoginBanner} from "@/src/widgets/LoginBanner";
import {PromotionServer} from "@/src/widgets/Promotion/PromotionServer";
import {TelegramBanner} from "@/src/widgets/TelegramBanner";

export const Home = () => {
	// const t = useTranslations("home");

	return (
		<main>
			<Header />
			{/*<h1>{t("title")}</h1>*/}
			<Banner path="/images/banner1.jpg" />
			<div className="container">
				<div className="mt-[90px] flex flex-col gap-[50px]">
					<BestOfMonth />
					<LoginBanner />
					<Categories />
					<TelegramBanner />
					<Banner path="/images/banner3.jpg" />
					<PromotionServer />
				</div>
			</div>
			<Footer />
		</main>
	);
};
