import SigninComp from "@/components/SigninComp"

const Signin = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
        <SigninComp />
      </div>
    </div>
  )
}

export default Signin
