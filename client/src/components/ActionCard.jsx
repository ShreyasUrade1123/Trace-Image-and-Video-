import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const ActionCard = ({ icon, title, description, onClick, gradient }) => {
    return (
        <div
            onClick={onClick}
            className="group relative overflow-hidden bg-card border border-border rounded-xl p-6 cursor-pointer hover:border-brand-start/50 transition-all duration-300"
        >
            <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300",
                gradient ? "bg-gradient-to-br from-brand-start to-brand-end" : "bg-white"
            )} />

            <div className="relative z-10 flex flex-col h-full">
                <div className="mb-4 p-3 bg-background rounded-lg w-fit text-brand-start">
                    {icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-text-secondary">{description}</p>
            </div>
        </div>
    );
};

export default ActionCard;
