import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const AddComp = () => {
  const navigate = useNavigate()

  const clickAdd = () => {
    navigate("/add")
  }

  return(
  <div>
      <Button onClick={clickAdd}>Add Meeting</Button>
  </div>
  )
}

export default AddComp
