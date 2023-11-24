import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";
import { PageAndLayoutType } from "@/types/others";
import { siteConfig } from "@/services/siteConfig";
import AuthProvider from "@/components/Platform/Auth/Auth Provider";
import { Toaster } from "sonner";
import {EdgeStoreProvider} from "@/utils/edgeStore";

const assistant = Assistant({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s • ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [{ url: "/logo.png", href: "/logo.png" }],
};


const RootLayout = (props: PageAndLayoutType) => {
  const { children } = props;

  return (
    <html lang="en" dir="rtl">
      <body className={assistant.className} suppressHydrationWarning={true}>
      <Toaster richColors={true} position='top-right'/>
        <AuthProvider>
            <EdgeStoreProvider>
              {children}
            </EdgeStoreProvider>
          </AuthProvider>
      </body>
    </html>
  );
};
export default RootLayout;
