'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const ADMIN_ACCESS_KEY = 'jrcambio_admin_2024'
const STORAGE_KEY = 'jrcambio_admin_access'

export default function AdminAuth({ children }: { children: React.ReactNode }) {
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user has valid access key in localStorage
    const storedKey = localStorage.getItem(STORAGE_KEY)

    if (storedKey === ADMIN_ACCESS_KEY) {
      setHasAccess(true)
    } else {
      // Redirect to home if no access
      router.push('/')
    }

    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!hasAccess) {
    return null
  }

  return <>{children}</>
}
