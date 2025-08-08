import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Input, Button, Alert, message, Select } from "antd"
import { UserAddOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { apiClient } from "../../api/apiClient"
import { URLS } from "../../api/urls"
import { UserRole } from "../../types/auth"
import styles from "./AddUser.module.css"

interface AddUserForm {
  first_name: string
  last_name: string
  email: string
  role: UserRole
  password: string
  password_confirm: string
}

export default function AddUser() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (values: AddUserForm) => {
    try {
      setLoading(true)
      setError(null)
      
      // Remove password_confirm from the payload as it's only for validation
      const { password_confirm, ...payload } = values
      
      await apiClient.post(URLS.users.create, payload)
      
      message.success("User created successfully!")
      navigate("/users")
    } catch (err) {
      console.error("Failed to create user:", err)
      setError(err instanceof Error ? err.message : "Failed to create user")
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    navigate("/users")
  }

  return (
    <div className={styles.addUserPage}>
      <div className={styles.header}>
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={handleBack}
          className={styles.backButton}
        >
          Back to Users
        </Button>
        <h2>
          <UserAddOutlined /> Add New User
        </h2>
      </div>

      {error && (
        <Alert
          message="Error Creating User"
          description={error}
          type="error"
          showIcon
          closable
          onClose={() => setError(null)}
          style={{ marginBottom: 24 }}
        />
      )}

      <div className={styles.formContainer}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
          size="large"
        >
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              { required: true, message: "Please enter the first name" },
              { min: 2, message: "First name must be at least 2 characters" },
              { max: 50, message: "First name cannot exceed 50 characters" }
            ]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[
              { required: true, message: "Please enter the last name" },
              { min: 2, message: "Last name must be at least 2 characters" },
              { max: 50, message: "Last name cannot exceed 50 characters" }
            ]}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter the email address" },
              { type: "email", message: "Please enter a valid email address" }
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[
              { required: true, message: "Please select a role" }
            ]}
          >
            <Select placeholder="Select a role">
              <Select.Option value={UserRole.ADMIN}>Admin</Select.Option>
              <Select.Option value={UserRole.DISPATCHER}>Dispatcher</Select.Option>
              <Select.Option value={UserRole.COURIER}>Courier</Select.Option>
              <Select.Option value={UserRole.CLIENT}>Client</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter a password" },
              { min: 8, message: "Password must be at least 8 characters" },
              { 
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
              }
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="password_confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: "Please confirm the password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Passwords do not match'))
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>

          <Form.Item className={styles.submitSection}>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              size="large"
              block
            >
              {loading ? "Creating User..." : "Create User"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
