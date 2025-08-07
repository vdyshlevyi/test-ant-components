import React, { useState } from "react"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons"
import { Button, Layout, Menu, theme, Breadcrumb } from "antd"
import { useLocation, useNavigate } from "react-router-dom"
import "./auth-layout.css"
import { logout } from "../../auth/utils"

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

// Generate breadcrumb items based on current path
const getBreadcrumbItems = (pathname: string) => {
  const pathSegments = pathname.split("/").filter((segment) => segment !== "")

  const breadcrumbItems: Array<{ title: string; href?: string }> = []

  if (pathSegments.length > 0) {
    pathSegments.forEach((segment, index) => {
      const path = "/" + pathSegments.slice(0, index + 1).join("/")
      const menuItem = MENU_ITEMS.find((item) => item.key === path)

      if (menuItem) {
        breadcrumbItems.push({
          title: menuItem.label,
          // Don't make the current page clickable
          ...(index < pathSegments.length - 1 ? { href: path } : {}),
        })
      } else {
        // For non-menu items, show parent breadcrumb if it exists
        if (index > 0) {
          const parentPath = "/" + pathSegments.slice(0, index).join("/")
          const parentMenuItem = MENU_ITEMS.find(
            (item) => item.key === parentPath,
          )

          if (
            parentMenuItem &&
            !breadcrumbItems.some((item) => item.title === parentMenuItem.label)
          ) {
            breadcrumbItems.push({
              title: parentMenuItem.label,
              href: parentPath,
            })
          }
        }

        // Add current segment
        breadcrumbItems.push({
          title: segment.charAt(0).toUpperCase() + segment.slice(1),
          // Don't make the current page clickable
          ...(index < pathSegments.length - 1 ? { href: path } : {}),
        })
      }
    })
  }

  return breadcrumbItems
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  // Get current selected key based on pathname
  const selectedKeys = [location.pathname]

  // Handle menu item click
  const handleMenuClick = ({ key }: { key: string }) => navigate(key)

  // Handle logout
  const handleLogout = () => {
    logout()
    navigate("/") // Redirect to login page
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ position: "relative" }}
      >
        <div
          style={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            borderBottom: "1px solid #303030",
            marginBottom: "8px",
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
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "16px",
            borderTop: "1px solid #303030",
          }}
        >
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className={`logout-button ${collapsed ? "logout-button-collapsed" : "logout-button-expanded"}`}
          >
            {!collapsed && "Logout"}
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
          <Breadcrumb
            style={{ marginBottom: 16 }}
            items={getBreadcrumbItems(location.pathname)}
          />
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
