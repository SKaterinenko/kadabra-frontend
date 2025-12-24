import {FC} from "react";
import {Banner} from "@/src/shared/ui/Banner";
import Image from "next/image";
import {Button} from "@/src/shared/ui/Button";

export const LoginBanner:FC = () => {
    return (
        <section className="flex gap-[35px]">
            <div className="shadow p-[30px] w-[520px] text-center items-center flex flex-col rounded-[3px]">
                <Image className="mb-[27px] rounded-[3px]" src="/images/userCheck.svg" width={67} height={71} alt="Hello"/>
                <h2 className="text-4xl font-bold">Добро пожаловать!</h2>
                <p>Продолжайте покупки с нами</p>
                <div className="flex gap-5 mt-5 w-full">
                    <Button>Регистрация</Button>
                    <Button variant="outlined">Вход</Button>
                </div>
            </div>
            <Banner path="/images/banner2.jpg"/>
        </section>
    )
}