// Cover art with a quiet placeholder. Size/shape is controlled by the parent.
export default function Artwork({ src, alt, label = "cover to be added", className = "", priority = false }) {
    return (
        <div className={`artwork ${className}`}>
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    loading={priority ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={priority ? "high" : "auto"}
                />
            ) : (
                <div className="artwork-empty w-full h-full" {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}>
                    {label}
                </div>
            )}
        </div>
    );
}
