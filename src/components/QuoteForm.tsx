'use client'

import { useState } from 'react'

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    projectType: '',
    roomSize: '',
    timeline: '',
    budget: '',
    description: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Quote request submitted:', formData)
    setSubmitted(true)
    setIsSubmitting(false)
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-green-800 mb-4">Solicitação Enviada</h3>
        <p className="text-green-700 mb-6">
          Obrigado pelo seu interesse na JR Câmbio Automático. Analisaremos sua solicitação e entraremos em contato em até 24 horas
          para agendar uma avaliação técnica.
        </p>
        <button 
          onClick={() => {
            setSubmitted(false)
            setFormData({
              name: '', email: '', phone: '', address: '', projectType: '',
              roomSize: '', timeline: '', budget: '', description: ''
            })
          }}
          data-track-id="quote-form-reset"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Enviar Outra Solicitação
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nome Completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Seu nome completo"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Endereço de E-mail *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="seu@email.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Número de Telefone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="(11) 97182-9629"
          />
        </div>
        
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
            Serviço Desejado *
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            value={formData.projectType}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecione o serviço</option>
            <option value="diagnostico">Diagnóstico Computadorizado</option>
            <option value="conserto">Conserto de Câmbio</option>
            <option value="retifica">Retífica Completa</option>
            <option value="troca-oleo">Troca de Óleo ATF</option>
            <option value="revisao">Revisão de Câmbio</option>
            <option value="manutencao">Manutenção Preventiva</option>
            <option value="other">Outros Serviços</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          Veículo (Marca/Modelo/Ano)
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ex: Honda Civic 2020"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="roomSize" className="block text-sm font-medium text-gray-700 mb-2">
            Quilometragem
          </label>
          <input
            type="text"
            id="roomSize"
            name="roomSize"
            value={formData.roomSize}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: 80.000 km"
          />
        </div>
        
        <div>
          <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
            Quando deseja atendimento
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecione o prazo</option>
            <option value="asap">O mais rápido possível</option>
            <option value="1-2weeks">1-2 semanas</option>
            <option value="1month">Em até 1 mês</option>
            <option value="2-3months">2-3 meses</option>
            <option value="planning">Apenas planejando</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
            Faixa de Investimento Estimado
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecione a faixa</option>
            <option value="under2k">Até R$ 2.000</option>
            <option value="2k-5k">R$ 2.000 - R$ 5.000</option>
            <option value="5k-10k">R$ 5.000 - R$ 10.000</option>
            <option value="over10k">Acima de R$ 10.000</option>
            <option value="prefer-not">Prefiro não informar</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Descrição do Problema
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Descreva os sintomas ou problemas que você está enfrentando com o câmbio..."
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>O que acontece agora?</strong> Analisaremos sua solicitação e entraremos em contato em até 24 horas
          para agendar uma avaliação técnica, sem compromisso.
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        data-track-id="quote-form-submit"
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Enviando...' : 'Solicitar Avaliação'}
      </button>
    </form>
  )
}
