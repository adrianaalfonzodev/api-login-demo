'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'

export default function HomePage() {
  const user = useSelector((state: RootState) => state.auth.user)
  const userName = user?.user_metadata?.name || 'Explorador'

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold">Bienvenido, {userName} 🚀</h1>
      <p className="mt-4 text-lg text-gray-600">
        Aquí podrás ver tus datos y estadísticas del universo.
      </p>
    </div>
  )
}