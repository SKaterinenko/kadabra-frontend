import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="container mt-10! py-10">
            <Image src="/images/logo.svg" alt="logo" width={287} height={60} />
            <div className="flex justify-between mt-[30px] w-full">
                <div className="flex justify-between items-center gap-5">
                    <Link href="/" className="text-xl">Контакты</Link>
                    <span className="h-6 w-px bg-gray-300" />
                    <Link href="/" className="text-xl">Telegram-канал</Link>
                    <span className="h-6 w-px bg-gray-300" />
                    <Link href="/" className="text-xl">Публичная оферта</Link>
                </div>
                <p className="text-gray! text-xl">+100 123 45 56</p>
            </div>
        </footer>
    )
}