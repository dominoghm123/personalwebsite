'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import styles from './FootprintMap.module.css';

const MapInner = dynamic(() => import('./MapInner'), {
    ssr: false,
    loading: () => <div className={styles.mapLoading}>Loading Interactive Map...</div>
});

interface LocationData {
    id: string;
    cityName: string;
    coords: [number, number];
    mainImage: string;
    description: string;
}

interface FootprintMapProps {
    locations: LocationData[];
}

export default function FootprintMap({ locations }: FootprintMapProps) {
    // 📊 Derive statistics: Unique countries and cities
    const stats = useMemo(() => {
        const uniqueCities = new Set(locations.map(loc => loc.cityName));
        const uniqueCountries = new Set(locations.map(loc => {
            const parts = loc.cityName.split(',');
            return parts[parts.length - 1].trim();
        }));

        return {
            cities: uniqueCities.size,
            countries: uniqueCountries.size
        };
    }, [locations]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.mapContainer}>
                <MapInner locations={locations} />
            </div>

            {/* 📈 Stats Billboard - Positioned below map, above texts */}
            <div className={styles.stats}>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>{stats.countries}</span>
                    <span className={styles.statLabel}>Countries / Regions</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>{stats.cities}</span>
                    <span className={styles.statLabel}>Cities Explored</span>
                </div>
            </div>
        </div>
    );
}
