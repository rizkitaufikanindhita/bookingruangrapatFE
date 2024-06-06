import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signin from "./pages/Signin"
import Homepage from "./pages/Homepage"
import Dashboard from "./pages/Dashboard"
import AddPost from "./pages/AddPost"
import EditPost from "./pages/EditPost"

function App(){
  return (
  <>
    <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddPost />} />
          <Route path="/edit" element={<EditPost />} />
        </Routes>
    </Router>
  </>
  )
}

export default App
