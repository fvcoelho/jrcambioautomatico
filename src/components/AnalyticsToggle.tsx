'use client'

import { useState, useEffect } from 'react'

export default function AnalyticsToggle() {
    const [isEnabled, setIsEnabled] = useState(true)

    useEffect(() => {
        const storedValue = localStorage.getItem('analytics_enabled')
        if (storedValue === 'false') {
            setIsEnabled(false)
        }
    }, [])

    const toggleAnalytics = () => {
        const newValue = !isEnabled
        setIsEnabled(newValue)
        localStorage.setItem('analytics_enabled', newValue.toString())

        // Optional: Refresh page to apply changes or show a message
        if (!newValue) {
            console.log('Analytics disabled')
        } else {
            console.log('Analytics enabled')
        }
    }

    return (
        <div className="flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
            <span className="text-xs text-white/60 font-montserrat uppercase tracking-widest">
                Analytics
            </span>
            <button
                onClick={toggleAnalytics}
                className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isEnabled ? 'bg-accent-500' : 'bg-steel-700'
                    }`}
                aria-pressed={isEnabled}
            >
                <span className="sr-only">Habilitar analytics</span>
                <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                />
            </button>
            <span className={`text-xs font-medium font-montserrat ${isEnabled ? 'text-accent-400' : 'text-white/40'}`}>
                {isEnabled ? 'ON' : 'OFF'}
            </span>
        </div>
    )
}
