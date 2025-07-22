'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'

export default function Dashboard() {
  const router = useRouter()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) return null
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Bienvenido al Dashboard</h1>
      <p className="mt-4 text-lg text-gray-600">
        Aquí podrás ver tus datos y estadísticas.
      </p>
    </div>
  )
}
