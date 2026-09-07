import { Link } from "react-router-dom";

export default function ReleaseCard({ release }) {
    return (
        <Link
            to={`/music/${release.id}`}
            className="card-hover glass rounded-2xl overflow-hidden block group"
        >
            <div className="aspect-square bg-gradient-to-br from-[#241338] to-[#0c0a14] relative flex items-center justify-center">
                {release.coverUrl ? (
                    <img
                        src={release.coverUrl}
                        alt={`Capa de ${release.title}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <span className="text-xs text-[var(--text-low)]">[ADD COVER]</span>
                )}
            </div>
            <div className="p-5">
                <h3 className="font-display text-lg text-[var(--text-hi)] leading-tight">
                    {release.title}
                </h3>
                <p className="text-sm text-[var(--text-low)] mt-1">
                    {release.type} · {release.year}
                </p>
                <span className="inline-block mt-3 text-sm text-[var(--violet-soft)] group-hover:underline">
                    Listen
                </span>
            </div>
        </Link>
    );
}