import type {Metadata} from "next";
import {Providers} from "../Providers";
import "../globals.css";
import localFont from "next/font/local";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";

const helvetica = localFont({
	src: "../../public/fonts/HelveticaNeueCyr-Roman.woff",
	variable: "--font-helvetica",
});

const helveticaBold = localFont({
	src: "../../public/fonts/HelveticaNeueCyr-Bold.woff",
	variable: "--font-helvetica-bold",
});

export const metadata: Metadata = {
	title: "Kadabra",
	description: "Pet project by SKaterinenko",
};

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const messages = await getMessages();

	return (
		<html lang={locale}>
			<body
				className={`${helvetica.variable} ${helveticaBold.variable} antialiased`}
			>
				<Providers>
					<NextIntlClientProvider messages={messages}>
						{children}
					</NextIntlClientProvider>
				</Providers>
			</body>
		</html>
	);
}
