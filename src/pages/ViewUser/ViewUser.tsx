import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Descriptions, Button, Spin, Alert, Tag } from "antd"
import { UserOutlined, ArrowLeftOutlined, EditOutlined } from "@ant-design/icons"
import { apiClient } from "../../api/apiClient"
import { URLS } from "../../api/urls"
import type { IUser } from "../../types/auth"
import { UserRole } from "../../types/auth"
import styles from "./ViewUser.module.css"

export default function ViewUser() {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getRoleColor = (role: UserRole): string => {
    switch (role) {
      case UserRole.ADMIN:
        return "red"
      case UserRole.DISPATCHER:
        return "blue"
      case UserRole.COURIER:
        return "green"
      case UserRole.CLIENT:
        return "orange"
      default:
        return "default"
    }
  }

  const getRoleDisplayName = (role: UserRole): string => {
    switch (role) {
      case UserRole.ADMIN:
        return "Admin"
      case UserRole.DISPATCHER:
        return "Dispatcher"
      case UserRole.COURIER:
        return "Courier"
      case UserRole.CLIENT:
        return "Client"
      default:
        return role
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        setError("User ID is required")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        
        const userData = await apiClient.get<IUser>(URLS.users.view(parseInt(userId)))
        setUser(userData)
      } catch (err) {
        console.error("Failed to fetch user:", err)
        setError(err instanceof Error ? err.message : "Failed to load user data")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId])

  if (loading) {
    return (
      <div className={styles.viewUserPage}>
        <div className={styles.loadingContainer}>
          <Spin size="large" />
          <p>Loading user details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.viewUserPage}>
        <Alert
          message="Error Loading User"
          description={error}
          type="error"
          showIcon
          action={
            <Button size="small" onClick={() => navigate("/users")}>
              Back to Users
            </Button>
          }
        />
      </div>
    )
  }

  if (!user) {
    return (
      <div className={styles.viewUserPage}>
        <Alert
          message="User Not Found"
          description="The requested user could not be found."
          type="warning"
          showIcon
          action={
            <Button size="small" onClick={() => navigate("/users")}>
              Back to Users
            </Button>
          }
        />
      </div>
    )
  }

  return (
    <div className={styles.viewUserPage}>
      {/* User Information */}
      <div className={styles.userInfo}>
        <h2>
          <UserOutlined /> {`${user.first_name} ${user.last_name}`}
        </h2>
        
        <Descriptions
          bordered
          column={1}
          size="middle"
          labelStyle={{ fontWeight: 600, width: '150px' }}
        >
          <Descriptions.Item label="User ID">
            {user.id}
          </Descriptions.Item>
          <Descriptions.Item label="First Name">
            {user.first_name}
          </Descriptions.Item>
          <Descriptions.Item label="Last Name">
            {user.last_name}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {user.email}
          </Descriptions.Item>
          <Descriptions.Item label="Role">
            <Tag color={getRoleColor(user.role)}>
              {getRoleDisplayName(user.role)}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Full Name">
            {`${user.first_name} ${user.last_name}`}
          </Descriptions.Item>
        </Descriptions>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <Button 
          type="primary" 
          icon={<EditOutlined />} 
          disabled
        >
          Edit User
        </Button>
      </div>
    </div>
  )
}
