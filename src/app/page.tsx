import Butterfly from "@/components/home/Butterfly";
import SocialContact from "@/components/layout/SocialContact";
import { getSiteConfig } from "@/lib/data";

/**
 * 🎓 Home Page
 * 1:1 REPLICATION of design-preview.html with addition of centered social links
 */
export default async function Home() {
    const siteConfig = await getSiteConfig();

    return (
        <section id="home" style={{
            minHeight: '100vh',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: '40px'
        }}>
            {/* 🎓 Grid Container (5fr 7fr) */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '5fr 7fr',
                padding: '0 64px',
                gap: '64px',
                alignItems: 'center',
                position: 'relative',
                zIndex: 10,
                flexGrow: 1,
                marginTop: '-80px' /* Substantial negative margin to lift up the grid, navbar is 80px */
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

            {/* 🎓 Home Footer: Centered Social Links as requested */}
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                padding: '24px 0',
                position: 'relative',
                zIndex: 20
            }}>
                <SocialContact contacts={siteConfig.contacts} centered />
            </div>
        </section>
    );
}
