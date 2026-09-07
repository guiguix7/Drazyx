import { useEffect, useRef, useState } from "react";

/**
 * Wrapper de "reveal on scroll" — fade + translate pequeno, uma vez,
 * respeitando prefers-reduced-motion (tratado via CSS em global.css).
 */
export default function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <Tag ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} {...rest}>
            {children}
        </Tag>
    );
}