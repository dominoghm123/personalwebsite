import styles from './TextureOverlay.module.css';

/**
 * 🎓 TextureOverlay Component
 * Strictly following DESIGN_SPEC Section 3.1
 * Purpose: Provides the paper-like grain texture across the whole application.
 */
export default function TextureOverlay() {
    return (
        <div className={styles.overlay} aria-hidden="true">
            {/* 🎓 这里的设计决策：使用 SVG Turbulence 实现随机噪点，opacity 0.05 是文档要求的平衡点，既有纸质感又不显得脏。 */}
            <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
                <filter id='n'>
                    <feTurbulence
                        type='fractalNoise'
                        baseFrequency='0.85'
                        numOctaves='4'
                        stitchTiles='stitch'
                    />
                </filter>
                <rect width='100%' height='100%' filter='url(#n)' opacity='0.05' />
            </svg>
        </div>
    );
}
