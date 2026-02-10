import React from 'react'

interface AdminHeaderProps {
    title: string
    description?: string
    actions?: React.ReactNode
    className?: string
}

export const AdminHeader = ({ title, description, actions, className = '' }: AdminHeaderProps) => {
    return (
        <div className={`mb-8 ${className}`}>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">{title}</h1>
                    {description && (
                        <p className="text-steel-400 mt-1">
                            {description}
                        </p>
                    )}
                </div>
                {actions && (
                    <div className="flex gap-4 items-center whitespace-nowrap">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    )
}
