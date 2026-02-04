import { WhatsAppInteractiveMessage } from './client'

export enum ChatState {
  WELCOME = 'welcome',
  MAIN_MENU = 'main_menu',
  QUOTE_PROJECT_TYPE = 'quote_project_type',
  QUOTE_ROOM_SIZE = 'quote_room_size',
  QUOTE_TIMELINE = 'quote_timeline',
  QUOTE_BUDGET = 'quote_budget',
  QUOTE_PHOTOS = 'quote_photos',
  QUOTE_CONTACT = 'quote_contact',
  QUOTE_CONFIRM = 'quote_confirm',
  SERVICE_INFO = 'service_info',
  PORTFOLIO = 'portfolio',
  HUMAN_HANDOFF = 'human_handoff',
  FAQ = 'faq'
}

export const WELCOME_MESSAGE = `Olá! 👋 Bem-vindo à *JR Câmbio Automático*!

Sou o assistente virtual e estou aqui para ajudar você com soluções em câmbio automático.

Temos mais de 15 anos de experiência em diagnóstico, reparo e manutenção de transmissões automáticas!

Como posso ajudá-lo hoje?`

export const MAIN_MENU_BUTTONS: WhatsAppInteractiveMessage = {
  to: '',
  interactive: {
    type: 'button',
    body: {
      text: WELCOME_MESSAGE
    },
    action: {
      buttons: [
        {
          type: 'reply',
          reply: {
            id: 'request_quote',
            title: '🔧 Agendar Diagnóstico'
          }
        },
        {
          type: 'reply',
          reply: {
            id: 'view_services',
            title: '🚗 Ver Serviços'
          }
        },
        {
          type: 'reply',
          reply: {
            id: 'view_portfolio',
            title: '📸 Ver Trabalhos'
          }
        }
      ]
    }
  }
}

export const SECONDARY_MENU_BUTTONS: WhatsAppInteractiveMessage = {
  to: '',
  interactive: {
    type: 'button',
    body: {
      text: 'Outras opções disponíveis:'
    },
    action: {
      buttons: [
        {
          type: 'reply',
          reply: {
            id: 'talk_human',
            title: '💬 Falar com Atendente'
          }
        },
        {
          type: 'reply',
          reply: {
            id: 'faq',
            title: '❓ Perguntas Frequentes'
          }
        },
        {
          type: 'reply',
          reply: {
            id: 'main_menu',
            title: '🏠 Menu Principal'
          }
        }
      ]
    }
  }
}

export const PROJECT_TYPE_MENU: WhatsAppInteractiveMessage = {
  to: '',
  interactive: {
    type: 'list',
    body: {
      text: 'Perfeito! Vamos agendar seu diagnóstico. 🔧\n\nPrimeiro, qual tipo de serviço você precisa?'
    },
    action: {
      button: 'Selecionar Serviço',
      sections: [
        {
          title: 'Diagnóstico',
          rows: [
            {
              id: 'diagnostico',
              title: 'Diagnóstico',
              description: 'Diagnóstico computadorizado gratuito'
            },
            {
              id: 'conserto',
              title: 'Conserto',
              description: 'Reparo do câmbio automático'
            },
            {
              id: 'retifica',
              title: 'Retífica',
              description: 'Reconstrução completa do câmbio'
            }
          ]
        },
        {
          title: 'Manutenção',
          rows: [
            {
              id: 'troca-oleo',
              title: 'Troca de Óleo ATF',
              description: 'Substituição do fluido de transmissão'
            },
            {
              id: 'revisao',
              title: 'Revisão',
              description: 'Manutenção preventiva do câmbio'
            },
            {
              id: 'multiple',
              title: 'Outros',
              description: 'Outros serviços ou dúvidas'
            }
          ]
        }
      ]
    }
  }
}

export const TIMELINE_MENU: WhatsAppInteractiveMessage = {
  to: '',
  interactive: {
    type: 'button',
    body: {
      text: 'Ótimo! Agora me conte sobre a urgência.\n\nQuando você gostaria de trazer o veículo?'
    },
    action: {
      buttons: [
        {
          type: 'reply',
          reply: {
            id: 'asap',
            title: '🚀 O mais rápido'
          }
        },
        {
          type: 'reply',
          reply: {
            id: '1-2weeks',
            title: '📅 Esta semana'
          }
        },
        {
          type: 'reply',
          reply: {
            id: '1month',
            title: '🗓️ Próxima semana'
          }
        }
      ]
    }
  }
}

export const TIMELINE_EXTENDED_MENU: WhatsAppInteractiveMessage = {
  to: '',
  interactive: {
    type: 'button',
    body: {
      text: 'Outras opções de agendamento:'
    },
    action: {
      buttons: [
        {
          type: 'reply',
          reply: {
            id: '2-3months',
            title: '📊 Em 2 semanas'
          }
        },
        {
          type: 'reply',
          reply: {
            id: 'planning',
            title: '💭 Apenas consultando'
          }
        },
        {
          type: 'reply',
          reply: {
            id: 'back_timeline',
            title: '⬅️ Voltar'
          }
        }
      ]
    }
  }
}

export const BUDGET_MENU: WhatsAppInteractiveMessage = {
  to: '',
  interactive: {
    type: 'list',
    body: {
      text: 'Perfeito! Para melhor atendê-lo, qual seria a faixa de investimento que você tem em mente? 💰\n\n(Lembrando que o diagnóstico é gratuito!)'
    },
    action: {
      button: 'Selecionar Faixa',
      sections: [
        {
          title: 'Faixas de Orçamento',
          rows: [
            {
              id: 'under15k',
              title: 'Até R$ 2.000',
              description: 'Manutenções simples'
            },
            {
              id: '15k-30k',
              title: 'R$ 2.000 - R$ 5.000',
              description: 'Reparos médios'
            },
            {
              id: '30k-60k',
              title: 'R$ 5.000 - R$ 10.000',
              description: 'Reparos complexos'
            },
            {
              id: '60k-150k',
              title: 'Acima de R$ 10.000',
              description: 'Retífica completa'
            },
            {
              id: 'over150k',
              title: 'Não sei informar',
              description: 'Preciso do diagnóstico primeiro'
            }
          ]
        }
      ]
    }
  }
}

export const SERVICES_INFO = `🔧 *Nossos Serviços Especializados*

🔍 *Diagnóstico*
• Diagnóstico computadorizado GRATUITO
• Teste de pressão hidráulica
• Análise do fluido de transmissão
• Relatório detalhado do problema

⚙️ *Reparos e Manutenção*
• Conserto de câmbio automático
• Retífica completa
• Troca de óleo ATF
• Revisão preventiva
• Troca de solenoides e válvulas

💎 *Diferenciais JR Câmbio*
• +15 anos de experiência
• Garantia de 6 meses
• Peças originais
• Diagnóstico gratuito
• Equipe especializada

📞 *Entre em contato:*
• WhatsApp: (11) 94014-7157
• Email: contato@jrcambioautomatico.com.br`

export const FAQ_INFO = `❓ *Perguntas Frequentes*

*🕐 Qual o prazo de reparo?*
Depende do serviço. Troca de óleo: mesmo dia. Consertos: 2-5 dias. Retífica completa: 5-10 dias.

*💰 O diagnóstico é pago?*
Não! O diagnóstico computadorizado é totalmente GRATUITO e sem compromisso.

*🛡️ Vocês oferecem garantia?*
Sim! Garantia de 6 meses em peças e mão de obra para todos os serviços.

*🔧 Trabalham com todas as marcas?*
Sim, atendemos câmbios automáticos de todas as marcas: Honda, Toyota, VW, GM, Ford, BMW, etc.

*🚗 Preciso deixar o carro?*
Para diagnóstico, leva cerca de 1-2 horas. Para reparos, o veículo fica conosco.

*💳 Quais formas de pagamento?*
Cartão, boleto, PIX. Parcelamos em até 12x.`

export function getProjectTypeDescription(projectType: string): string {
  const descriptions: Record<string, string> = {
    diagnostico: 'Diagnóstico Computadorizado - Identificamos o problema com precisão',
    conserto: 'Conserto de Câmbio - Reparos especializados com garantia',
    retifica: 'Retífica Completa - Reconstrução total do câmbio',
    'troca-oleo': 'Troca de Óleo ATF - Fluido novo para melhor performance',
    revisao: 'Revisão de Câmbio - Manutenção preventiva',
    multiple: 'Outros Serviços - Atendimento personalizado'
  }
  return descriptions[projectType] || 'Serviço especializado em câmbio automático'
}

export function getBudgetDescription(budget: string): string {
  const descriptions: Record<string, string> = {
    'under15k': 'Até R$ 2.000',
    '15k-30k': 'R$ 2.000 - R$ 5.000',
    '30k-60k': 'R$ 5.000 - R$ 10.000',
    '60k-150k': 'Acima de R$ 10.000',
    'over150k': 'Não sei informar'
  }
  return descriptions[budget] || budget
}

export function getTimelineDescription(timeline: string): string {
  const descriptions: Record<string, string> = {
    'asap': 'O mais rápido possível',
    '1-2weeks': 'Esta semana',
    '1month': 'Próxima semana',
    '2-3months': 'Em 2 semanas',
    'planning': 'Apenas consultando'
  }
  return descriptions[timeline] || timeline
}
