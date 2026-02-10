'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

const STORAGE_KEY = 'jrcambio_admin_access'
const ACCESS_VALUE = 'jrcambio_admin_2024'

export default function AdminAccessPage() {
  const params = useParams<{ uniqueId: string }>()
  const router = useRouter()
  const [stored, setStored] = useState(false)

  useEffect(() => {
    if (!params?.uniqueId) return
    localStorage.setItem(STORAGE_KEY, ACCESS_VALUE)
    setStored(true)
    router.push('/admin')
  }, [params?.uniqueId, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-steel-950 via-charcoal-900 to-steel-950 px-4">
      <div className="max-w-lg w-full bg-steel-800/90 border border-steel-700 rounded-2xl p-8 text-center text-white shadow-xl">
        <h1 className="font-cinzel text-3xl mb-4">Acesso Administrativo</h1>
        <p className="font-montserrat text-steel-200 mb-6">
          {stored ? 'Chave de acesso salva com sucesso.' : 'Salvando chave de acesso...'}
        </p>
        {params?.uniqueId && (
          <p className="text-sm text-steel-400 mb-6">ID: {params.uniqueId}</p>
        )}
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-accent-400 hover:to-accent-500 transition-all duration-300"
        >
          Ir para Admin
        </button>
      </div>
    </div>
  )
}
