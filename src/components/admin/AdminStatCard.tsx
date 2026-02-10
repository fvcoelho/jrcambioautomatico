import React from 'react'

interface AdminStatCardProps {
    label: string
    value: string | number
    subValue?: string | number
    subLabel?: string
    icon: React.ReactNode
    iconClassName?: string
}

export const AdminStatCard = ({
    label,
    value,
    subValue,
    subLabel,
    icon,
    iconClassName = 'bg-steel-700/50 text-steel-300'
}: AdminStatCardProps) => {
    return (
        <div className="bg-steel-800/50 backdrop-blur-sm p-4 rounded-xl border border-steel-700">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${iconClassName}`}>
                    {icon}
                </div>
                <div>
                    <p className="text-2xl font-bold text-white">{value}</p>
                    <p className="text-sm text-steel-400">{label}</p>
                    {(subValue !== undefined || subLabel) && (
                        <p className="text-xs text-accent-400 mt-1">
                            {subValue} {subLabel}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
