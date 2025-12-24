import {Header} from "@/src/entities/Header";
import {Banner} from "@/src/shared/ui/Banner";
import {BestOfMonth} from "@/src/widgets/BestOfMonth";
import {LoginBanner} from "@/src/widgets/LoginBanner";
import {Categories} from "@/src/widgets/Categories";
import {TelegramBanner} from "@/src/widgets/TelegramBanner";
import {Promotion} from "@/src/widgets/Promotion";
import {Footer} from "@/src/entities/Footer";

export const Home = () => {
    return (
        <main>
            <Header/>
            <Banner path="/images/banner1.jpg"/>
            <div className="container">
                <div className="mt-[90px] flex flex-col gap-[50px]">
                    <BestOfMonth/>
                    <LoginBanner/>
                    <Categories/>
                    <TelegramBanner/>
                    <Banner path="/images/banner3.jpg"/>
                    <Promotion/>

                </div>
            </div>
            <Footer/>
        </main>
    )
}