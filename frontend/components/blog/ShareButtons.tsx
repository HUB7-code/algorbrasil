"use client";

import React, { useState } from 'react';
import { Twitter, Linkedin, Facebook, Copy, Check } from 'lucide-react';

export default function ShareButtons() {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = async () => {
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = (platform: 'twitter' | 'linkedin' | 'facebook') => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);

        const shareUrls = {
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`
        };

        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    };

    return (
        <div className="fixed top-1/2 -translate-y-1/2 right-6 z-50 hidden xl:block">
            <div className="flex flex-col gap-3">
                <button
                    onClick={() => handleShare('twitter')}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#1DA1F2]/50 hover:bg-[#1DA1F2]/10 text-gray-400 hover:text-[#1DA1F2] transition-all"
                    aria-label="Compartilhar no Twitter"
                >
                    <Twitter className="w-5 h-5" />
                </button>
                <button
                    onClick={() => handleShare('linkedin')}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#0077B5]/50 hover:bg-[#0077B5]/10 text-gray-400 hover:text-[#0077B5] transition-all"
                    aria-label="Compartilhar no LinkedIn"
                >
                    <Linkedin className="w-5 h-5" />
                </button>
                <button
                    onClick={() => handleShare('facebook')}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10 text-gray-400 hover:text-[#1877F2] transition-all"
                    aria-label="Compartilhar no Facebook"
                >
                    <Facebook className="w-5 h-5" />
                </button>
                <button
                    onClick={handleCopyLink}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#00FF94]/50 hover:bg-[#00FF94]/10 text-gray-400 hover:text-[#00FF94] transition-all"
                    aria-label="Copiar link"
                >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
            </div>
        </div>
    );
}
