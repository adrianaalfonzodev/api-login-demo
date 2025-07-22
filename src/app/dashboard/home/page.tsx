'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchLatestLaunch } from '@/lib/api'

interface Launch {
  name: string
  date_utc: string
  success: boolean | null
  details?: string | null
  rocket: string
  links: {
    patch: {
      small?: string | null
      large?: string | null
    }
    webcast?: string | null
    wikipedia?: string | null
    article?: string | null
  }
}

export default function HomePage() {
  const user = useSelector((state: RootState) => state.auth.user)
  const [launch, setLaunch] = useState<Launch | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLatestLaunch()
      .then((data) => setLaunch(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading)
    return (
      <p className="text-center mt-10">Cargando lanzamiento de SpaceX...</p>
    )
  if (!launch)
    return (
      <p className="text-center mt-10 text-red-500">Error cargando datos</p>
    )

  return (
    <div className="max-w-4xl p-6">
      <h1 className="text-4xl font-bold mb-2">Bienvenido, explorador 🚀</h1>
      <p className="my-6 text-gray-600 mb-6 text-justify">
        Estás en el panel principal del centro de mando. Aquí verás los datos
        más recientes de exploración espacial. Esta sección muestra el
        lanzamiento más reciente realizado por <strong>SpaceX</strong>,
        incluyendo enlaces para ver el webcast oficial, leer artículos y
        aprender más en Wikipedia.
      </p>

      <div className="bg-white rounded-lg border border-[#e7e7e7] p-6 flex flex-col md:flex-row items-center gap-6">
        {launch.links.patch.large && (
          <div className="relative w-48 h-48 flex-shrink-0 mx-auto md:mx-0">
            <Image
              src={launch.links.patch.large}
              alt={launch.name}
              fill
              className="object-contain"
              priority
            />
          </div>
        )}

        <div className="flex-1">
          <h2 className="text-3xl font-semibold mb-2">{launch.name}</h2>
          <p className="text-gray-600 mb-2">
            <strong>Fecha:</strong> {new Date(launch.date_utc).toLocaleString()}
          </p>
          <p
            className={`mb-4 font-semibold ${
              launch.success ? 'text-green-600' : 'text-red-600'
            }`}
          >
            Estado:{' '}
            {launch.success === null
              ? 'Desconocido'
              : launch.success
              ? 'Éxito'
              : 'Fallido'}
          </p>

          {launch.details && (
            <p className="mb-4 text-gray-700">{launch.details}</p>
          )}

          <div className="flex flex-wrap gap-4">
            {launch.links.webcast && (
              <a
                href={launch.links.webcast}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#182537] text-white rounded hover:bg-blue-700 transition"
              >
                Ver webcast
              </a>
            )}

            {launch.links.wikipedia && (
              <a
                href={launch.links.wikipedia}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#E89B4C] text-white rounded hover:bg-gray-900 transition"
              >
                Wikipedia
              </a>
            )}

            {launch.links.article && (
              <a
                href={launch.links.article}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Artículo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
