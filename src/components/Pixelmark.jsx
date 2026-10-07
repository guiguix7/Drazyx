const MARKS = {
    star: [
        "M6 0v4",
        "M6 8v4",
        "M0 6h4",
        "M8 6h4",
        "M1.76 1.76l2.83 2.83",
        "M7.41 7.41l2.83 2.83",
        "M10.24 1.76L7.41 4.59",
        "M4.59 7.41l-2.83 2.83",
    ],
    moon: ["M9.5 1.5A4.5 4.5 0 1 0 10.5 9 3.7 3.7 0 0 1 9.5 1.5Z"],
    window: ["M1 1h10v10H1z", "M6 1v10", "M1 6h10"],
};

export default function PixelMark({ mark = "star", size = 12, className = "" }) {
    const paths = MARKS[mark] || MARKS.star;

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="square"
            strokeLinejoin="miter"
            className={className}
            aria-hidden="true"
        >
            {paths.map((path, index) => (
                <path key={index} d={path} />
            ))}
        </svg>
    );
}
