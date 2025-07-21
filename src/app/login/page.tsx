'use client'

import LoginForm from '../../components/LoginForm/index'
import Image from 'next/image'

export default function Login() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col h-screen w-screen flex-1 p-6 overflow-hidden">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={150}
          height={150}
          className="sm:m-4"
        />
        <div className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-3xl font-semibold mb-2">
            Bienvenido al Centro de Mando
          </h1>
          <h4 className="mb-8 text-gray-500">
            Inicia sesión para comenzar tu viaje por el universo
          </h4>
          <LoginForm />
        </div>
        <div className="footer mt-auto text-center">
          <p className="text-xs text-gray-500">
            Todos los derechos reservados. SpaceLogo 2025
          </p>
        </div>
      </div>
      <div
        className="image-section w-full !bg-center !bg-cover sm:flex-1 items-center hidden sm:flex"
        style={{ background: 'url(/images/login-bg.jpg)' }}
      >
        <div className="text-white blurred-background p-10">
          <h4 className="text-2xl mb-3 max-w-[90%] mt-12">
            Lorem ipsum dolor sit amet consectetur adipisicing elit consequuntur
            doloribus harum et quis
          </h4>
          <p className="text-xs max-w-[50%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
            consequuntur doloribus harum, et quis aliquid quam ex, animi alias
          </p>
        </div>
      </div>
    </div>
  )
}
