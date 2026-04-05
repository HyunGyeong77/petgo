import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'PetGo - 반려견을 더 잘 이해하는 방법',
  description: '강아지가 좋아하는 것부터 산책, 용품, 병원 정보까지 한 곳에서 확인하세요.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
        />
      </head>
      <body>
        <ToastContainer
          position="top-right"
          autoClose={2000}
        />
        {children}
      </body>
    </html>
  );
}
