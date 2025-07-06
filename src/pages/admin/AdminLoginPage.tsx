import AdminHeader from "@/features/admin/components/AdminHeader";
import { checkAuth, login } from "@/lib/api/vocab";
import { FormEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SvgIcon from "@/components/svg-icon/svg-icon";
import { IconType } from "@/lib/types";
import "./AdminLoginPage.scss";

export default function AdminLoginPage() {
  const inputClasses = 'border rounded border-gray-400 p-2 w-full';
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [visibilityIcon, setVisibilityIcon] = useState(IconType.Visibility);

  useEffect(() => {
    async function fetchData() {
      const result = await checkAuth()
      if (result) {
        navigate('/admin')
      }
    }
    fetchData()
  }, [])

  const onSubmit: FormEventHandler<HTMLFormElement> = async (formEvent) => {
    formEvent.preventDefault()
    try {
          const formData = new FormData(formEvent.currentTarget)
          await login(formData)
          navigate('/admin')
        } catch (ex) {
          alert('An error occurred: ' + (ex as Error).message)
        }
  }

  const passwordToggle = () => {
    setPasswordVisibility(!passwordVisibility);
    setVisibilityIcon(passwordVisibility ? IconType.Visibility : IconType.VisibilityOff);
  }

  return (
    <>
      <AdminHeader title="Admin Login" showLogout={false} />
      <main className="w-full max-w-3xl m-auto p-4 bg-white admin-login-page">
        <form onSubmit={onSubmit} className="max-w-md m-auto">
          <div>
            <label htmlFor="username" className="block font-semibold">Username</label>
            <input
              className={inputClasses}
              type="text"
              name="username"
              id="username"
              required
              min={4}
              autoComplete="off"
            />
          </div>
          <div className="mt-5 password-field relative">
            <label htmlFor="password" className="block font-semibold">Password</label>
            <input
              className={inputClasses}
              type={passwordVisibility ? 'text' : 'password'}
              name="password"
              id="password"
              required
              min={6}
            />
            <button className="absolute" type="button" onClick={passwordToggle}>
              <SvgIcon name={visibilityIcon} />
            </button>
  
          </div>
          <div className="flex justify-between mt-8">
            <button type="submit" className="w-full p-2 border rounded bg-blue-500 text-white justify-self-end">Login</button>
          </div>
        </form>
      </main>
    </>
  )

}