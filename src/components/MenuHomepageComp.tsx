import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

const MenuHomapageComp = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_5px_10px] flex justify-between items-center">
      <div className="py-4 px-7 font-bold text-xl md:text-3xl text-center">
        Agenda Rapat
      </div>
      <Button className="mx-7" onClick={()=>navigate("/signin")}>Sign in</Button>
    </div>
  )
}

export default MenuHomapageComp
