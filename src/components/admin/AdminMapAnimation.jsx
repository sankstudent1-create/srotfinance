import React, { useState, useEffect, useMemo } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users } from 'lucide-react';

const geoUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';

export const AdminMapAnimation = ({ sessions }) => {
    const [markers, setMarkers] = useState([]);
    const [hoveredLocation, setHoveredLocation] = useState(null);

    // Small coordinate lookup so real "City, Country" session strings can be
    // plotted. Only real session data ever reaches the map.
    const cityCoords = {
        'mumbai': [72.8777, 19.0760], 'delhi': [77.2090, 28.6139], 'pune': [73.8567, 18.5204],
        'bengaluru': [77.5946, 12.9716], 'bangalore': [77.5946, 12.9716], 'chennai': [80.2707, 13.0827],
        'kolkata': [88.3639, 22.5726], 'hyderabad': [78.4867, 17.3850], 'ahmedabad': [72.5714, 23.0225],
        'jaipur': [75.7873, 26.9124], 'lucknow': [80.9462, 26.8467], 'kochi': [76.2673, 9.9312],
        'new york': [-74.0060, 40.7128], 'london': [-0.1278, 51.5074], 'singapore': [103.8198, 1.3521],
        'sydney': [151.2093, -33.8688], 'dubai': [55.2708, 25.2048]
    };

    useEffect(() => {
        let activeMarkers = [];

        sessions.forEach(session => {
            if (session.geo_location) {
                try {
                    // Try parsing JSON format we just introduced
                    if (session.geo_location.startsWith('{')) {
                        const parsed = JSON.parse(session.geo_location);
                        if (parsed.lat && parsed.lon) {
                            activeMarkers.push({
                                id: session.id,
                                loc: parsed.loc,
                                lat: parseFloat(parsed.lat),
                                lon: parseFloat(parsed.lon),
                                device: session.user_devices?.device_name || 'Unknown',
                                time: new Date(session.session_start).toLocaleTimeString()
                            });
                        }
                    } else if (session.geo_location.includes(',')) {
                        // String like "Mumbai, India" — plot only if we know the city
                        const coords = cityCoords[session.geo_location.split(',')[0].trim().toLowerCase()];
                        if (coords) {
                            activeMarkers.push({
                                id: session.id,
                                loc: session.geo_location,
                                lat: coords[1],
                                lon: coords[0],
                                device: session.user_devices?.device_name || 'Unknown',
                                time: new Date(session.session_start).toLocaleTimeString()
                            });
                        }
                    }
                } catch (e) {
                    console.log('Failed to parse geo locating for map', e);
                }
            }
        });

        // Only real session locations are shown. No simulated markers —
        // the map must never fabricate user activity.
        setMarkers(activeMarkers);
    }, [sessions]);

    return (
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                        <MapPin className="text-orange-500" /> Active Users Map
                    </h2>
                    <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">Live Geographic Distribution</p>
                </div>
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
                    <Users size={24} className="text-orange-500" />
                </div>
            </div>

            {/* Map Container */}
            <div className="relative w-full h-[400px] bg-orange-50/30 rounded-3xl overflow-hidden mt-6 border border-slate-100 flex items-center justify-center">
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{
                        scale: 130,
                        center: [0, 40] // Center higher up for better look
                    }}
                    width={800}
                    height={400}
                    style={{ width: "100%", height: "100%" }}
                >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="#E2E8F0" // slate-200
                                    stroke="#F8FAFC" // slate-50
                                    strokeWidth={0.5}
                                    style={{
                                        default: { outline: "none" },
                                        hover: { fill: "#CBD5E1", outline: "none" }, // slate-300
                                        pressed: { outline: "none" },
                                    }}
                                />
                            ))
                        }
                    </Geographies>

                    {markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            coordinates={[marker.lon, marker.lat]}
                            onMouseEnter={() => setHoveredLocation(marker)}
                            onMouseLeave={() => setHoveredLocation(null)}
                        >
                            <motion.g
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            >
                                <motion.circle
                                    r={6}
                                    fill="#f97316" // orange-500
                                    className="cursor-pointer"
                                    animate={{ r: [6, 12, 6] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                    style={{ opacity: 0.6 }}
                                />
                                <circle r={4} fill="#ea580c" className="cursor-pointer" /> {/* orange-600 */}
                            </motion.g>
                        </Marker>
                    ))}
                </ComposableMap>

                {/* Animated Pulsing overlays for aesthetics */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-white/20"></div>

                {/* Honest empty state — no fabricated activity */}
                {markers.length === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <MapPin size={32} className="text-slate-300 mb-3" />
                        <p className="text-sm font-bold text-slate-500">No located sessions yet</p>
                        <p className="text-xs text-slate-400 mt-1 max-w-[260px]">Markers appear here when user sessions include location data.</p>
                    </div>
                )}

                {/* Tooltip Overlay */}
                <AnimatePresence>
                    {hoveredLocation && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-white p-3 rounded-2xl shadow-xl flex items-center gap-4 z-10 min-w-[200px]"
                        >
                            <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                                </span>
                            </div>
                            <div>
                                <p className="text-xs font-black truncate max-w-[150px]">{hoveredLocation.loc}</p>
                                <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mt-0.5">{hoveredLocation.device}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
