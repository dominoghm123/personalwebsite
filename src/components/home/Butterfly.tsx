'use client';

import styles from './Butterfly.module.css';

interface ButterflyProps {
    size: 'large' | 'small';
}

/**
 * 🎓 Butterfly Component
 * Strictly following DESIGN_SPEC Section 2.2 and 3.1
 * Purpose: Replicate the hand-drawn "Crayon" butterfly with SVG filters.
 */
export default function Butterfly({ size }: ButterflyProps) {
    const isLarge = size === 'large';

    // 🎓 这里的设计决策：使用 feTurbulence + feDisplacementMap 实现「蜡笔」般的不规则边缘。
    // 通过调整 baseFrequency 控制波动的细腻程度，scale 控制位移幅度。
    const filterId = `crayon-blur-${size}`;
    const baseFreq = isLarge ? "0.4" : "0.6";
    const scale = isLarge ? "4" : "3";
    const stdDev = isLarge ? "1.5" : "1";

    return (
        <div className={`${styles.wrapper} ${styles[size]}`}>
            <svg
                className={styles.svg}
                viewBox="0 0 420 420"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency={baseFreq}
                            numOctaves="3"
                            result="noise"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise"
                            scale={scale}
                            result="displaced"
                        />
                        {/* 🎓 这里的 stdDeviation 决定了边缘的朦胧感。 */}
                        <feGaussianBlur in="displaced" stdDeviation={stdDev} result="blurred" />
                        <feComposite in="blurred" in2="SourceAlpha" operator="in" />
                    </filter>
                </defs>

                <g filter={`url(#${filterId})`}>
                    {/* Body */}
                    <ellipse
                        cx="210" cy="210"
                        rx={isLarge ? "6" : "7"}
                        ry={isLarge ? "60" : "50"}
                        fill={isLarge ? "#8880b8" : "#9992c4"}
                    />

                    {/* Wings - Upper */}
                    <path
                        d="M210 180 C180 120, 80 80, 60 150 C40 220, 130 240, 210 230 Z"
                        fill={isLarge ? "var(--color-primary)" : "#D3CFF0"}
                        opacity={isLarge ? "0.85" : "0.8"}
                    />
                    <path
                        d="M210 180 C240 120, 340 80, 360 150 C380 220, 290 240, 210 230 Z"
                        fill={isLarge ? "var(--color-primary)" : "#D3CFF0"}
                        opacity={isLarge ? "0.85" : "0.8"}
                    />

                    {/* Wings - Lower */}
                    <path
                        d="M210 235 C180 260, 90 290, 100 340 C110 370, 180 360, 210 310 Z"
                        fill={isLarge ? "var(--color-primary)" : "#D3CFF0"}
                        opacity="0.65"
                    />
                    <path
                        d="M210 235 C240 260, 330 290, 320 340 C310 370, 240 360, 210 310 Z"
                        fill={isLarge ? "var(--color-primary)" : "#D3CFF0"}
                        opacity="0.65"
                    />
                </g>
            </svg>
        </div>
    );
}
