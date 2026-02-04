"use client"
import {FC} from "react";
import {Banner} from "@/src/shared/ui/Banner";
import Image from "next/image";
import {Button} from "@/src/shared/ui/Button";
import Link from "next/link";
import {useGetMe} from "@/src/shared/api/client/authClient";

export const LoginBanner:FC = () => {
    const {data: user} = useGetMe()

    return (
        <section className="flex gap-[35px]">
            {!user &&
                <div className="shadow p-[30px] w-[520px] text-center items-center flex flex-col rounded-[3px]">
                <Image className="mb-[27px] rounded-[3px]" src="/images/userCheck.svg" width={67} height={71} alt="Hello"/>
                <h2 className="text-4xl font-bold">Добро пожаловать!</h2>
                <p>Продолжайте покупки с нами</p>
                <div className="flex gap-5 mt-5 w-full">
                    <Link href="/registration" className="w-full">
                        <Button>Регистрация</Button>
                    </Link>

                    <Link href="/login" className="w-full">
                        <Button variant="outlined">Вход</Button>
                    </Link>
                </div>
            </div>}
            <Banner path="/images/banner2.jpg"/>
        </section>
    )
}