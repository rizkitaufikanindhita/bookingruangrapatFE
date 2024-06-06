import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DashboardComp from "@/components/DashboardComp"
import MenubarComp from "@/components/MenubarComp"
import FooterComp from "@/components/FooterComp"

const Dashboard = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(!token){
      navigate("/signin")
    }
  },[])

  return (
  <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <MenubarComp />
      <DashboardComp />
      <FooterComp />
  </div>
  )
}

export default Dashboard
