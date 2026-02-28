'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from './FootprintMap.module.css';

// Fix for icon issues
const customIcon = typeof L !== 'undefined' ? L.divIcon({
    className: styles.markerDot,
    html: '<div class="' + styles.markerInner + '"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
}) : undefined;

// Bounds to prevent infinite scrolling and focus on major landmasses
const maxBounds: L.LatLngBoundsExpression = [
    [-85, -180],
    [85, 180]
];

interface LocationData {
    id: string;
    cityName: string;
    coords: [number, number];
    mainImage: string;
    description?: string;
}

interface MapInnerProps {
    locations: LocationData[];
}

export default function MapInner({ locations }: MapInnerProps) {
    return (
        <MapContainer
            center={[30, 10]}
            zoom={2}
            minZoom={2}
            maxZoom={12}
            scrollWheelZoom={true}
            className={styles.mapInner}
            maxBounds={maxBounds}
            maxBoundsViscosity={1.0}
            worldCopyJump={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                noWrap={true}
            />

            {locations.map((loc) => (
                <Marker
                    key={loc.id}
                    position={loc.coords}
                    icon={customIcon}
                >
                    <Popup minWidth={240}>
                        <div className={styles.popupContent}>
                            <img
                                src={loc.mainImage}
                                alt={loc.cityName}
                                className={styles.popupImage}
                            />
                            <div className={styles.popupText}>
                                <h3 className={styles.cityName}>{loc.cityName}</h3>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
