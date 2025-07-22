'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { authSuccess, logout } from '@/lib/features/auth/authSlice'
import { supabase } from '@/lib/api'

export function useAuthCheck(options?: { redirectIfAuthenticated?: boolean }) {
  const { redirectIfAuthenticated = false } = options || {}
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    if (!pathname) return

    async function checkSession() {
      const { data } = await supabase.auth.getUser()

      if (data.user) {
        dispatch(authSuccess(data.user))
        setCheckingAuth(false)

        if (
          redirectIfAuthenticated &&
          (pathname === '/login' || pathname === '/register')
        ) {
          router.push('/dashboard/home')
        }
      } else {
        dispatch(logout())
        setCheckingAuth(false)

        if (!redirectIfAuthenticated && pathname.startsWith('/dashboard')) {
          router.push('/login')
        }
      }
    }

    checkSession()
  }, [dispatch, router, pathname, redirectIfAuthenticated])

  return { checkingAuth, user }
}