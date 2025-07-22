'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/lib/store'
import { useState } from 'react'
import { supabase } from '@/lib/api'
import { toast } from 'sonner'
import { authSuccess, authFailure } from '@/lib/features/auth/authSlice'
import { Save } from 'lucide-react'

export default function ProfilePage() {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)

  const initialName = user?.user_metadata?.name || ''
  const initialPhone = user?.user_metadata?.phone || ''
  const email = user?.email || ''

  const [name, setName] = useState(initialName)
  const [phone, setPhone] = useState(initialPhone)
  const [loading, setLoading] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          name,
          phone
        }
      })

      if (error) {
        dispatch(authFailure('Error al actualizar perfil'))
        toast.error('Error al guardar los cambios')
        return
      }

      dispatch(authSuccess(data.user))
      toast.success('Perfil actualizado correctamente')
    } catch {
      dispatch(authFailure('Error desconocido'))
      toast.error('Ocurrió un error inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl p-6 bg-white rounded-lg">
      <h1 className="text-4xl font-bold mb-6">Detalles del usuario</h1>

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className='mb-8'>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className={`button transition-opacity duration-200 flex gap-2${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
            <Save/>
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>
    </div>
  )
}
