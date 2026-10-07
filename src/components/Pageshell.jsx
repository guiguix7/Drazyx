import PixelMark from './Pixelmark.jsx';

export default function PageShell({
    children,
    eyebrow,
    title,
    lede,
    marker = 'window',
    width = 'wide',
    introClassName = '',
    className = '',
}) {
    const widthClass = width === 'narrow' ? 'page-shell__inner page-shell__inner--narrow' : 'page-shell__inner';

    return (
        <div className={`page-shell grain ${className}`}>
            <div className="page-shell__atmosphere" aria-hidden="true">
                <span className="page-shell__orb page-shell__orb--one" />
                <span className="page-shell__orb page-shell__orb--two" />
                <span className="page-shell__grid" />
            </div>
            <div className={widthClass}>
                <header className={`page-intro ${introClassName}`}>
                    <div className="page-intro__marker" aria-hidden="true">
                        <PixelMark mark={marker} size={18} />
                        <span className="page-intro__line" />
                    </div>
                    <p className="eyebrow eyebrow-accent">{eyebrow}</p>
                    <h1 className="page-title mt-3">{title}</h1>
                    {lede && <p className="lede mt-5">{lede}</p>}
                </header>
                {children}
            </div>
        </div>
    );
}
