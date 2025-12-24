import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';

const helvetica = localFont({
    src: '../public/fonts/HelveticaNeueCyr-Roman.woff',
    variable: '--font-helvetica',
});

const helveticaBold = localFont({
    src: '../public/fonts/HelveticaNeueCyr-Bold.woff',
    variable: '--font-helvetica-bold',
});

export const metadata: Metadata = {
  title: "Kadabra",
  description: "Pet project by SKaterinenko",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${helvetica.variable} ${helveticaBold.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
