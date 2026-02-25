'use client';

import { Trophy } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';

export default function UserLevelBadge() {
    const { level, progress, title } = useGamification();

    return (
        <div className="flex flex-col items-end mr-4">
            {/* Level Badge */}
            <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                    {title}
                </span>
                <div className="px-2 py-0.5 bg-[#4F7EFF]/10 border border-[#4F7EFF]/30 rounded text-[#4F7EFF] text-xs font-bold font-orbitron flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    LVL {level}
                </div>
            </div>

            {/* XP Progress Bar */}
            <div className="w-24 h-1 bg-[#ffffff]/10 rounded-full overflow-hidden">
                <div
                    className="h-full bg-[#4F7EFF] shadow-[0_0_10px_#4F7EFF]"
                    style={{ width: `${progress}%`, transition: 'width 1s ease-out' }}
                />
            </div>
        </div>
    );
}
