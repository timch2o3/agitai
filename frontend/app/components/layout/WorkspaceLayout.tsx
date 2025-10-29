'use client';

import React from 'react';
import { Layout } from 'antd';
import { AppHeader } from './AppHeader';
import { AppSider } from './AppSider';
import { UtilityBar } from './UtilityBar';
import { useRouter, usePathname } from 'next/navigation';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
}

export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  // 현재 선택된 메뉴 키 결정
  const getSelectedKey = () => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/space/')) {
      const spaceId = pathname.split('/')[2];
      return spaceId;
    }
    return 'home';
  };

  const handleMenuClick = (key: string) => {
    if (key === 'home') {
      router.push('/');
    } else if (key === 'add-space') {
      // 스페이스 추가 로직
      console.log('Add space');
    } else if (key.startsWith('agit-')) {
      router.push(`/space/${key}`);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Global Header - 항상 표시 */}
      <AppHeader />
      
      {/* Main Layout Area */}
      <Layout>
        {/* Left Sidebar */}
        <AppSider 
          selectedKey={getSelectedKey()}
          onMenuClick={handleMenuClick}
        />
        
        {/* Main Content + Right Sidebar */}
        <Layout style={{ background: '#f8f9fa' }}>
          {/* Main Content Area */}
          <Layout.Content style={{ 
            background: '#f8f9fa',
            minHeight: 'calc(100vh - 64px)', // Header 높이 제외
            overflow: 'auto'
          }}>
            {children}
          </Layout.Content>
          
          {/* Right Utility Bar */}
          <UtilityBar />
        </Layout>
      </Layout>
    </Layout>
  );
};