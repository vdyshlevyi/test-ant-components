import {
  Row,
  Col,
  Card,
  Statistic,
  Avatar,
  Typography,
  Space,
  Divider,
} from "antd"
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  RiseOutlined,
  MailOutlined,
  IdcardOutlined,
} from "@ant-design/icons"
import { useAuth } from "../hooks/use-auth"

const { Title, Text } = Typography

// Mock data for the dashboard
const statsData = [
  {
    title: "Total Users",
    value: 11280,
    prefix: <UserOutlined />,
    valueStyle: { color: "#3f8600" },
    suffix: "+12.5%",
  },
  {
    title: "Total Sales",
    value: 25840,
    prefix: <DollarOutlined />,
    valueStyle: { color: "#cf1322" },
    suffix: "$",
  },
  {
    title: "Orders",
    value: 1128,
    prefix: <ShoppingCartOutlined />,
    valueStyle: { color: "#1890ff" },
    suffix: "+8.2%",
  },
  {
    title: "Revenue",
    value: 98520,
    prefix: <RiseOutlined />,
    valueStyle: { color: "#722ed1" },
    suffix: "$",
  },
]

export default function Dashboard() {
  const { user } = useAuth()

  // Get user display name (user is guaranteed to exist due to AuthGuard)
  const getUserDisplayName = () => {
    const firstName = user?.first_name || ""
    const lastName = user?.last_name || ""
    const fullName = `${firstName} ${lastName}`.trim()

    return fullName || user?.email
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    const firstName = user?.first_name || ""
    const lastName = user?.last_name || ""

    if (firstName && lastName)
      return `${firstName[0]}${lastName[0]}`.toUpperCase()

    return user?.email[0].toUpperCase()
  }

  return (
    <div style={{ padding: "24px" }}>
      {/* User Welcome Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} lg={16}>
          <Space size="large" align="center">
            <Avatar
              size={64}
              style={{
                backgroundColor: "#1890ff",
                fontSize: "24px",
              }}
            >
              {getUserInitials()}
            </Avatar>
            <div>
              <Title level={2} style={{ margin: 0 }}>
                Welcome back, {getUserDisplayName()}!
              </Title>
              <Text type="secondary">
                Here's what's happening with your business today.
              </Text>
            </div>
          </Space>
        </Col>
        <Col xs={24} lg={8}>
          <Card size="small" style={{ textAlign: "center" }}>
            <Space direction="vertical" size="small">
              <Avatar
                size="large"
                icon={<UserOutlined />}
                style={{ backgroundColor: "#52c41a" }}
              />
              <div>
                <Text strong>{getUserDisplayName()}</Text>
                <br />
                <Text type="secondary">
                  <MailOutlined /> {user?.email}
                </Text>
                <br />
                <Text type="secondary">
                  <IdcardOutlined /> ID: {user?.id}
                </Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        {statsData.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                valueStyle={stat.valueStyle}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}
