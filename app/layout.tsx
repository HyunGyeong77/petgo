import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/providers/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
import QueryProviders from '@/providers/QueryProviers';

export const metadata: Metadata = {
  title: 'PetGo - 반려견을 더 잘 이해하는 방법',
  description: '강아지가 좋아하는 것부터 산책, 용품, 병원 정보까지 한 곳에서 확인하세요.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
        />
      </head>
      <body>
        <QueryProviders>
          <AuthProvider>
            <ToastContainer
              className="toast-container"
              position="top-right"
              autoClose={2000}
              pauseOnHover={false}
            />
            {children}
          </AuthProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
