import Butterfly from "@/components/home/Butterfly";

/**
 * 🎓 Home Page
 * 1:1 REPLICATION of design-preview.html
 */
export default function Home() {
    return (
        <section id="home" style={{
            height: '100vh',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
        }}>
            {/* 🎓 Grid Container (5fr 7fr) */}
            <div style={{
                maxWidth: '1200px',
                margin: '-40px auto 0', /* 🎓 视觉重心轻微上移 40px 即可，无需之前的 -120px 巨幅补偿 */
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '5fr 7fr',
                padding: '0 64px',
                gap: '64px',
                alignItems: 'center',
                position: 'relative',
                zIndex: 10
            }}>
                {/* Left: Content */}
                <div style={{ pointerEvents: 'auto' }}>
                    <h1 style={{
                        fontFamily: 'var(--font-secondary)',
                        fontSize: 'clamp(40px, 5vw, 72px)',
                        lineHeight: 1.1,
                        color: 'var(--color-text)',
                        fontWeight: 700
                    }}>
                        Welcome to my <br />
                        <span style={{ color: 'var(--color-primary)' }}>WONDERLAND.</span>
                    </h1>
                </div>

                {/* Right: Butterfly Container (Flex) from design-preview.html line 211 */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '24px',
                    pointerEvents: 'auto'
                }}>
                    <Butterfly size="large" />
                    <Butterfly size="small" />
                </div>
            </div>
        </section>
    );
}
