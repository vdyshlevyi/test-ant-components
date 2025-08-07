import { useState, useEffect } from "react"
import { Table, Alert, Space } from "antd"
import { UserOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import { apiClient } from "../../api/api-client"
import { URLS } from "../../api/urls"
import type { IUser } from "../../types/auth"
import type { IUsersListResponse } from "../../types/responses"
import styles from "./Users.module.css"

export default function UsersPage() {
  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 2,
    total: 0,
  })

  const fetchUsers = async (page: number = 1, pageSize: number = 2) => {
    try {
      setLoading(true)
      setError(null)

      // Build URL with pagination parameters
      const url = new URL(URLS.users.list)
      url.searchParams.append("page", page.toString())
      url.searchParams.append("page_size", pageSize.toString())

      const responseJson = await apiClient.get<IUsersListResponse>(
        url.toString(),
      )

      console.log("Fetched users:", responseJson)
      setUsers(responseJson.items)
      setPagination({
        current: responseJson.page,
        pageSize: responseJson.page_size,
        total: responseJson.total,
      })
    } catch (err) {
      console.error("Failed to fetch users:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch users")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const columns: ColumnsType<IUser> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      render: (text: string) => (
        <Space>
          <UserOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string) => <a href={`mailto:${email}`}>{email}</a>,
    },
  ]

  return (
    <div className={styles.usersPage}>
      {error && (
        <Alert
          type="error"
          message="Error loading users"
          description={error}
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <Table
        className={styles.usersTable}
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} users`,
          onChange: (page, pageSize) => fetchUsers(page, pageSize),
          onShowSizeChange: (_, size) => fetchUsers(1, size), // Reset to first page when page size changes
        }}
      />
    </div>
  )
}
