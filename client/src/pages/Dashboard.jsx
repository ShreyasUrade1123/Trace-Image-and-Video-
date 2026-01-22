import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import ActionCard from '../components/ActionCard';
import ToolCard from '../components/ToolCard';
import UploadModal from '../components/UploadModal';
import { Video, Upload, FileText, Scissors, Globe, Wand2, Folder } from 'lucide-react';

const Dashboard = () => {
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    return (
        <DashboardLayout>
            <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />

            <div className="p-8 max-w-7xl mx-auto space-y-10">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome back, User</h1>
                    <p className="text-text-secondary">Create engaging documentation in minutes.</p>
                </div>

                {/* Action Grid */}
                <section>
                    <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">Create New</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ActionCard
                            icon={<Video size={24} />}
                            title="Record Screen"
                            description="Capture your screen and voice to generate a guide automatically."
                            gradient
                        />
                        <ActionCard
                            icon={<Upload size={24} />}
                            title="Upload Video"
                            description="Import an existing video file to process with AI."
                            onClick={() => setIsUploadOpen(true)}
                        />
                        <ActionCard
                            icon={<FileText size={24} />}
                            title="Paste Script"
                            description="Start with a script and let AI generate the visuals (Coming Soon)."
                        />
                    </div>
                </section>

                {/* AI Tools Grid */}
                <section>
                    <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">AI Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <ToolCard
                            icon={<Scissors size={20} />}
                            title="Smart Cuts"
                            description="Remove silences and filler words automatically."
                            isNew
                        />
                        <ToolCard
                            icon={<Wand2 size={20} />}
                            title="Auto-Update"
                            description="Detect UI changes and refresh your docs."
                        />
                        <ToolCard
                            icon={<Globe size={20} />}
                            title="Translator"
                            description="Translate video and text into 30+ languages."
                        />
                    </div>
                </section>

                {/* Recent Projects (Empty State) */}
                <section>
                    <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">Recent Projects</h2>
                    <div className="bg-card/30 border border-border border-dashed rounded-xl h-64 flex flex-col items-center justify-center relative overflow-hidden">
                        {/* Radar Effect Background */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                            <div className="w-96 h-96 border border-brand-start/30 rounded-full animate-ping [animation-duration:3s]"></div>
                            <div className="w-64 h-64 border border-brand-start/40 rounded-full absolute"></div>
                            <div className="w-32 h-32 border border-brand-start/50 rounded-full absolute"></div>
                        </div>

                        <div className="relative z-10 text-center">
                            <div className="w-16 h-16 bg-background rounded-full border border-border flex items-center justify-center mx-auto mb-4 shadow-xl">
                                <Folder size={32} className="text-brand-end" />
                            </div>
                            <h3 className="text-lg font-medium text-white mb-1">No projects found</h3>
                            <p className="text-text-secondary text-sm">Choose an option above to create your first project</p>
                        </div>
                    </div>
                </section>

            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
