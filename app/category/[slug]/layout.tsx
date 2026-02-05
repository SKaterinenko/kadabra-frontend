import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
	title: "Kadabra",
	description: "Pet project by SKaterinenko",
};

export default function CategoryPageLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
