'use client';

import Link from 'next/link';

export default function Landing() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="max-w-4xl w-full text-center">
                    {/* Logo/Title */}
                    <div className="mb-8">
                        <h1 className="text-6xl md:text-8xl text-neon-cyan mb-4 tracking-wider">
                            SERILIST
                        </h1>
                        <p className="text-xl md:text-2xl text-ice-white mb-2">
                            TRACK YOUR SERIES. BUILD YOUR STREAK. NEVER FORGET.
                        </p>
                        <p className="data-label text-cold-gray">
                            FUTURISTIC SERIES TRACKING SYSTEM
                        </p>
                    </div>

                    {/* CTA */}
                    <div className="mb-12">
                        <Link href="/dashboard" className="btn-system text-lg px-12 py-4 inline-block">
                            LAUNCH SYSTEM →
                        </Link>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mt-16">
                        <div className="glass-panel p-6 sharp">
                            <div className="text-4xl mb-3">🔥</div>
                            <h3 className="text-neon-cyan font-bold mb-2">DAILY STREAKS</h3>
                            <p className="text-sm text-cold-gray">
                                Build habits. Track daily. Never break your streak.
                            </p>
                        </div>

                        <div className="glass-panel p-6 sharp">
                            <div className="text-4xl mb-3">📊</div>
                            <h3 className="text-neon-green font-bold mb-2">SMART STATS</h3>
                            <p className="text-sm text-cold-gray">
                                See your progress. Track episodes. Know your numbers.
                            </p>
                        </div>

                        <div className="glass-panel p-6 sharp">
                            <div className="text-4xl mb-3">⚡</div>
                            <h3 className="text-neon-yellow font-bold mb-2">LIGHTNING FAST</h3>
                            <p className="text-sm text-cold-gray">
                                Search instantly. Update quickly. No delays.
                            </p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-16">
                        <div className="glass-panel p-4 sharp">
                            <p className="text-3xl text-neon-cyan font-bold">1000+</p>
                            <p className="data-label">SERIES TRACKED</p>
                        </div>
                        <div className="glass-panel p-4 sharp">
                            <p className="text-3xl text-neon-green font-bold">50K+</p>
                            <p className="data-label">EPISODES LOGGED</p>
                        </div>
                        <div className="glass-panel p-4 sharp">
                            <p className="text-3xl text-neon-yellow font-bold">24/7</p>
                            <p className="data-label">SYSTEM ACTIVE</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="max-w-4xl mx-auto p-8 mb-16">
                <h2 className="text-3xl text-neon-cyan text-center mb-12">HOW IT WORKS</h2>

                <div className="space-y-8">
                    <div className="flex gap-6 items-start">
                        <div className="glass-panel w-16 h-16 flex items-center justify-center text-2xl font-bold text-neon-cyan sharp flex-shrink-0">
                            01
                        </div>
                        <div>
                            <h3 className="text-xl text-ice-white font-bold mb-2">SEARCH ANY SERIES</h3>
                            <p className="text-cold-gray">
                                Find any TV show from our massive database. Breaking Bad, Game of Thrones, or Yolo - we got you.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start">
                        <div className="glass-panel w-16 h-16 flex items-center justify-center text-2xl font-bold text-neon-green sharp flex-shrink-0">
                            02
                        </div>
                        <div>
                            <h3 className="text-xl text-ice-white font-bold mb-2">TRACK YOUR PROGRESS</h3>
                            <p className="text-cold-gray">
                                Mark episodes as watched. See your progress bars fill up. Feel the satisfaction.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start">
                        <div className="glass-panel w-16 h-16 flex items-center justify-center text-2xl font-bold text-neon-yellow sharp flex-shrink-0">
                            03
                        </div>
                        <div>
                            <h3 className="text-xl text-ice-white font-bold mb-2">BUILD YOUR STREAK</h3>
                            <p className="text-cold-gray">
                                Update daily. Build habits. Watch your streak grow. Don't break the chain. 🔥
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <Link href="/dashboard" className="btn-system text-lg px-12 py-4 inline-block">
                        START TRACKING →
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-neon-cyan/20 p-8 text-center">
                <p className="text-xs text-cold-gray">
                    SERILIST v1.0 // BLACK MIRROR DESIGN SYSTEM // MADE IN GHANA 🇬🇭
                </p>
            </div>
        </div>
    );
}