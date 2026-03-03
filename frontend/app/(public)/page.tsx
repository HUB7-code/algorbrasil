'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const HomePageContent = dynamic(() => import('@/components/home/HomePageContent'), {
    ssr: false,
    loading: () => <div className="w-full min-h-screen bg-[#0B0F1E]" />
});

export default function Home() {
    return <HomePageContent />;
}
