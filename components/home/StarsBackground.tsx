"use client";

import { useState, useEffect } from "react";

export function StarsBackground() {
    const [stars, setStars] = useState({ small: "", medium: "", large: "" });

    useEffect(() => {
        const generateStars = (count: number) => {
            let value = "";
            for (let i = 0; i < count; i++) {
                const x = Math.floor(Math.random() * 2000);
                const y = Math.floor(Math.random() * 2000);
                value += `${x}px ${y}px #FFF, `;
            }
            return value.slice(0, -2);
        };

        setStars({
            small: generateStars(700),
            medium: generateStars(200),
            large: generateStars(100),
        });
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none hidden dark:block overflow-hidden">
            {/* Small Stars */}
            <div
                className="absolute rounded-full"
                style={{
                    width: "1px",
                    height: "1px",
                    background: "transparent",
                    boxShadow: stars.small,
                    animation: "animStar 50s linear infinite",
                }}
            />
            {/* Medium Stars */}
            <div
                className="absolute rounded-full"
                style={{
                    width: "2px",
                    height: "2px",
                    background: "transparent",
                    boxShadow: stars.medium,
                    animation: "animStar 100s linear infinite",
                }}
            />
            {/* Large Stars */}
            <div
                className="absolute rounded-full"
                style={{
                    width: "3px",
                    height: "3px",
                    background: "transparent",
                    boxShadow: stars.large,
                    animation: "animStar 150s linear infinite",
                }}
            />

            <style jsx>{`
        @keyframes animStar {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(-2000px);
          }
        }
      `}</style>
        </div>
    );
}
