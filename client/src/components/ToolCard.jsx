import React from 'react';
import { ArrowRight } from 'lucide-react';

const ToolCard = ({ icon, title, description, isNew }) => {
    return (
        <div className="bg-card border border-border rounded-lg p-5 flex items-start gap-4 hover:bg-cardHover transition-colors cursor-pointer group">
            <div className="p-2 bg-background rounded-md text-text-secondary group-hover:text-brand-end transition-colors">
                {icon}
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-white">{title}</h4>
                    {isNew && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold bg-brand-start/20 text-brand-start rounded uppercase">
                            New
                        </span>
                    )}
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">{description}</p>
            </div>
            <ArrowRight size={16} className="text-text-secondary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
        </div>
    );
};

export default ToolCard;
