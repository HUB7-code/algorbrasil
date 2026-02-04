'use client';

import { useState, useEffect } from 'react';

// Tabela de XP para Níveis
const LEVEL_THRESHOLDS = [
    0,      // Nível 1
    100,    // Nível 2
    300,    // Nível 3
    600,    // Nível 4
    1000,   // Nível 5 (Elite)
];

const LEVEL_TITLES = [
    'Iniciante',
    'Aprendiz',
    'Analista',
    'Especialista',
    'Mestre',
    'Lenda'
];

interface GamificationState {
    xp: number;
    level: number;
    nextLevelXp: number;
    progress: number; // 0-100%
    addXp: (amount: number) => void;
    title: string;
}

export function useGamification() {
    // Inicializa com valores seguros para SSR
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [showLevelUp, setShowLevelUp] = useState(false);

    // Carregar do LocalStorage apenas no cliente
    useEffect(() => {
        const savedXp = localStorage.getItem('algor_xp');
        if (savedXp) {
            const parsedXp = parseInt(savedXp, 10);
            setXp(parsedXp);
            setLevel(calculateLevel(parsedXp));
        }
    }, []);

    const calculateLevel = (currentXp: number) => {
        let currentLevel = 1;
        for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
            if (currentXp >= LEVEL_THRESHOLDS[i]) {
                currentLevel = i + 1;
            } else {
                break;
            }
        }
        return currentLevel;
    };

    const addXp = (amount: number) => {
        const newXp = xp + amount;
        setXp(newXp);
        localStorage.setItem('algor_xp', newXp.toString());

        const newLevel = calculateLevel(newXp);
        if (newLevel > level) {
            setLevel(newLevel);
            setShowLevelUp(true);
            setTimeout(() => setShowLevelUp(false), 5000); // Esconde após 5s
        }
    };

    // Cálculos derivados
    const currentLevelThreshold = LEVEL_THRESHOLDS[level - 1] || 0;
    const nextLevelThreshold = LEVEL_THRESHOLDS[level] || (LEVEL_THRESHOLDS[level - 1] * 2);
    const xpNeededForNextLevel = nextLevelThreshold - currentLevelThreshold;
    const xpInCurrentLevel = xp - currentLevelThreshold;
    const progress = Math.min(100, Math.max(0, (xpInCurrentLevel / xpNeededForNextLevel) * 100));
    const title = LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)];

    return {
        xp,
        level,
        nextLevelXp: nextLevelThreshold,
        progress,
        addXp,
        title,
        showLevelUp,
        setShowLevelUp
    };
}
