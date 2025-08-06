import { Result } from "antd"
import "./NotFound.css"

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <Result
        icon={
          <div className="custom-404-icon">
            <span className="icon-text">🌌</span>
          </div>
        }
        title="404"
        subTitle="Oops! The page you are looking for doesn't exist."
      />
    </div>
  )
}
