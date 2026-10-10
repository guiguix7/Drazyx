import { Link } from 'react-router-dom';
import SEO from '../components/Seo.jsx';
import PageShell from '../components/Pageshell.jsx';
import RoomGlyph from '../components/Roomglyph.jsx';

export default function NotFound() {
    return (
        <PageShell eyebrow="404 / wrong door" title="Nothing here." lede="There's no room at this address. Try another one." marker="cursor" width="narrow">
            <SEO
                title="Page not found"
                description="The requested Drazyx page could not be found."
                path="/404"
                noindex
            />
            <div className="room-file pixel-corners max-w-xl">
                <div className="room-file__bar"><span>system / 404</span><span>path not found</span></div>
                <div className="room-file__body">
                    <RoomGlyph mark="cursor" label="you took a wrong turn" />
                    <p className="font-display text-2xl mt-5">Maybe the interesting door is somewhere else.</p>
                    <div className="mt-7 flex flex-wrap gap-3"><Link to="/" className="btn-primary">Back home</Link><Link to="/music" className="btn-secondary">Music</Link></div>
                </div>
            </div>
        </PageShell>
    );
}
