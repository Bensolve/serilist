import Image from 'next/image';

type Status = 'WATCHING' | 'COMPLETED' | 'PLANNING' | 'DROPPED' | 'PAUSED';

interface SeriesCardProps {
    id: number;
    title: string;
    imageUrl: string;
    status: Status;
    progress?: number;
    totalEpisodes: number;
    onClick?: () => void;
}

const statusStyles: Record<Status, string> = {
    WATCHING: 'status-watching',
    COMPLETED: 'status-completed',
    PLANNING: 'status-planning',
    DROPPED: 'status-dropped',
    PAUSED: 'status-paused',
};

export default function SeriesCard({
    title,
    imageUrl,
    status,
    progress = 0,
    totalEpisodes,
    onClick,
}: SeriesCardProps) {
    const progressPercent = totalEpisodes > 0 ? (progress / totalEpisodes) * 100 : 0;

    return (
        <div
            onClick={onClick}
            className="glass-panel cursor-pointer hover:glass-panel-hover transition-all scan-effect sharp"
        >
            {/* Image */}
            <div className="relative aspect-[2/3] bg-darker overflow-hidden">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-cold-gray">
                        NO IMAGE
                    </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-2 left-2">
                    <span className={`${statusStyles[status]} px-2 py-1 text-xs font-bold`}>
                        {status}
                    </span>
                </div>
            </div>

            {/* Info */}
            <div className="p-3">
                <h3 className="text-sm text-ice-white font-bold mb-2 line-clamp-2">
                    {title}
                </h3>

                {/* Progress */}
                {totalEpisodes > 0 && (
                    <>
                        <p className="data-label mb-1">
                            EP {progress}/{totalEpisodes} • {Math.round(progressPercent)}%
                        </p>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}