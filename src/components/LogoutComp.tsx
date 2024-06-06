import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

const LogoutComp = () => {
  const navigate = useNavigate()
  const logoutHandle = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("nama")
    navigate("/")
  }

  return (
  <div>
      <Button onClick={logoutHandle}>Log out</Button>
  </div>
  )
}

export default LogoutComp
