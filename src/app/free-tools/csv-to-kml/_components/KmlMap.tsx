'use client';

import { useEffect, useRef } from 'react';
import type { Map as LeafletMap, CircleMarker } from 'leaflet';

interface Point {
  name: string;
  easting: number;
  northing: number;
  elevation: number;
  lat: number;
  lon: number;
}

interface KmlMapProps {
  points: Point[];
  selectedIndex: number | null;
  onPointClick: (index: number) => void;
}

export default function KmlMap({ points, selectedIndex, onPointClick }: KmlMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<CircleMarker[]>([]);

  useEffect(() => {
    if (!containerRef.current || points.length === 0) return;

    let isMounted = true;

    async function init() {
      const L = (await import('leaflet')).default;

      if (!isMounted || !containerRef.current) return;

      // Destroy existing map instance if present
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current = [];
      }

      const map = L.map(containerRef.current, { zoomControl: true });
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const newMarkers: CircleMarker[] = [];

      points.forEach((pt, i) => {
        const isSelected = i === selectedIndex;
        const marker = L.circleMarker([pt.lat, pt.lon], {
          radius: isSelected ? 9 : 6,
          color: isSelected ? '#FF8C32' : '#DC2626',
          fillColor: isSelected ? '#FF8C32' : '#DC2626',
          fillOpacity: 0.9,
          weight: 2,
        });

        marker.bindTooltip(pt.name, { permanent: false, direction: 'top' });
        marker.bindPopup(
          `<b>${pt.name}</b><br/>E: ${pt.easting.toFixed(3)}<br/>N: ${pt.northing.toFixed(3)}<br/>Elev: ${pt.elevation.toFixed(3)} m`
        );
        marker.on('click', () => onPointClick(i));
        marker.addTo(map);
        newMarkers.push(marker);
      });

      markersRef.current = newMarkers;

      // Fit bounds to show all points
      if (points.length > 0) {
        const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lon]));
        map.fitBounds(bounds, { padding: [40, 40] });
      }
    }

    init();

    return () => {
      isMounted = false;
    };
    // Reinitialise when point set changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

  // Update marker styles when selection changes without reinitialising
  useEffect(() => {
    async function updateStyles() {
      const L = (await import('leaflet')).default;
      markersRef.current.forEach((marker, i) => {
        const isSelected = i === selectedIndex;
        marker.setStyle({
          radius: isSelected ? 9 : 6,
          color: isSelected ? '#FF8C32' : '#DC2626',
          fillColor: isSelected ? '#FF8C32' : '#DC2626',
        } as Parameters<typeof marker.setStyle>[0]);
        if (isSelected && mapRef.current) {
          const pt = markersRef.current[i];
          const latlng = pt.getLatLng();
          mapRef.current.flyTo(latlng, Math.max(mapRef.current.getZoom(), 15), { duration: 0.8 });
          pt.openPopup();
        }
      });
      // suppress unused import warning
      void L;
    }
    if (markersRef.current.length > 0) updateStyles();
  }, [selectedIndex]);

  return (
    <>
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />
      <div ref={containerRef} className="h-full w-full rounded-xl" />
    </>
  );
}
