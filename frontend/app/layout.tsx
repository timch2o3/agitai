// app/layout.tsx
import React from 'react';
import AntdRegistry from './AntdRegistry'; // 1. 방금 만든 레지스트리 import
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>{children}</AntdRegistry> {/* 2. <children>을 감싸기 */}
      </body>
    </html>
  );
}