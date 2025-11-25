'use client';

import { useState } from 'react';

type Status = 'WATCHING' | 'COMPLETED' | 'PLANNING' | 'DROPPED' | 'PAUSED';

interface TMDBSeries {
    id: number;
    name: string;
    poster_path: string | null;
    first_air_date: string;
    vote_average: number;
}

interface AddSeriesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (series: {
        id: number;
        title: string;
        imageUrl: string;
        status: Status;
        totalEpisodes: number;
        progress: number;
    }) => void;
}

export default function AddSeriesModal({ isOpen, onClose, onAdd }: AddSeriesModalProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<TMDBSeries[]>([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<Status>('PLANNING');

    const search = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/search/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}`
            );
            const data = await res.json();
            setResults(data.results || []);
        } catch {
            alert('Search failed');
        }
        setLoading(false);
    };

    const addSeries = (series: TMDBSeries) => {
        onAdd({
            id: series.id,
            title: series.name,
            imageUrl: series.poster_path ? `https://image.tmdb.org/t/p/w500${series.poster_path}` : '',
            status,
            totalEpisodes: 0,
            progress: 0,
        });
        setQuery('');
        setResults([]);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80" onClick={onClose} />

            <div className="glass-panel p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto relative z-10 sharp">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl text-neon-cyan font-bold">ADD SERIES</h2>
                    <button onClick={onClose} className="text-cold-gray hover:text-white">✕</button>
                </div>

                {/* Search */}
                <form onSubmit={search} className="mb-4">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="SEARCH SERIES..."
                        className="w-full bg-darker border border-neon-cyan/30 text-ice-white px-4 py-2 sharp focus:border-neon-cyan outline-none mb-3"
                    />
                    <button type="submit" disabled={loading} className="btn-system w-full">
                        {loading ? 'SEARCHING...' : 'SEARCH'}
                    </button>
                </form>

                {/* Status Selector */}
                <div className="flex gap-2 mb-4 flex-wrap">
                    {(['WATCHING', 'COMPLETED', 'PLANNING', 'PAUSED', 'DROPPED'] as Status[]).map((s) => (
                        <button
                            key={s}
                            onClick={() => setStatus(s)}
                            className={`px-3 py-1 text-xs font-bold ${status === s ? 'bg-neon-cyan text-black' : 'bg-darker text-cold-gray'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                {/* Results */}
                <div className="space-y-2">
                    {results.map((series) => (
                        <div
                            key={series.id}
                            onClick={() => addSeries(series)}
                            className="flex gap-3 bg-darker p-3 cursor-pointer hover:bg-darker/50 sharp"
                        >
                            <div className="w-12 h-16 bg-black-mirror flex-shrink-0">
                                {series.poster_path && (
                                    <img src={`https://image.tmdb.org/t/p/w92${series.poster_path}`} alt={series.name} className="w-full h-full object-cover" />
                                )}
                            </div>
                            <div>
                                <p className="text-sm text-ice-white font-bold">{series.name}</p>
                                <p className="text-xs text-cold-gray">
                                    {series.first_air_date?.slice(0, 4)} • ⭐ {series.vote_average?.toFixed(1)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}