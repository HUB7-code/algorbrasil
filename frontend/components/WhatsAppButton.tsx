import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
    // Phone number from documentation
    const phoneNumber = '558599851769';
    const message = 'Olá! Gostaria de saber mais sobre a ALGOR e como me tornar um membro.'; // Default message

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group flex items-center justify-end"
            aria-label="Fale conosco no WhatsApp"
        >
            {/* Tooltip / Label */}
            <div className="mr-4 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                <div className="glass-panel px-4 py-2 rounded-lg border border-[#00FF94]/30 shadow-[0_0_15px_rgba(0,255,148,0.2)]">
                    <span className="text-gray-200 text-sm font-medium whitespace-nowrap">
                        Fale conosco agora
                    </span>
                </div>
            </div>

            {/* Button */}
            <div className="relative">
                {/* Ping Animation */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#00FF94] opacity-20 animate-ping duration-1000 group-hover:duration-500"></span>

                {/* Main Circle */}
                <div className="relative w-14 h-14 bg-[#0A1A2F]/80 backdrop-blur-md border border-[#00FF94]/50 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,255,148,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00FF94] group-hover:border-[#00FF94]">
                    <MessageCircle
                        className="w-7 h-7 text-[#00FF94] group-hover:text-[#0A1A2F] transition-colors duration-300"
                        strokeWidth={2.5}
                    />
                </div>

                {/* Notification Dot */}
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 border-2 border-[#0A1A2F]"></span>
            </div>
        </a>
    );
};

export default WhatsAppButton;
