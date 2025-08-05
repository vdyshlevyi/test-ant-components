import React, { useState } from "react"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons"
import { Button, Layout, Menu, theme } from "antd"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const { Header, Sider, Content } = Layout

const MENU_ITEMS = [
  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "/users",
    icon: <UserOutlined />,
    label: "Users",
  },
]

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  // Get current selected key based on pathname
  const selectedKeys = [location.pathname]

  // Handle menu item click
  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  // Handle logout
  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        style={{ position: 'relative' }}
      >
        <div
          style={{
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            borderBottom: '1px solid #303030',
            marginBottom: '8px'
          }}
        >
          TUPY
        </div>
        
        {/* Main menu */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          items={MENU_ITEMS}
          onClick={handleMenuClick}
          style={{ borderRight: 0 }}
        />

        {/* Logout button at bottom */}
        <div 
          style={{ 
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '16px',
            borderTop: '1px solid #303030'
          }}
        >
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{
              width: '100%',
              textAlign: 'left',
              color: 'rgba(255, 255, 255, 0.65)',
              border: 'none',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
            }}
            // TODO(Valerii Dyshlevyi): work with hover effect
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            {!collapsed && 'Logout'}
          </Button>
        </div>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
