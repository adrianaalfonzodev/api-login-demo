import { loginStart, loginSuccess } from '@/lib/features/auth/authSlice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import AppInput from '../ui/AppInput'
import Image from 'next/image'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    dispatch(loginStart())
    try {
      // Simula login exitoso con usuario fijo
      const fakeUser = { id: 1, name: 'Adriana' }
      await new Promise((r) => setTimeout(r, 1000))
      dispatch(loginSuccess(fakeUser))
    } catch {
      // dispatch(loginFailure('Error al iniciar sesión')) si tienes esa acción
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:p-4 relative sm:w-[540px] w-full">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 relative w-full"
      >
        <AppInput
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Correo electrónico"
          required
        />

        <AppInput
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Contraseña"
          required
        />

        <a
          href="#"
          className="text-xs mb-6 text-[#E89B4C]"
        >
          ¿Olvidaste la contraseña?
        </a>

        <button
          type="submit"
          className="button"
        >
          Iniciar sesión
        </button>
      </form>
      <div className="flex items-center my-2">
        <hr className="flex-grow-1 text-gray-300" />
        <span className="mx-2 text-2 text-muted">O</span>
        <hr className="flex-grow-1 text-gray-300" />
      </div>

      <button className="social-button relative w-full">
        <div className="w-6 h-6 absolute">
          <Image
            src="/icons/Google_Favicon_2025.png"
            alt="logo"
            fill={true}
          />
        </div>
        <span className="flex-1">Continuar con google</span>
      </button>

      <p className="text-center text-sm mt-6">
        ¿No tienes cuenta?{' '}
        <a
          href="#"
          className="text-[#E89B4C]"
        >
          Crear una cuenta
        </a>
      </p>
    </div>
  )
}

export default LoginForm
