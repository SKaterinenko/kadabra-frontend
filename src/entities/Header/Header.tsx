import Image from "next/image";
import {Input} from "@/src/shared/ui/Input/Input";
import Link from "next/link";


export const Header = () => {
    return (
        <header>
            <div className="bg-amber-300 text-center">
                <h2>Сайт пет-проект backend + frontend by <Link className="text-blue-400" href="https://github.com/SKaterinenko/kadabra-frontend">SKaterinenko</Link></h2>
            </div>
            <div className="container py-[20px]">

                <div className="flex justify-between">
                    <div className="flex items-center justify-between gap-[123px]">
                        <Image src="/images/logo.svg" width={145} height={30} alt="Logo"/>
                        <Input placeholder="Поиск товаров:" width={790} search/>
                    </div>
                    <div className="flex gap-8 items-center">
                        <Image src="/images/cart.svg" width={32} height={28} alt="Cart"/>
                        <Image src="/images/user.svg" width={26} height={28} alt="User"/>
                        <p>ozb</p>
                    </div>

                </div>
                <div className="flex mt-[30px] justify-between w-[1058px]">
                    <Link href="/" className="text-xl">Лучшее за месяц</Link>
                    <span className="h-6 w-px bg-gray-300" />
                    <Link href="/" className="text-xl">Электроника</Link>
                    <span className="h-6 w-px bg-gray-300" />
                    <Link href="/" className="text-xl">Одежда и аксессуары</Link>
                    <span className="h-6 w-px bg-gray-300" />
                    <Link href="/" className="text-xl">Здоровье</Link>
                    <span className="h-6 w-px bg-gray-300" />
                    <Link href="/" className="text-xl">Косметика</Link>
                    <span className="h-6 w-px bg-gray-300" />
                    <Link href="/" className="text-xl">Дом</Link>
                </div>
            </div>
        </header>
    )
}