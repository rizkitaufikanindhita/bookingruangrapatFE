import { useNavigate } from "react-router-dom"
import FooterComp from "@/components/FooterComp"
import HomepageComp from "@/components/HomepageComp"
import MenuHomapageComp from "@/components/MenuHomepageComp"

const Homepage = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  if (token) {
    navigate("/dashboard")
  }
  return (
    <div className="flex flex-col min-h-screen absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div className="flex-grow">
        <MenuHomapageComp />
        <HomepageComp />
      </div>
      <FooterComp />
    </div>
  )
}

export default Homepage
