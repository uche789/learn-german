import { logout } from "@/lib/api/vocab";
import { useNavigate } from "react-router-dom";

export default function AdminHeader({ title, showLogout = true }: { title: string, showLogout?: boolean }) {
  const navigate = useNavigate();

  const logoutSession = async () => {
    try {
      await logout()
      navigate('/admin/login')
    } catch {
      alert('Something went wrong. Please Try again.')
    }
  }

  return <header>
    <h1 className="text-xl m-4 font-semibold text-center">{title}</h1>
    {showLogout && <div className="text-center">
      <button onClick={() => logoutSession()}>Logout</button>
    </div>}
  </header>
}