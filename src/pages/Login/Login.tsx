import "./Login.css"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useAuth } from "../../hooks/useAuth.ts"
import { useNavigate } from "react-router-dom"
import InputWithIcon from "../../components/InputWithIcon/InputWithIcon.tsx"

interface IFormInput {
  email: string
  password: string
}

export default function LoginPage() {
  const auth = useAuth()
  const navigate = useNavigate()
  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit,
  } = useForm<IFormInput>({ mode: "onTouched" })

  // If user is already logged in, redirect to home page
  if (auth.user) {
    navigate("/", { replace: true })
    return null
  }

  // Get ready to work with login form
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    auth.login(data.email, data.password)
  }

  return (
    <div className="login-page">
      <h4 className="title">Log In!</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWithIcon
          iconType="email"
          type="email"
          id="email"
          placeholder="Email"
          register={register("email", { required: "This field is required." })}
          error={errors.email}
          touched={touchedFields.email}
        />
        <InputWithIcon
          iconType="password"
          type="password"
          id="password"
          placeholder="Password"
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
