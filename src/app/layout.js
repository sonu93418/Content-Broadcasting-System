import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'ContentCast — Content Broadcasting System',
  description: 'Educational content broadcasting platform for teachers and principals. Upload, approve, and broadcast subject-based content to students in real-time.',
  keywords: 'content broadcasting, education, teacher, principal, live content',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
