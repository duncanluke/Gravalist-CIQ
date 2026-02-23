"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import debounce from 'lodash/debounce';
import { OverpassWay, fetchRoadsInBox, getSurfaceColor } from '../utils/overpass';

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

interface CommunityNote {
    id: string;
    user_name: string;
    ride_name: string;
    text: string;
    date: string;
    position: [number, number];
}

// Generate some procedural gravel roads around the center
const generateSectors = (count: number): GravelSector[] => {
    const sectors: GravelSector[] = [];
    for (let i = 0; i < count; i++) {
        const startLat = CENTER[0] + (Math.random() - 0.5) * 0.4;
        const startLng = CENTER[1] + (Math.random() - 0.5) * 0.4;
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
        let color = '#10b981';
        if (type < 0.3) {
            status = 'Brutal';
            color = '#ef4444';
        } else if (type < 0.6) {
            status = 'Chunky';
            color = '#f59e0b';
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

const INITIAL_SECTORS = generateSectors(50);

const INITIAL_NOTES: CommunityNote[] = [
    {
        id: '1',
        user_name: 'Gravel Scout Alpha',
        ride_name: 'Cederberg Odyssey',
        text: 'Heavily corrugated section after the river crossing.',
        date: '2026-02-20',
        position: [-32.42, 19.15]
    },
    {
        id: '2',
        user_name: 'Trail Blazer',
        ride_name: 'Sunset Loop',
        text: 'Perfect champagne gravel here. Fast and smooth.',
        date: '2026-02-21',
        position: [-32.55, 19.32]
    }
];

function MapEvents({ onMapClick, onBoundsChanged }: { onMapClick: (latlng: L.LatLng) => void, onBoundsChanged: (map: L.Map) => void }) {
    const map = useMapEvents({
        click: (e) => onMapClick(e.latlng),
        moveend: () => onBoundsChanged(map),
        zoomend: () => onBoundsChanged(map),
    });

    useEffect(() => {
        onBoundsChanged(map);
    }, [map, onBoundsChanged]);

    return null;
}

interface GravelMapProps {
    onSectorClick: (id: string) => void;
    user?: any;
}

export function GravelMap({ onSectorClick, user }: GravelMapProps) {
    const [notes, setNotes] = useState<CommunityNote[]>(INITIAL_NOTES);
    const [newNoteInput, setNewNoteInput] = useState<{ pos: [number, number], active: boolean }>({ pos: [0, 0], active: false });
    const [noteText, setNoteText] = useState('');
    const [osmRoads, setOsmRoads] = useState<OverpassWay[]>([]);
    const [isLoadingRoads, setIsLoadingRoads] = useState(false);

    const handleBoundsChanged = useMemo(() => debounce(async (map: L.Map) => {
        if (map.getZoom() < 13) {
            setOsmRoads([]);
            setIsLoadingRoads(false);
            return;
        }

        setIsLoadingRoads(true);
        const bounds = map.getBounds();
        // Add a small buffer to the bounds
        const pad = 0.05;
        const roads = await fetchRoadsInBox(
            bounds.getSouth() - pad,
            bounds.getWest() - pad,
            bounds.getNorth() + pad,
            bounds.getEast() + pad
        );

        // Brief artificial delay for UI feedback
        setTimeout(() => {
            setOsmRoads(roads);
            setIsLoadingRoads(false);
        }, 300);
    }, 800), []);

    const handleMapClick = (latlng: L.LatLng) => {
        if (!user) return; // Only logged in users can add notes
        setNewNoteInput({ pos: [latlng.lat, latlng.lng], active: true });
    };

    const handleSaveNote = () => {
        if (!noteText.trim()) return;
        const newNote: CommunityNote = {
            id: Date.now().toString(),
            user_name: user?.user_metadata?.full_name || 'Anonymous Scout',
            ride_name: 'Manual Entry',
            text: noteText,
            date: new Date().toISOString().split('T')[0],
            position: newNoteInput.pos
        };
        setNotes([...notes, newNote]);
        setNoteText('');
        setNewNoteInput({ ...newNoteInput, active: false });
    };

    return (
        <MapContainer
            center={CENTER}
            zoom={10}
            style={{ height: '100%', width: '100%', background: '#0a0a0c' }}
            zoomControl={false}
            attributionControl={false}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />

            <MapEvents onMapClick={handleMapClick} onBoundsChanged={handleBoundsChanged} />

            {/* Overpass Roads (Dynamic) */}
            {osmRoads.map((way) => {
                const style = getSurfaceColor(way.tags);
                return (
                    <Polyline
                        key={`osm-${way.id}`}
                        positions={way.coordinates}
                        pathOptions={{
                            color: style.color,
                            weight: style.weight,
                            opacity: style.opacity,
                            dashArray: style.dashArray,
                            lineCap: 'round',
                            lineJoin: 'round'
                        }}
                        eventHandlers={{
                            mouseover: (e) => {
                                e.target.setStyle({ weight: style.weight + 2, opacity: 1 });
                            },
                            mouseout: (e) => {
                                e.target.setStyle({ weight: style.weight, opacity: style.opacity });
                            }
                        }}
                    >
                        {way.tags.name && (
                            <Popup className="custom-popup">
                                <div className="p-2 min-w-[120px]">
                                    <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">{way.tags.name}</h4>
                                    <p className="text-[9px] text-slate-400 capitalize mt-1">
                                        Type: {way.tags.highway || 'unknown'}<br />
                                        Surface: {way.tags.surface || 'unknown'}
                                    </p>
                                </div>
                            </Popup>
                        )}
                    </Polyline>
                );
            })}

            {/* Existing Dummy Sectors */}
            {INITIAL_SECTORS.map((sector) => (
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
                            L.DomEvent.stopPropagation(e);
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

            {/* Community Notes */}
            {notes.map((note) => (
                <CircleMarker
                    key={note.id}
                    center={note.position}
                    radius={6}
                    pathOptions={{ color: '#0d59f2', fillColor: '#0d59f2', fillOpacity: 0.8, weight: 2 }}
                    eventHandlers={{
                        click: (e) => {
                            L.DomEvent.stopPropagation(e);
                        }
                    }}
                >
                    <Popup className="custom-popup">
                        <div className="p-1 min-w-[200px]">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="text-[10px] font-bold text-primary uppercase tracking-wider leading-none">{note.user_name}</p>
                                    <p className="text-[9px] text-slate-500 font-mono mt-0.5">{note.ride_name}</p>
                                </div>
                                <p className="text-[8px] text-slate-400 font-mono">{note.date}</p>
                            </div>
                            <p className="text-xs text-slate-700 leading-snug italic">"{note.text}"</p>
                        </div>
                    </Popup>
                </CircleMarker>
            ))}

            {/* New Note Input Placeholder */}
            {newNoteInput.active && (
                <Popup position={newNoteInput.pos} eventHandlers={{ remove: () => setNewNoteInput({ ...newNoteInput, active: false }) }}>
                    <div className="p-3 bg-white space-y-3 min-w-[220px]">
                        <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Add Community Note</h4>
                        <textarea
                            autoFocus
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            className="w-full text-xs p-2 border border-slate-200 rounded h-20 focus:ring-1 focus:ring-primary outline-none"
                            placeholder="What's the surface like?"
                        />
                        <button
                            onClick={handleSaveNote}
                            className="w-full py-2 bg-primary text-white text-[10px] font-bold rounded uppercase tracking-widest hover:bg-primary/90 transition-colors"
                        >
                            Drop Note
                        </button>
                    </div>
                </Popup>
            )}

        </MapContainer>
    );
}

export default GravelMap;
