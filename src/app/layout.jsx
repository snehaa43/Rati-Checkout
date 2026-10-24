import './globals.css';

export const metadata = {
  title: 'Aarav Naturals — Secure Checkout | Powered by Rati Logistics',
  description: 'Single-page B2C checkout powered by Rati Logistics',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <div className="app-container">
          {children}
        </div>
      </body>
    </html>
  );
}
