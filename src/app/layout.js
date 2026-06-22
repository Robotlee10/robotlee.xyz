import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Robotlee Portfolio',
  description: 'Personal portfolio website',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
