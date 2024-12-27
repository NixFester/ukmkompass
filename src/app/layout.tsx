import type { Metadata } from "next";
import { AuthProvider } from "./context/AuthContext";
import { ArticleProvider } from "./context/ArticleContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";
import 'dotenv/config';

export const metadata: Metadata = {
  title: "UKM KomPaSS",
  description: "Website untuk UKM KomPaSS Universitas Pancasakti Tegal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <link rel="icon" href="/favicon.ico" sizes="any" />
      <body
      >
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID || ""}>
          <ArticleProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ArticleProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}