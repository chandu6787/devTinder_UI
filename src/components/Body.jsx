import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"
const Body = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Body