import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Lora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Bahasa Builder",
  description: "Indonesian morphology dictionary",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
        <link
          rel="icon"
          href="/indonesia-flag.png"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={`${lora.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
