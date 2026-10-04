import { Link } from "react-router-dom";
import SEO from "../components/Seo.jsx";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-start justify-center px-6 max-w-5xl mx-auto">
            <SEO title="Page not found" path="/404" noindex />
            <p className="eyebrow">404</p>
            <h1 className="page-title mt-3">Wrong door.</h1>
            <p className="lede mt-4">There's nothing in this room. Try another one.</p>
            <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/" className="btn-primary">Back home</Link>
                <Link to="/music" className="btn-secondary">Music</Link>
            </div>
        </div>
    );
}
