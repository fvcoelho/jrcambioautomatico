import React from 'react'

interface AdminCardProps {
    children: React.ReactNode
    className?: string
    title?: string
    description?: string
}

export const AdminCard = ({ children, className = '', title, description }: AdminCardProps) => {
    return (
        <div className={`bg-steel-800/50 backdrop-blur-sm rounded-xl border border-steel-700 p-6 ${className}`}>
            {(title || description) && (
                <div className="mb-6">
                    {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
                    {description && <p className="text-sm text-steel-400 mt-1">{description}</p>}
                </div>
            )}
            {children}
        </div>
    )
}
