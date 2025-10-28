// app/page.tsx
'use client'; 

import React from 'react';
// [수정] Space 컴포넌트를 import에 추가합니다.
import { Layout, Menu, Card, Row, Col, Progress, Avatar, Dropdown, Button, Space } from 'antd'; 
// AntD 메뉴 아이템 타입을 import 합니다.
import type { MenuProps } from 'antd'; 
// [수정] BellOutlined (알림) 아이콘을 import에 추가합니다.
import {
  HomeOutlined,
  AppstoreOutlined,
  PlusOutlined,
  MoreOutlined,
  UserOutlined,
  SettingOutlined,
  MessageOutlined,
  CloudOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
  BellOutlined, 
} from '@ant-design/icons';

// AntD 컴포넌트 이름으로 Layout 구성
const { Header, Content, Sider } = Layout;

export default function Home() {

  // (4) User Profile 드롭다운 메뉴 아이템
  const userMenuItems: MenuProps['items'] = [
    {
      key: '1',
      label: '프로필 설정',
      icon: <SettingOutlined />,
    },
    {
      key: '2',
      label: '로그아웃',
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 2. SideNav (Sider) - (1) 흰색 배경 */}
      <Sider width={200} theme="light">
        <div style={{ padding: '16px', fontWeight: 'bold', fontSize: '18px' }}>WorkSpace</div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['home']}
          items={[
            { key: 'home', icon: <HomeOutlined />, label: '홈' },
            { key: 'my-space', icon: <UserOutlined />, label: '내 스페이스' },
            {
              key: 'space',
              icon: <AppstoreOutlined />,
              label: '스페이스',
              children: [
                { key: 'agit-basic', label: 'AGIT Basic' },
                { key: 'agit-advanced', label: 'AGIT Advanced' },
              ],
            },
            { key: 'add-space', icon: <PlusOutlined />, label: '스페이스 추가' },
          ]}
        />
        {/* SideNavFooter (ArchiveSpace) */}
        <div style={{ position: 'absolute', bottom: 0, width: '100%', padding: '16px' }}>
          스페이스 보관함
        </div>
      </Sider>

      {/* (1) 메인 레이아웃의 배경색을 엷은 회색으로 설정합니다. */}
      <Layout style={{ background: '#f8f9fa' }}>
        {/* (1) GlobalHeader (Header) - 흰색 배경 */}
        <Header style={{ background: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* GlobalSearch 등 좌측 아이템 (필요시 추가) */}
          <div></div> 
          
          {/* [수정] (4) 알림, 설정, User Profile 아이콘 그룹 */}
          <div>
            <Space size="middle" align="center">
              {/* 알림 아이콘 버튼 */}
              <Button icon={<BellOutlined />} type="text" shape="circle" />
              {/* 설정 아이콘 버튼 */}
              <Button icon={<SettingOutlined />} type="text" shape="circle" />
              {/* User Profile 아바타 및 드롭다운 */}
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
                <Avatar style={{ backgroundColor: '#87d068', cursor: 'pointer' }} icon={<UserOutlined />} />
              </Dropdown>
            </Space>
          </div>
        </Header>

        {/* (1) MainContent(Content) - 엷은 회색 배경, 흰색 박스 제거 */}
        <Content style={{ 
            padding: '24px' // 흰색 박스 제거, 패딩만 적용
        }}>
          <h2>홈</h2>
          {/* 4.1. SpaceGrid (Row/Col) */}
          <Row gutter={[24, 24]}> {/* gutter(간격)를 조금 넓혔습니다. */}
            
            {/* (2) AGIT Basic 카드 - 연한 녹색 */}
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card
                title="AGIT Basic"
                extra={<Button icon={<MoreOutlined />} type="text" />}
                variant="borderless" 
                // (3) 카드 크기 동일하게, (2) 배경색 적용
                style={{ height: '100%', background: '#f6ffed', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} 
              >
                <p>기간: 2025.10.01 ~ 2025.12.31</p>
                <p>장소: 배재명 강의실 A</p>
                <Progress percent={30} showInfo={false} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Avatar.Group max={{ count: 2 }}>
                      <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                      <Avatar style={{ backgroundColor: '#1890ff' }}>U</Avatar>
                    </Avatar.Group>
                    <span>24명</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{color: '#8c8c8c', fontSize: '12px'}}>담당:</span>
                    <Avatar size="small" style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    <span style={{fontSize: '14px'}}>홍길동</span>
                  </div>
                </div>
              </Card>
            </Col>

            {/* (2) AGIT Advanced 카드 - 연한 금색 */}
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card
                title="AGIT Advanced"
                extra={<Button icon={<MoreOutlined />} type="text" />}
                variant="borderless"
                // (3) 카드 크기 동일하게, (2) 배경색 적용
                style={{ height: '100%', background: '#fffbe6', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} 
              >
                <p>기간: 2025.10.01 ~ 2025.12.31</p>
                <p>장소: 온라인 Zoom</p>
                <Progress percent={10} showInfo={false} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Avatar.Group max={{ count: 2 }}>
                      <Avatar style={{ backgroundColor: '#13c2c2' }}>A</Avatar>
                    </Avatar.Group>
                    <span>15명</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{color: '#8c8c8c', fontSize: '12px'}}>담당:</span>
                    <Avatar size="small" style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
                    <span style={{fontSize: '14px'}}>이순신</span>
                  </div>
                </div>
              </Card>
            </Col>
            
            {/* (2) AGIT Expert 카드 - 연한 청색 */}
            <Col xs={24} sm={12} md={8} lg={6}>
                <Card
                  title="AGIT Expert"
                  extra={<Button icon={<MoreOutlined />} type="text" />}
                  variant="borderless"
                  // (3) 카드 크기 동일하게, (2) 배경색 적용
                  style={{ height: '100%', background: '#e6f7ff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} 
                >
                <p>기간: 2025.11.01 ~ 2026.01.31</p>
                <p>장소: 본사 101호</p>
                <Progress percent={0} showInfo={false} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Avatar.Group max={{ count: 2 }} />
                    <span>0명</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{color: '#8c8c8c', fontSize: '12px'}}>담당:</span>
                    <Avatar size="small" icon={<UserOutlined />} />
                    <span style={{fontSize: '14px'}}>미지정</span>
                  </div>
                </div>
              </Card>
            </Col>

            {/* 4.1.2. AddSpaceCard */}
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card 
                hoverable 
                variant="borderless"
                // (3) 카드 크기 동일하게
                style={{ 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    minHeight: '270px',
                    border: '1px dashed #d9d9d9',
                    background: '#fafafa' // 추가 카드는 약간 다른 배경
                }}
              >
                <PlusOutlined style={{ fontSize: '24px', color: '#8c8c8c' }} />
                <p style={{ color: '#8c8c8c', marginTop: '8px' }}>스페이스 추가</p>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>

      {/* (1) UtilityBar (Sider) - 흰색 배경 */}
      <Sider width={60} theme="light" style={{ borderLeft: '1px solid #f0f0f0', textAlign: 'center', paddingTop: '16px' }}>
        <Button icon={<MessageOutlined />} type="text" style={{ marginBottom: '8px' }} />
        <Button icon={<CloudOutlined />} type="text" style={{ marginBottom: '8px' }} />
        <Button icon={<VideoCameraOutlined />} type="text" />
      </Sider>
    </Layout>
  );
}