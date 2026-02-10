import React from 'react'

interface AdminPageWrapperProps {
    children: React.ReactNode
    className?: string
}

export const AdminPageWrapper = ({ children, className = '' }: AdminPageWrapperProps) => {
    return (
        <div className={`min-h-screen p-6 sm:p-8 ${className}`}>
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </div>
    )
}
