'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { authSuccess, authFailure, logout } from '@/lib/features/auth/authSlice'
import { supabase } from '@/lib/api'
import { logoutUser } from '@/lib/features/auth/auth'
import { toast } from 'sonner'
import { PuffLoader } from 'react-spinners'

function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <PuffLoader color="#3b82f6" size={80} />
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [checkingAuth, setCheckingAuth] = useState(true)
  const router = useRouter()
  const dispatch = useDispatch()
  const pathname = usePathname()
  const user = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getUser()

      if (data.user) {
        dispatch(authSuccess(data.user))
      } else {
        dispatch(logout())
        router.push('/login')
      }

      setCheckingAuth(false)
    }

    checkSession()
  }, [dispatch, router])

  const userName = user?.user_metadata?.name || 'Explorador'

  const handleLogout = async () => {
    try {
      await logoutUser()
      dispatch(logout())
      toast.success('Sesión cerrada')
      router.push('/login')
    } catch (err) {
      dispatch(authFailure('Error al cerrar sesión'))
      toast.error('No se pudo cerrar sesión')
    }
  }

  if (checkingAuth) return <Spinner />

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Panel Admin</h2>

        <p className="mb-4 font-medium">Hola, {userName} 👋</p>

        <nav className="flex flex-col space-y-4 flex-grow">
          <Link
            href="/dashboard/home"
            className={`px-4 py-2 rounded ${
              pathname === '/dashboard/home'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-blue-100'
            }`}
          >
            Inicio
          </Link>
          <Link
            href="/dashboard/profile"
            className={`px-4 py-2 rounded ${
              pathname === '/dashboard/profile'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-blue-100'
            }`}
          >
            Perfil
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Cerrar sesión
        </button>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
