'use client'

import RegisterForm from '@/components/authForm/RegisterForm'
import AuthLayout from '@/components/layouts/AuthLayout'

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Crea tu cuenta estelar"
      subtitle="Únete a la misión y accede a tu panel espacial"
    >
      <RegisterForm />
    </AuthLayout>
  )
}