import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import "./background-effects.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Script from "next/script";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Autofin",
  description: "Finance Automation Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />
          <Script src="/cursor-particles.js" strategy="afterInteractive" />
          <Script src="/background-effects.js" strategy="afterInteractive" />
          <footer className="bg-gray-900 py-8 text-gray-400">
            <div className="container mx-auto px-4 flex flex-col items-center text-center">
              <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} Praduniya by Pran Konwar. All rights reserved.</p>
              <div className="mt-4 flex space-x-4">
                <a href="https://github.com/konwarsukhbon" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  GitHub
                </a>
                <a href="https://linkedin.com/in/Praduniya pran konwar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}