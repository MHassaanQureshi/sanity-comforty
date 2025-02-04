import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Navtop from "./components/Navtop/Navtop";
import { CartProvider } from "./context/CartContext";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Comforty",
  description: "Where style meets comfort",
  icons: {
    icon: [
      { rel: "apple-touch-icon", sizes: "180x180", url: "/images/apple-touch-icon.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", url: "/images/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", url: "/imagesfavicon-16x16.png" },
    ],
  },
  manifest: "/images/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          
        <Header />
        <Navtop />
      <Navbar />
        {children}
        <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
