'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SeriesCard from '@/components/SeriesCard';
import AddSeriesModal from '@/components/AddSeriesModal';
import EditSeriesModal from '@/components/EditSeriesModal';
import { useStreak } from '@/hooks/useStreak';

type Status = 'WATCHING' | 'COMPLETED' | 'PLANNING' | 'DROPPED' | 'PAUSED';

interface Series {
  id: number;
  title: string;
  imageUrl: string;
  status: Status;
  progress: number;
  totalEpisodes: number;
}

export default function Home() {
  const [list, setList] = useState<Series[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState<Series | null>(null);
  const { streak, recordActivity } = useStreak();

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('serilist');
    if (saved) setList(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('serilist', JSON.stringify(list));
  }, [list]);

  const add = (series: Series) => {
    setList([...list, series]);
    recordActivity(); // 🔥 STREAK!
  };

  const save = (updated: Series) => {
    setList(list.map((s) => (s.id === updated.id ? updated : s)));
    recordActivity(); // 🔥 STREAK!
  };

  const del = (id: number) => setList(list.filter((s) => s.id !== id));

  const watching = list.filter((s) => s.status === 'WATCHING');
  const completed = list.filter((s) => s.status === 'COMPLETED');
  const planning = list.filter((s) => s.status === 'PLANNING');

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="glass-panel p-6 mb-6 sharp">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl text-neon-cyan mb-1">SERILIST</h1>
            <p className="data-label">TOTAL SERIES: {list.length}</p>
          </div>
          <div className="flex gap-2">
            <Link href="/stats" className="btn-system">
              📊 STATS
            </Link>
            <button onClick={() => setAddOpen(true)} className="btn-system">
              + ADD SERIES
            </button>
          </div>
        </div>

        {/* STREAK DISPLAY 🔥 */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-darker p-3 sharp">
            <p className="data-label mb-1">CURRENT STREAK</p>
            <p className="text-2xl font-bold text-neon-cyan">{streak.current} 🔥</p>
          </div>
          <div className="bg-darker p-3 sharp">
            <p className="data-label mb-1">LONGEST STREAK</p>
            <p className="text-2xl font-bold text-neon-green">{streak.longest} 🏆</p>
          </div>
          <div className="bg-darker p-3 sharp">
            <p className="data-label mb-1">LAST ACTIVITY</p>
            <p className="text-xs text-cold-gray mt-1">
              {streak.lastActivity ? new Date(streak.lastActivity).toLocaleDateString() : 'NONE'}
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {list.length === 0 && (
        <div className="glass-panel p-12 text-center sharp">
          <p className="text-2xl text-neon-cyan mb-4">NO SERIES TRACKED</p>
          <button onClick={() => setAddOpen(true)} className="btn-system">
            ADD YOUR FIRST SERIES
          </button>
        </div>
      )}

      {/* Watching */}
      {watching.length > 0 && (
        <div className="mb-8">
          <p className="data-label mb-4">WATCHING ({watching.length})</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {watching.map((s) => (
              <SeriesCard
                key={s.id}
                {...s}
                onClick={() => {
                  setSelected(s);
                  setEditOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed */}
      {completed.length > 0 && (
        <div className="mb-8">
          <p className="data-label mb-4">COMPLETED ({completed.length})</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {completed.map((s) => (
              <SeriesCard
                key={s.id}
                {...s}
                onClick={() => {
                  setSelected(s);
                  setEditOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Planning */}
      {planning.length > 0 && (
        <div className="mb-8">
          <p className="data-label mb-4">PLANNING ({planning.length})</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {planning.map((s) => (
              <SeriesCard
                key={s.id}
                {...s}
                onClick={() => {
                  setSelected(s);
                  setEditOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <AddSeriesModal isOpen={addOpen} onClose={() => setAddOpen(false)} onAdd={add} />
      <EditSeriesModal
        series={selected}
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={save}
        onDelete={del}
      />
    </div>
  );
}