import React from "react";

export function Logo({ className = "w-8 h-8", ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <path
                d="M8 8V24H12V18H20V24H24V8H20V14H12V8H8Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <path
                d="M24 8L28 4V20L24 24V8Z"
                fill="currentColor"
                fillOpacity="0.5"
                stroke="currentColor"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <path
                d="M12 8L16 4V10L12 14V8Z"
                fill="currentColor"
                fillOpacity="0.5"
                stroke="currentColor"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <path
                d="M8 8L12 4H20L16 8H8Z"
                fill="currentColor"
                fillOpacity="0.25"
                stroke="currentColor"
                strokeOpacity="0.25"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <path
                d="M20 8L24 4H28L24 8H20Z"
                fill="currentColor"
                fillOpacity="0.25"
                stroke="currentColor"
                strokeOpacity="0.25"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <path
                d="M12 18L16 14H24L20 18H12Z"
                fill="currentColor"
                fillOpacity="0.25"
                stroke="currentColor"
                strokeOpacity="0.25"
                strokeWidth="2"
                strokeLinejoin="round"
            />
        </svg>
    );
}
