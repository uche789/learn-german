import AdminHeader from "@/features/admin/components/AdminHeader";
import { checkAuth, login } from "@/lib/api/vocab";
import { FormEventHandler, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
  const inputClasses = 'border rounded border-gray-400 p-2 w-full';
  const navigate = useNavigate();

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

  return (
    <>
      <AdminHeader title="Admin Login" showLogout={false} />
      <main className="w-full max-w-3xl m-auto p-4 bg-white">
        <form onSubmit={onSubmit} className="max-w-md m-auto">
          <div>
            <label className="block font-semibold">Username</label>
            <input
              className={inputClasses}
              type="text"
              name="username"
              required
              min={4}
            />
          </div>
          <div className="mt-5">
            <label className="block font-semibold">Password</label>
            <input
              className={inputClasses}
              type="password"
              name="password"
              required
              min={6}
            />
          </div>
          <div className="flex justify-between mt-8">
            <button type="submit" className="w-full p-2 border rounded bg-blue-500 text-white justify-self-end">Login</button>
          </div>
        </form>
      </main>
    </>
  )

}