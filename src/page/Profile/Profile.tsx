"use client"
import { Header } from "@/src/entities/Header"
import {Footer} from "@/src/entities/Footer";
import { Button } from "@/src/shared/ui/Button";
import {useLogout} from "@/src/shared/api/client/authClient";
import {useRouter} from "next/navigation";


export const Profile = () => {
    const { mutate: logout, isPending, isSuccess } = useLogout();
    const router = useRouter()

    const logoutFunc = () => {
        logout()

        if (isSuccess) {
            router.push("/login");
        }
    }

    return (
        <main>
            <Header />
            <div className="container mt-10! min-h-screen">
                <h1>Profile</h1>
                <Button disabled={isPending} onClick={logoutFunc}>Logout</Button>
            </div>
            <Footer />
        </main>
    )
}