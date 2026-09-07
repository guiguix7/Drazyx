import { useParams, Link } from "react-router-dom";
import SEO from "../components/Seo.jsx";
import Reveal from "../components/Reval.jsx";
import ReleaseCard from "../components/Releasecard.jsx";
import { releases } from "../data/Releases.js";

export default function Release() {
    const { releaseId } = useParams();
    const release = releases.find((r) => r.id === releaseId);
    const related = releases.filter((r) => r.id !== releaseId);

    if (!release) {
        return (
            <div className="pt-40 pb-24 px-6 text-center">
                <SEO path={`/music/${releaseId}`} title="Release não encontrado" />
                <p className="text-[var(--text-mid)]">Lançamento não encontrado.</p>
                <Link to="/music" className="text-[var(--violet-soft)] hover:underline mt-4 inline-block">
                    Voltar para Music
                </Link>
            </div>
        );
    }

    const credits = Object.entries(release.credits).filter(([, v]) => v);

    return (
        <div className="pt-32 pb-24 px-6">
            <SEO
                path={`/music/${release.id}`}
                title={release.title}
                description={release.description}
            />
            <div className="max-w-4xl mx-auto">
                <Reveal as="div">
                    <p className="font-display text-sm text-[var(--text-low)]">DRAZYX</p>
                    <h1 className="font-display text-3xl sm:text-4xl text-[var(--text-hi)] mt-1">
                        {release.title}
                    </h1>
                    <p className="text-sm text-[var(--text-low)] mt-2">
                        {release.year} · {release.type}
                    </p>
                </Reveal>

                <Reveal as="div" className="mt-10 grid grid-cols-1 sm:grid-cols-[280px_1fr] gap-8">
                    <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#241338] to-[#0c0a14] flex items-center justify-center">
                        {release.coverUrl ? (
                            <img
                                src={release.coverUrl}
                                alt={`Capa de ${release.title}`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-xs text-[var(--text-low)]">[ADD COVER]</span>
                        )}
                    </div>

                    <div>
                        <div className="flex flex-wrap gap-3">
                            <a href={release.spotifyUrl} target="_blank" rel="noreferrer" className="btn-primary px-5 py-2.5 rounded-full text-sm">
                                Spotify
                            </a>
                            {release.youtubeUrl && (
                                <a href={release.youtubeUrl} target="_blank" rel="noreferrer" className="btn-secondary px-5 py-2.5 rounded-full text-sm">
                                    YouTube
                                </a>
                            )}
                            {release.soundcloudUrl && (
                                <a href={release.soundcloudUrl} target="_blank" rel="noreferrer" className="btn-secondary px-5 py-2.5 rounded-full text-sm">
                                    SoundCloud
                                </a>
                            )}
                            {release.appleMusicUrl && (
                                <a href={release.appleMusicUrl} target="_blank" rel="noreferrer" className="btn-secondary px-5 py-2.5 rounded-full text-sm">
                                    Apple Music
                                </a>
                            )}
                        </div>

                        {release.spotifyEmbedUrl && (
                            <div className="mt-6 glass rounded-2xl p-2">
                                <iframe
                                    title={`Player de ${release.title}`}
                                    src={release.spotifyEmbedUrl}
                                    width="100%"
                                    height={152}
                                    style={{ borderRadius: 12, border: 0 }}
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                />
                            </div>
                        )}
                    </div>
                </Reveal>

                <Reveal as="div" className="mt-14">
                    <h2 className="font-display text-xl text-[var(--text-hi)] mb-3">About the Project</h2>
                    <p className="text-[var(--text-mid)] leading-relaxed max-w-2xl">{release.description}</p>
                </Reveal>

                {credits.length > 0 && (
                    <Reveal as="div" className="mt-14">
                        <h2 className="font-display text-xl text-[var(--text-hi)] mb-4">Credits</h2>
                        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-2xl">
                            {credits.map(([role, name]) => (
                                <div key={role}>
                                    <dt className="text-xs text-[var(--text-low)] capitalize">{role}</dt>
                                    <dd className="text-sm text-[var(--text-hi)] mt-1">{name}</dd>
                                </div>
                            ))}
                        </dl>
                    </Reveal>
                )}

                {release.behindTheMusic && (
                    <Reveal as="div" className="mt-14">
                        <h2 className="font-display text-xl text-[var(--text-hi)] mb-3">Behind the Music</h2>
                        <p className="text-[var(--text-mid)] leading-relaxed max-w-2xl">{release.behindTheMusic}</p>
                    </Reveal>
                )}

                {related.length > 0 && (
                    <Reveal as="div" className="mt-20">
                        <h2 className="font-display text-xl text-[var(--text-hi)] mb-6">Related Music</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {related.map((r) => (
                                <ReleaseCard key={r.id} release={r} />
                            ))}
                        </div>
                    </Reveal>
                )}
            </div>
        </div>
    );
}