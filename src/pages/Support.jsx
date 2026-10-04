import { Link } from "react-router-dom";
import SEO from "../components/Seo.jsx";
import Reveal from "../components/Reval.jsx";
import SupportCard from "../components/Supportcard.jsx";
import { supportLinks } from "../data/Sociallinks.js";

// Only destinations with a real link are shown. Add one in
// data/Sociallinks.js (supportLinks) and it appears here automatically.
const options = [
    { key: "bandcamp", title: "Bandcamp", description: "Buy and collect the music directly. The most direct way to support it.", featured: true },
    { key: "buyMeACoffee", title: "Buy Me a Coffee", description: "A one-time thank-you." },
    { key: "koFi", title: "Ko-fi", description: "Another way to leave a one-time tip." },
    { key: "pix", title: "Pix", description: "Direct support via Pix." },
].filter((o) => supportLinks[o.key]);

export default function Support() {
    return (
        <div className="pt-32 pb-24 px-6">
            <SEO
                path="/support"
                title="Support"
                description="If you like what Drazyx makes and want to help him keep making it, here's how."
            />
            <div className="max-w-3xl mx-auto">
                <Reveal as="header" className="mb-12">
                    <p className="eyebrow">if you want to</p>
                    <h1 className="page-title mt-3">Support</h1>
                    <p className="lede mt-5">
                        If you like what I make and want to help me keep making it, there are a few ways. Listening and sharing already count.
                    </p>
                </Reveal>

                <Reveal as="div" className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {options.map((o) => (
                        <SupportCard key={o.key} title={o.title} description={o.description} href={supportLinks[o.key]} featured={o.featured} />
                    ))}
                </Reveal>

                <Reveal as="div" className="mt-14 flex flex-wrap gap-x-8 gap-y-3 text-sm">
                    <Link to="/music" className="link-arrow">Keep listening <span aria-hidden="true">→</span></Link>
                    <Link to="/the-room" className="link-arrow">Step into the room <span aria-hidden="true">→</span></Link>
                </Reveal>
            </div>
        </div>
    );
}
