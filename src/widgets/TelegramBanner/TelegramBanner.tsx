import {FC} from "react";
import Image from "next/image";
import {Button} from "@/src/shared/ui/Button";
import Link from "next/link";

export const TelegramBanner:FC = () => {
    return (
        <section className="flex gap-[35px]">
            <div className="shadow p-[30px] w-[1195px] text-center items-center flex flex-col rounded-[3px]">
                <Image className="mb-[27px]" src="/images/logo.svg" width={300} height={81} alt="Logo"/>
                <div className="flex mt-[80px] gap-[72px] justify-center items-center">
                    <div className="flex flex-col items-center gap-[30px]">
                        <Image src="/images/dollar.svg" alt="Icon" width={70} height={70} />
                        <p className="font-bold text-xl">Приемлемые цены</p>
                    </div>
                    <div className="flex flex-col items-center gap-[30px]">
                        <Image src="/images/delivery.svg" alt="Icon" width={97} height={69} />
                        <p className="font-bold text-xl">Быстрая доставка</p>
                    </div>
                    <div className="flex flex-col items-center gap-[30px]">
                        <Image src="/images/quality.svg" alt="Icon" width={53} height={70} />
                        <p className="font-bold text-xl">Качественный товар</p>
                    </div>
                    <div className="flex flex-col items-center gap-[30px]">
                        <Image src="/images/payment.svg" alt="Icon" width={75} height={60} />
                        <p className="font-bold text-xl">Любой вид оплаты</p>
                    </div>
                </div>

            </div>
            <div className="shadow p-[30px] w-[385px] bg-secondary items-center flex flex-col rounded-[3px] gap-10">
                <p className="text-white! font-bold text-[30px]">Присоединяйтесь к Telegram-каналу</p>
                <Link className="w-full cursor-pointer" href="https://t.me/SKaterinenko" target="_blank">
                    <Button variant="white" className="flex justify-center gap-[10px]">
                        <Image src="/images/telegram.svg" alt="Telegram" width={22} height={20}/>
                        <p className="text-white!">Перейти</p>
                    </Button>
                </Link>

                <p className="text-white! font-bold text-[28px]">для еще более удобного шопинга</p>
            </div>
        </section>
    )
}