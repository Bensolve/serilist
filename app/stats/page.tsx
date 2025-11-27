'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStreak } from '@/hooks/useStreak';

type Status = 'WATCHING' | 'COMPLETED' | 'PLANNING' | 'DROPPED' | 'PAUSED';

interface Series {
    id: number;
    title: string;
    status: Status;
    progress: number;
    totalEpisodes: number;
}

export default function Stats() {
    const [list, setList] = useState<Series[]>([]);
    const { streak } = useStreak();

    useEffect(() => {
        const saved = localStorage.getItem('serilist');
        if (saved) setList(JSON.parse(saved));
    }, []);

    // Calculate stats
    const watching = list.filter(s => s.status === 'WATCHING').length;
    const completed = list.filter(s => s.status === 'COMPLETED').length;
    const planning = list.filter(s => s.status === 'PLANNING').length;
    const dropped = list.filter(s => s.status === 'DROPPED').length;
    const paused = list.filter(s => s.status === 'PAUSED').length;

    const totalEpisodes = list.reduce((sum, s) => sum + (s.progress || 0), 0);
    const avgProgress = list.length > 0
        ? Math.round(list.reduce((sum, s) => {
            const prog = s.totalEpisodes > 0 ? (s.progress / s.totalEpisodes) * 100 : 0;
            return sum + prog;
        }, 0) / list.length)
        : 0;

    const mostWatched = [...list]
        .sort((a, b) => b.progress - a.progress)
        .slice(0, 5);

    return (
        <div className="min-h-screen p-4 md:p-8">
            {/* Header */}
            <div className="glass-panel p-6 mb-6 sharp">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl text-neon-cyan mb-1">STATISTICS</h1>
                        <p className="data-label">COMPREHENSIVE DATA ANALYSIS</p>
                    </div>
                    <Link href="/dashboard" className="btn-system">
                        ← DASHBOARD
                    </Link>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="glass-panel p-6 sharp">
                    <p className="data-label mb-2">TOTAL SERIES</p>
                    <p className="text-4xl font-bold text-neon-cyan">{list.length}</p>
                </div>

                <div className="glass-panel p-6 sharp">
                    <p className="data-label mb-2">EPISODES WATCHED</p>
                    <p className="text-4xl font-bold text-neon-green">{totalEpisodes}</p>
                </div>

                <div className="glass-panel p-6 sharp">
                    <p className="data-label mb-2">CURRENT STREAK</p>
                    <p className="text-4xl font-bold text-neon-yellow">{streak.current} 🔥</p>
                </div>

                <div className="glass-panel p-6 sharp">
                    <p className="data-label mb-2">AVG PROGRESS</p>
                    <p className="text-4xl font-bold text-ice-white">{avgProgress}%</p>
                </div>
            </div>

            {/* Status Breakdown */}
            <div className="glass-panel p-6 mb-6 sharp">
                <h2 className="text-xl text-neon-cyan mb-4">STATUS BREAKDOWN</h2>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-darker flex items-center justify-center sharp">
                                <span className="text-2xl">📺</span>
                            </div>
                            <div>
                                <p className="text-ice-white font-bold">WATCHING</p>
                                <p className="text-xs text-cold-gray">Active series</p>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-neon-green">{watching}</p>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-darker flex items-center justify-center sharp">
                                <span className="text-2xl">✅</span>
                            </div>
                            <div>
                                <p className="text-ice-white font-bold">COMPLETED</p>
                                <p className="text-xs text-cold-gray">Finished series</p>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-neon-cyan">{completed}</p>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-darker flex items-center justify-center sharp">
                                <span className="text-2xl">📋</span>
                            </div>
                            <div>
                                <p className="text-ice-white font-bold">PLANNING</p>
                                <p className="text-xs text-cold-gray">Want to watch</p>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-cold-gray">{planning}</p>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-darker flex items-center justify-center sharp">
                                <span className="text-2xl">⏸️</span>
                            </div>
                            <div>
                                <p className="text-ice-white font-bold">PAUSED</p>
                                <p className="text-xs text-cold-gray">On hold</p>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-neon-yellow">{paused}</p>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-darker flex items-center justify-center sharp">
                                <span className="text-2xl">❌</span>
                            </div>
                            <div>
                                <p className="text-ice-white font-bold">DROPPED</p>
                                <p className="text-xs text-cold-gray">Abandoned</p>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-neon-red">{dropped}</p>
                    </div>
                </div>
            </div>

            {/* Most Watched */}
            {mostWatched.length > 0 && (
                <div className="glass-panel p-6 sharp">
                    <h2 className="text-xl text-neon-cyan mb-4">MOST WATCHED SERIES</h2>
                    <div className="space-y-3">
                        {mostWatched.map((series, idx) => (
                            <div key={series.id} className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-darker flex items-center justify-center sharp">
                                    <span className="text-neon-cyan font-bold">#{idx + 1}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-ice-white font-bold text-sm">{series.title}</p>
                                    <p className="text-xs text-cold-gray">
                                        {series.progress} episodes watched
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-neon-green font-bold">{series.progress}</p>
                                    <p className="text-xs text-cold-gray">EP</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {list.length === 0 && (
                <div className="glass-panel p-12 text-center sharp">
                    <p className="text-2xl text-neon-cyan mb-4">NO DATA TO ANALYZE</p>
                    <p className="text-cold-gray mb-6">Start tracking series to see your stats</p>
                    <Link href="/dashboard" className="btn-system">
                        GO TO DASHBOARD
                    </Link>
                </div>
            )}
        </div>
    );
}