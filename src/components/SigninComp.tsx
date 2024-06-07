import { Fragment, useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios";
import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_URL_SIGNIN

export const SigninComp = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  type signinType = {
    username: String,
    password: String
  }

  const body: signinType = {
    username: username,
    password: password
  }

  const handleSignin = async () => {
    const response = await axios.post(url, body)
    const token = response.data.token
    if (response.data.msg == "login berhasil") {
      localStorage.setItem("token", token)
      localStorage.setItem("nama", username)
      navigate("/dashboard")
    } else {
      alert("silahkan cek username atau password anda")
    }
  }

  return <Fragment>
    <div className="flex justify-center items-center my-52 md:my-0 h-auto md:h-screen">
      <div className="md:w-3/5">
        <div className="font-bold text-3xl text-center">
          Selamat Datang
        </div>
        <div className="font-bold text-xl text-center">
          Di Sistem Booking Ruang Rapat
        </div>
        <div className="font-light text-lg mx-5 mt-2 text-center">
          Silahkan login dengan nama lengkap dan NIP
        </div>
        <div className="px-10 md:px-44">
          <div className="items-start text-left mt-4">
            <div className="font-bold text-lg">
              Username
            </div>
            <Input className="mt-2" placeholder="Johndoe" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="items-start text-left mt-4">
            <div className="font-bold text-lg">
              Password
            </div>
            <Input className="mt-2" type="password" placeholder="**********" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button className="w-full mt-4" onClick={handleSignin}>Login</Button>
        </div>
      </div>
    </div>
  </Fragment>;
};

export default SigninComp
