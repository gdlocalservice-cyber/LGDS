import type { Metadata } from "next";
import type { Viewport } from "next";
import "@fontsource/oswald/700.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.localgaragedoorsvc.com"),
  title: { default: "Local Garage Door Service", template: "%s" },
  description: "Garage door repair and installation across Pennsylvania, New Jersey and Delaware.",
  applicationName: "Local Garage Door Service",
  category: "Home Services",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { type: "website", locale: "en_US", siteName: "Local Garage Door Service" },
  twitter: { card: "summary_large_image", title: "Local Garage Door Service", description: "Garage door repair and installation across Pennsylvania, New Jersey and Delaware.", images: ["/assets/garage-door-technician-king-of-prussia-pa-lgds.webp"] },
  icons: { icon: "/assets/logo-nav.webp" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#071a3a" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/assets/garage-door-technician-king-of-prussia-pa-lgds-mobile-720.avif" type="image/avif" media="(max-width: 620px)" fetchPriority="high" />
      </head>
      <body>{children}</body>
    </html>
  );
}
