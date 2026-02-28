import FootprintMap from '@/components/footprint/FootprintMap';
import { getLocations } from '@/lib/data';

export default async function FootprintPage() {
    const locations = await getLocations();

    return (
        <div className="container-padding" style={{
            paddingTop: '120px',
            paddingBottom: '40px',
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 10,
        }}>
            <h1 style={{
                fontFamily: 'var(--font-secondary)',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                lineHeight: 1.1,
                color: 'var(--color-primary)',
                fontWeight: 700,
                marginBottom: '48px',
            }}>
                Footprint
            </h1>

            <FootprintMap locations={locations} />

            <div style={{
                marginTop: '48px',
                fontFamily: 'var(--font-primary)',
                color: 'var(--color-text-muted)',
                fontSize: '15px',
                lineHeight: 1.7,
                maxWidth: '800px'
            }}>
                <p>
                    Every pin on this map represents a moment of discovery.
                    From the mist-covered streets of Edinburgh to the neon-lit alleys of Hong Kong,
                    these are the places that have shaped my perspective and filled my wanderer's soul.
                </p>
            </div>
        </div>
    );
}
