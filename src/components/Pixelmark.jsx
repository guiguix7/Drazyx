const MARKS = {
    star: [
        'M6 0v4', 'M6 8v4', 'M0 6h4', 'M8 6h4',
        'M1.76 1.76l2.83 2.83', 'M7.41 7.41l2.83 2.83',
        'M10.24 1.76L7.41 4.59', 'M4.59 7.41l-2.83 2.83',
    ],
    moon: ['M9.5 1.5A4.5 4.5 0 1 0 10.5 9 3.7 3.7 0 0 1 9.5 1.5Z'],
    window: ['M1 1h10v10H1z', 'M6 1v10', 'M1 6h10'],
    monitor: ['M1 2h10v7H1z', 'M4 11h4', 'M6 9v2'],
    headphones: ['M2 7a4 4 0 0 1 8 0', 'M2 7v3H1V8a1 1 0 0 1 1-1', 'M10 7v3h1V8a1 1 0 0 0-1-1'],
    cursor: ['M2 1l7 5-3 1 2 3-1.4.8-2-3L2 10V1z'],
    folder: ['M1 3h4l1 2h5v6H1z'],
    heart: ['M6 10.8 1.6 6.5A2.8 2.8 0 0 1 5.6 2.6L6 3l.4-.4a2.8 2.8 0 0 1 4 3.9L6 10.8Z'],
};

export default function PixelMark({ mark = 'star', size = 12, className = '' }) {
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
            focusable="false"
        >
            {paths.map((path, index) => <path key={index} d={path} />)}
        </svg>
    );
}
