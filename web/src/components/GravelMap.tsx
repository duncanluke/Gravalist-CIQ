"use client";

import React from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet with Webpack/Vite
if (typeof window !== 'undefined') {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
}

// Cederberg, South Africa - Gravel Heaven
const CENTER: [number, number] = [-32.5, 19.2];

interface GravelSector {
    id: string;
    name: string;
    color: string; // hex
    positions: [number, number][];
    status: 'Brutal' | 'Chunky' | 'Champagne';
}

// Generate some procedural gravel roads around the center
const generateSectors = (count: number): GravelSector[] => {
    const sectors: GravelSector[] = [];
    for (let i = 0; i < count; i++) {
        // Random start point near center
        const startLat = CENTER[0] + (Math.random() - 0.5) * 0.4;
        const startLng = CENTER[1] + (Math.random() - 0.5) * 0.4;

        // Create a jagged path
        const positions: [number, number][] = [[startLat, startLng]];
        let currentLat = startLat;
        let currentLng = startLng;

        const segments = 5 + Math.floor(Math.random() * 10);
        for (let j = 0; j < segments; j++) {
            currentLat += (Math.random() - 0.5) * 0.02;
            currentLng += (Math.random() - 0.5) * 0.02;
            positions.push([currentLat, currentLng]);
        }

        const type = Math.random();
        let status: GravelSector['status'] = 'Champagne';
        let color = '#10b981'; // Green

        if (type < 0.3) {
            status = 'Brutal';
            color = '#ef4444'; // Red
        } else if (type < 0.6) {
            status = 'Chunky';
            color = '#f59e0b'; // Amber
        }

        sectors.push({
            id: `sector-${i}`,
            name: `Sector ${i + 1}`,
            color,
            positions,
            status
        });
    }
    return sectors;
};

const SECTORS = generateSectors(50);

interface GravelMapProps {
    onSectorClick: (id: string) => void;
}

export function GravelMap({ onSectorClick }: GravelMapProps) {
    return (
        <MapContainer
            center={CENTER}
            zoom={10}
            style={{ height: '100%', width: '100%', background: '#0a0a0c' }}
            zoomControl={false}
            attributionControl={false}
        >
            {/* Dark Matter Tile Layer for Command Center Vibe */}
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />

            {SECTORS.map((sector) => (
                <Polyline
                    key={sector.id}
                    positions={sector.positions}
                    pathOptions={{
                        color: sector.color,
                        weight: 4,
                        opacity: 0.7,
                        lineCap: 'round'
                    }}
                    eventHandlers={{
                        click: (e) => {
                            L.DomEvent.stopPropagation(e); // Prevent map click
                            onSectorClick(sector.id);
                        },
                        mouseover: (e) => {
                            e.target.setStyle({ weight: 7, opacity: 1 });
                        },
                        mouseout: (e) => {
                            e.target.setStyle({ weight: 4, opacity: 0.7 });
                        }
                    }}
                />
            ))}

            {/* Simulated Live Riders */}
            {typeof window !== 'undefined' && [...Array(8)].map((_, i) => {
                const randomSector = SECTORS[i % SECTORS.length];
                const randomPoint = randomSector.positions[Math.floor(Math.random() * randomSector.positions.length)];
                return (
                    <CircleMarker
                        key={`rider-${i}`}
                        center={randomPoint}
                        radius={4}
                        pathOptions={{ color: '#0d59f2', fillColor: '#0d59f2', fillOpacity: 1 }}
                    >
                        <Popup>
                            <div className="text-xs font-bold text-slate-800">Scout #{i + 1}</div>
                        </Popup>
                    </CircleMarker>
                );
            })}

        </MapContainer>
    );
}

export default GravelMap;
