'use client';

import { useState, useEffect } from 'react';

type Status = 'WATCHING' | 'COMPLETED' | 'PLANNING' | 'DROPPED' | 'PAUSED';

interface Series {
    id: number;
    title: string;
    imageUrl: string;
    status: Status;
    progress: number;
    totalEpisodes: number;
}

interface EditSeriesModalProps {
    series: Series | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (series: Series) => void;
    onDelete: (id: number) => void;
}

export default function EditSeriesModal({ series, isOpen, onClose, onSave, onDelete }: EditSeriesModalProps) {
    const [status, setStatus] = useState<Status>('PLANNING');
    const [progress, setProgress] = useState(0);
    const [totalEpisodes, setTotalEpisodes] = useState(0);

    useEffect(() => {
        if (series) {
            setStatus(series.status);
            setProgress(series.progress);
            setTotalEpisodes(series.totalEpisodes);
        }
    }, [series]);

    if (!isOpen || !series) return null;

    const save = () => {
        onSave({ ...series, status, progress, totalEpisodes });
        onClose();
    };

    const deleteSeries = () => {
        if (confirm('DELETE THIS SERIES?')) {
            onDelete(series.id);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80" onClick={onClose} />

            <div className="glass-panel p-6 w-full max-w-md relative z-10 sharp">
                <h2 className="text-xl text-neon-cyan font-bold mb-4">{series.title}</h2>

                {/* Status */}
                <p className="data-label mb-2">STATUS</p>
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

                {/* Episodes */}
                <p className="data-label mb-2">TOTAL EPISODES</p>
                <input
                    type="number"
                    value={totalEpisodes}
                    onChange={(e) => setTotalEpisodes(Number(e.target.value))}
                    className="w-full bg-darker border border-neon-cyan/30 text-ice-white px-4 py-2 sharp mb-4"
                />

                {/* Progress */}
                <p className="data-label mb-2">EPISODES WATCHED</p>
                <div className="flex gap-2 mb-4">
                    <button onClick={() => setProgress(Math.max(0, progress - 1))} className="btn-system">-</button>
                    <input
                        type="number"
                        value={progress}
                        onChange={(e) => setProgress(Number(e.target.value))}
                        className="flex-1 bg-darker border border-neon-cyan/30 text-ice-white px-4 py-2 sharp text-center"
                    />
                    <button onClick={() => setProgress(progress + 1)} className="btn-system">+</button>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button onClick={save} className="btn-system flex-1">SAVE</button>
                    <button onClick={deleteSeries} className="btn-system-danger px-4">DELETE</button>
                </div>
            </div>
        </div>
    );
}