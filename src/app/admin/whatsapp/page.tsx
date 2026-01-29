'use client'

import { WhatsAppAdminTabs } from '@/components/admin/WhatsAppAdminTabs'

export default function WhatsAppAdminPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">WhatsApp Admin</h1>
        <p className="text-gray-600 mt-2">
          Gerencie conversas, configure o chatbot e monitore a conexão WhatsApp
        </p>
      </div>
      
      <WhatsAppAdminTabs />
    </div>
  )
}