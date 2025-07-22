'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthCheck } from '@/hooks/useAuthCheck'
import { PuffLoader } from 'react-spinners'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/lib/features/auth/auth'
import { toast } from 'sonner'
import { authFailure, logout } from '@/lib/features/auth/authSlice'
import { useState } from 'react'
import { Menu, X, LayoutDashboard, User } from 'lucide-react'
import Image from 'next/image'

function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <PuffLoader
        color="#3b82f6"
        size={80}
      />
    </div>
  )
}

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { checkingAuth, user } = useAuthCheck({ redirectIfAuthenticated: true })
  const router = useRouter()
  const dispatch = useDispatch()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const userName = user?.user_metadata?.name || 'Explorador'

  const handleLogout = async () => {
    try {
      await logoutUser()
      dispatch(logout())
      toast.success('Sesión cerrada')
      router.push('/login')
    } catch {
      dispatch(authFailure('Error al cerrar sesión'))
      toast.error('No se pudo cerrar sesión')
    }
  }

  if (checkingAuth) return <Spinner />

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`bg-white border-r border-[#e7e7e7] p-6 flex-col gap-4 md:flex md:w-64 transition-all duration-300 ${
            sidebarOpen ? 'flex absolute z-10 w-64 h-screen' : 'hidden'
          }`}
        >
          <div className="flex gap-4 items-center">
            <div className="md:hidden">
              <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <Image
              src="/images/logo.png"
              alt="logo"
              width={150}
              height={150}
            />
          </div>

          <nav className="flex flex-col space-y-4 flex-grow mt-6">
            <Link
              href="/dashboard/home"
              className={`px-4 py-2 rounded-lg flex ${
                pathname === '/dashboard/home'
                  ? 'bg-[#182537] text-white'
                  : 'text-gray-700 hover:bg-blue-100'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <LayoutDashboard className="w-6 h-6 mr-2" />
              Inicio
            </Link>
            <Link
              href="/dashboard/profile"
              className={`px-4 py-2 rounded-lg flex ${
                pathname === '/dashboard/profile'
                  ? 'bg-[#182537] text-white'
                  : 'text-gray-700 hover:bg-blue-100'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <User className="w-6 h-6 mr-2" />
              Perfil
            </Link>
          </nav>
        </aside>

        <div className="flex-1 flex flex-col">
          <header className="px-6 py-4 flex items-center justify-between md:justify-end border-b border-[#e7e7e7]">
            <div className="md:hidden">
              <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="w-6 h-6" />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium hidden md:block">
                Hola, {userName} 👨‍🚀
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
