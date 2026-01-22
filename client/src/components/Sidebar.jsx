import React from 'react';
import { Home, Folder, Video, RefreshCw, Users, BarChart2, Settings, Trash2, Plus } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-sidebar border-r border-border flex flex-col text-text-primary">
            {/* Header */}
            <div className="p-6 flex items-center justify-between">
                <h1 className="text-xl font-bold bg-gradient-to-r from-brand-start to-brand-end bg-clip-text text-transparent">Clueso</h1>
                {/* Collapse icon placeholder */}
            </div>

            {/* Primary Action */}
            <div className="px-4 mb-6">
                <button className="w-full py-3 px-4 bg-gradient-to-r from-brand-start to-brand-end rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                    <Plus size={20} />
                    New video
                </button>
            </div>

            {/* Search Placeholder */}
            <div className="px-4 mb-6">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-start"
                />
            </div>

            {/* Main Nav */}
            <nav className="flex-1 px-4 space-y-1">
                <NavItem icon={<Home size={18} />} label="Home" active />
                <NavItem icon={<Folder size={18} />} label="All Projects" />
                <NavItem icon={<Video size={18} />} label="Video Templates" />
                <NavItem icon={<RefreshCw size={18} />} label="Auto-update" />
                <NavItem icon={<Users size={18} />} label="Team" />
                <NavItem icon={<BarChart2 size={18} />} label="Analytics" />
            </nav>

            {/* Footer Nav */}
            <div className="px-4 py-4 border-t border-border mt-auto">
                <NavItem icon={<Settings size={18} />} label="Settings" />
                <NavItem icon={<Trash2 size={18} />} label="Trash" />

                {/* User Profile */}
                <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-600"></div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">User Name</p>
                        <p className="text-xs text-text-secondary truncate">user@example.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const NavItem = ({ icon, label, active }) => {
    return (
        <div className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors",
            active ? "bg-card border-l-2 border-brand-start text-white" : "text-text-secondary hover:bg-cardHover hover:text-white"
        )}>
            {icon}
            <span className="text-sm">{label}</span>
        </div>
    );
};

export default Sidebar;
