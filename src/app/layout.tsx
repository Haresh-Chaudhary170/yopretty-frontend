import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from '@/providers/Providers';
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { NuqsAdapter } from 'nuqs/adapters/next/app';

// import '../../public/OneSignalSDKWorker.js'
<script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "yoPretty",
  description: "Powered By Me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const { isAuthenticated } = useAuth();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <div className="dashboard-layout">
        <NuqsAdapter>

          <Providers>
            {children}
          </Providers>
          </NuqsAdapter>
        </div>
      </body>
    </html>
  );
}
