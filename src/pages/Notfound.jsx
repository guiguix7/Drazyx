import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
            <SEO title="Página não encontrada" />
            <h1 className="font-display text-3xl text-[var(--text-hi)]">404</h1>
            <p className="mt-3 text-[var(--text-mid)]">Essa página não existe.</p>
            <Link to="/" className="mt-6 btn-secondary px-5 py-2.5 rounded-full text-sm">
                Voltar para a Home
            </Link>
        </div>
    );
}