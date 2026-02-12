import type {Metadata} from "next";
import "../../../globals.css";

export const metadata: Metadata = {
	title: "Login Kadabra",
	description: "Pet project by SKaterinenko",
};

export default function BestOfMothLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
