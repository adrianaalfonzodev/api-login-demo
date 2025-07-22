'use client'

import LoginForm from '@/components/authForm/LoginForm'
import AuthLayout from '@/components/layouts/AuthLayout'

export default function LoginPage() {
  return (
    <AuthLayout
      title="Bienvenido al Centro de Mando"
      subtitle="Inicia sesión para comenzar tu viaje por el universo"
    >
      <LoginForm />
    </AuthLayout>
  )
}