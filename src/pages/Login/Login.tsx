import "./Login.css"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useAuth } from "../../hooks/use-auth.ts"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import InputWithIcon from "../../components/InputWithIcon/input-with-icon.tsx"
import { getAccessToken } from "../../auth/utils.ts"

interface IFormInput {
  email: string
  password: string
}

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit,
  } = useForm<IFormInput>({ mode: "onTouched" })

  // If user is already logged in, redirect to home page
  useEffect(() => {
    const accessToken = getAccessToken()
    if (accessToken && accessToken !== "undefined") {
      navigate("/dashboard", { replace: true })
    }
  }, [navigate])

  // Get ready to work with login form
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await login(data.email, data.password)
      // Redirect to dashboard after successful login
      navigate("/dashboard", { replace: true })
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  return (
    <div className="login-page">
      <h4 className="title">Log In</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWithIcon
          iconType="email"
          type="email"
          id="email"
          placeholder="Email"
          autoComplete="email"
          register={register("email", { required: "This field is required." })}
          error={errors.email}
          touched={touchedFields.email}
        />
        <InputWithIcon
          iconType="password"
          type="password"
          id="password"
          placeholder="Password"
          autoComplete="current-password"
          register={register("password", {
            required: "This field is required.",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long.",
            },
            maxLength: {
              value: 20,
              message: "Password must not exceed 20 characters.",
            },
          })}
          error={errors.password}
          touched={touchedFields.password}
        />
        <button className="btn" type="submit">
          Login
        </button>
        <a href="#" className="btn-link">
          Forgot your password?
        </a>
      </form>
    </div>
  )
}
