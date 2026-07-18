import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter_Tight } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { CartProvider } from "@/components/cart/CartContext";
import { AuthProvider } from "@/hooks/useAuth";
import { ToastProvider } from "@/components/ui/Toast";
import Preloader from "@/components/Preloader";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-playfair",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FFFBF3",
};

export const metadata: Metadata = {
  title: "Vora Labs — Premium Research Peptides for Laboratory R&D",
  description:
    "Vora Labs develops, fills and independently verifies premium research peptides for controlled laboratory R&D. Janoshik tested, 99%+ HPLC verified purity, batch-level Certificate of Analysis on every release. Research use only — not for human or veterinary consumption.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${interTight.variable}`}>
      <body>
        <Preloader />
        <AuthProvider>
          <ToastProvider>
            <CartProvider>
              <SmoothScroll>{children}</SmoothScroll>
            </CartProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
