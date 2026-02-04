import { Metadata } from 'next'
import ProjectManagement from './ProjectManagement'

export const metadata: Metadata = {
  title: 'Gerenciar Projetos | Admin | JR Câmbio Automático',
  description: 'Adicionar e gerenciar projetos do portfólio',
}

export default function ProjectsAdminPage() {
  return <ProjectManagement />
}