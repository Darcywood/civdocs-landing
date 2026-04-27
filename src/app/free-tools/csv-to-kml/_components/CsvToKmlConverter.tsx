'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from '@/components/OptimizedImage';

const KmlMap = dynamic(() => import('./KmlMap'), { ssr: false });

const CIVDOCS_APP_URL = process.env.NEXT_PUBLIC_WEB_APP_URL ?? 'https://app.civdocs.com.au';
/** Custom URL scheme for the native CivDocs app; override if your build uses a different scheme. */
const CIVDOCS_APP_SCHEME =
  process.env.NEXT_PUBLIC_CIVDOCS_APP_DEEPLINK ?? 'civdocs://';
const CIVDOCS_IOS_APP_STORE = 'https://apps.apple.com/au/app/civ-docs/id6756803850';
const CIVDOCS_PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.civdocs.app&hl=en';

const MOBILE_APP_OPEN_FALLBACK_MS = 2_500;

/**
 * Tries a native app custom URL on iOS/Android, then the App Store or Google Play
 * if the app does not take over. Returns true when the mobile path ran (desktop: false).
 */
function tryMobileAppThenStore(
  appScheme: string,
  iosStore: string,
  playStore: string
): boolean {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent;
  const isIOS =
    /iPhone|iPad|iPod/.test(ua) || (ua.includes('Mac') && 'ontouchend' in document);
  const isAndroid = /Android/.test(ua);
  if (!isIOS && !isAndroid) return false;

  const storeUrl = isIOS ? iosStore : playStore;
  const t = window.setTimeout(() => {
    window.location.assign(storeUrl);
  }, MOBILE_APP_OPEN_FALLBACK_MS);
  const cancel = () => window.clearTimeout(t);
  window.addEventListener('pagehide', cancel, { once: true });
  const onVis = () => {
    if (document.visibilityState === 'hidden') {
      document.removeEventListener('visibilitychange', onVis);
      cancel();
    }
  };
  document.addEventListener('visibilitychange', onVis);
  window.location.assign(appScheme);
  return true;
}

const EARTH_APP_SCHEME = 'comgoogleearth://';
const EARTH_IOS_APP_STORE = 'https://apps.apple.com/app/google-earth/id293622097';
const EARTH_PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.google.earth';
const EARTH_WEB_URL = 'https://earth.google.com/web/';

/**
 * Tries the CivDocs app; on mobile, falls back to the store. On desktop, opens the web app.
 */
function tryOpenCivDocsAppOrWeb(): void {
  if (tryMobileAppThenStore(CIVDOCS_APP_SCHEME, CIVDOCS_IOS_APP_STORE, CIVDOCS_PLAY_STORE)) return;
  window.open(CIVDOCS_APP_URL, '_blank', 'noopener,noreferrer');
}

/**
 * Tries the Google Earth app; on mobile, falls back to the store. On desktop, opens Earth on the web.
 * Does NOT download the KML — the file is expected to already be saved before this runs.
 */
function tryOpenGoogleEarthAppOrWeb(): void {
  if (tryMobileAppThenStore(EARTH_APP_SCHEME, EARTH_IOS_APP_STORE, EARTH_PLAY_STORE)) return;
  window.open(EARTH_WEB_URL, '_blank', 'noopener,noreferrer');
}

const DATUMS = ['GDA2020', 'GDA94'] as const;
const ZONES = [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56] as const;

const ZONE_BOUNDARIES: Record<number, [number, number]> = {
  46: [96, 102], 47: [102, 108], 48: [108, 114], 49: [114, 120],
  50: [120, 126], 51: [126, 132], 52: [132, 138], 53: [138, 144],
  54: [144, 150], 55: [150, 156], 56: [156, 162],
};

function lonToZone(lon: number): number {
  for (const [zone, [min, max]] of Object.entries(ZONE_BOUNDARIES)) {
    if (lon >= min && lon < max) return Number(zone);
  }
  return 55;
}

interface Point {
  name: string;
  easting: number;
  northing: number;
  elevation: number;
  lat: number;
  lon: number;
}

export default function CsvToKmlConverter() {
  const [csvText, setCsvText] = useState('');
  const [filename, setFilename] = useState('');
  const [datum, setDatum] = useState<'GDA2020' | 'GDA94'>('GDA2020');
  const [zone, setZone] = useState<number>(55);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [kml, setKml] = useState<string | null>(null);
  const [kmlFilename, setKmlFilename] = useState('points.kml');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [geoLocating, setGeoLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [kmlOptionsModalOpen, setKmlOptionsModalOpen] = useState(false);
  const [postSaveOptionsModalOpen, setPostSaveOptionsModalOpen] = useState(false);
  const [googleEarthHelpModalOpen, setGoogleEarthHelpModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const readFile = useCallback((file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setError('Please upload a .csv file.');
      return;
    }
    setFilename(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setCsvText(e.target?.result as string ?? '');
      setError(null);
    };
    reader.readAsText(file);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) readFile(file);
  }, [readFile]);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) readFile(file);
  }, [readFile]);

  const findMyZone = useCallback(() => {
    setGeoError(null);
    if (!navigator.geolocation) { setGeoError('Geolocation not supported.'); return; }
    setGeoLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => { setZone(lonToZone(pos.coords.longitude)); setGeoLocating(false); },
      () => { setGeoError('Could not get location. Select zone manually.'); setGeoLocating(false); },
      { timeout: 8000 }
    );
  }, []);

  const handleConvert = useCallback(async () => {
    if (!csvText.trim()) { setError('Please upload a CSV file first.'); return; }
    setLoading(true);
    setError(null);
    setPoints([]);
    setKml(null);
    try {
      const res = await fetch('/api/tools/csv-to-kml', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csv: csvText, datum, zone, filename: filename || 'points' }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Conversion failed.'); return; }
      setPoints(data.points);
      setKml(data.kml);
      setKmlFilename(data.filename);
      setSelectedIndex(null);
      setKmlOptionsModalOpen(true);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [csvText, datum, zone, filename]);

  useEffect(() => {
    if (points.length > 0 && resultsRef.current) {
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    }
  }, [points]);

  /** iOS: Web Share with a File opens the system sheet → Save to Files. Desktop: <a download>. */
  const saveKmlToDevice = useCallback(
    (afterSave?: () => void) => {
      if (!kml) return;
      void (async () => {
        const blob = new Blob([kml], { type: 'application/vnd.google-earth.kml+xml' });
        const file = new File([blob], kmlFilename, { type: 'application/vnd.google-earth.kml+xml' });
        let canShareFiles = false;
        try {
          canShareFiles = Boolean(
            typeof navigator !== 'undefined' &&
              navigator.canShare &&
              navigator.canShare({ files: [file] })
          );
        } catch {
          canShareFiles = false;
        }
        if (typeof navigator !== 'undefined' && typeof navigator.share === 'function' && canShareFiles) {
          try {
            await navigator.share({ files: [file], title: kmlFilename });
            afterSave?.();
            return;
          } catch (err) {
            if (err instanceof Error && err.name === 'AbortError') {
              return;
            }
            // fall through to <a download>
          }
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = kmlFilename;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1_500);
        afterSave?.();
      })();
    },
    [kml, kmlFilename]
  );

  const handleDownload = useCallback((afterSave?: () => void) => {
    saveKmlToDevice(afterSave);
  }, [saveKmlToDevice]);

  const openGoogleEarth = useCallback(() => {
    tryOpenGoogleEarthAppOrWeb();
  }, []);

  const openInCivDocs = useCallback(() => {
    if (!kml) return;
    tryOpenCivDocsAppOrWeb();
  }, [kml]);

  const modalOpen = kmlOptionsModalOpen || postSaveOptionsModalOpen || googleEarthHelpModalOpen;
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (googleEarthHelpModalOpen) setGoogleEarthHelpModalOpen(false);
      else if (postSaveOptionsModalOpen) setPostSaveOptionsModalOpen(false);
      else if (kmlOptionsModalOpen) setKmlOptionsModalOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [kmlOptionsModalOpen, postSaveOptionsModalOpen, googleEarthHelpModalOpen, modalOpen]);

  const hasResults = points.length > 0 && kml;

  return (
    <section id="converter" className="px-4 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1200px]">

        {/* ── Main tool card ──────────────────────────────────────────── */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100">

          {/* Card header — orange gradient matching site CTAs */}
          <div className="px-8 py-7 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-3 py-0.5 mb-3">
                <span className="text-xs font-semibold text-white">FREE TOOL</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white leading-tight">
                Convert your CSV
              </h2>
              <p className="mt-1 text-sm text-white/80">
                Upload a CSV file, choose your coordinate system, and download your KML.
              </p>
            </div>
            {/* Inline coordinate selectors */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/20 px-4 py-2">
                <span className="text-xs text-white/70">Datum</span>
                <select
                  value={datum}
                  onChange={(e) => setDatum(e.target.value as 'GDA2020' | 'GDA94')}
                  className="bg-transparent border-none text-sm font-semibold text-white focus:outline-none cursor-pointer"
                >
                  {DATUMS.map((d) => <option key={d} value={d} className="text-gray-900 bg-white">{d}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/20 px-4 py-2">
                <span className="text-xs text-white/70">Zone</span>
                <select
                  value={zone}
                  onChange={(e) => setZone(Number(e.target.value))}
                  className="bg-transparent border-none text-sm font-semibold text-white focus:outline-none cursor-pointer"
                >
                  {ZONES.map((z) => <option key={z} value={z} className="text-gray-900 bg-white">MGA {z}</option>)}
                </select>
              </div>
              <button
                type="button"
                onClick={findMyZone}
                disabled={geoLocating}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/40 bg-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/30 transition-all disabled:opacity-50"
              >
                {geoLocating ? (
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a8 8 0 000 16v-4a8 8 0 01-8-8z" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
                Find My Zone
              </button>
            </div>
          </div>

          {/* Card body */}
          <div className="bg-white p-6 sm:p-8">
            {geoError && (
              <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-700">
                {geoError}
              </div>
            )}

            <div className="mb-6">
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-10 cursor-pointer transition-all min-h-[240px] ${
                  isDragging
                    ? 'border-[#FF8C32] bg-[#FF8C32]/5 scale-[1.01]'
                    : csvText
                    ? 'border-emerald-400 bg-emerald-50/60'
                    : 'border-gray-200 bg-gray-50/60 hover:border-[#FF8C32] hover:bg-[#FF8C32]/5'
                }`}
              >
                <input ref={fileInputRef} type="file" accept=".csv" className="sr-only" onChange={onFileChange} />

                {csvText ? (
                  <>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                      <svg className="h-7 w-7 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-base font-semibold text-gray-900">{filename}</p>
                      <p className="mt-1 text-sm text-emerald-600">File loaded — click to replace</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF8C32]/10">
                      <svg className="h-7 w-7 text-[#FF8C32]" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-base font-medium text-gray-700">
                        <span className="font-semibold text-[#FF8C32]">Click to upload</span> or drag and drop
                      </p>
                      <p className="mt-2 text-sm text-gray-400">CSV files only</p>
                    </div>
                    <div className="rounded-xl bg-white border border-gray-100 px-4 py-2 text-xs text-gray-500 text-center shadow-sm">
                      Name, Easting, Northing, Elevation — one point per row
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Generate button */}
            <button
              type="button"
              onClick={handleConvert}
              disabled={loading || !csvText.trim()}
              className="w-full inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#FF8C32] to-[#F5B041] px-8 py-4 text-base font-semibold text-white shadow-lg hover:shadow-xl hover:scale-[1.005] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-md"
            >
              {loading ? (
                <>
                  <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a8 8 0 000 16v-4a8 8 0 01-8-8z" />
                  </svg>
                  Converting…
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Generate KML
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-start gap-2">
                <svg className="h-4 w-4 mt-0.5 shrink-0 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}
          </div>
        </div>

        {/* ── Results ─────────────────────────────────────────────────── */}
        {hasResults && (
          <div ref={resultsRef} className="mt-8 space-y-6">
            {/* Results header */}
            <div className="flex flex-wrap items-center justify-between gap-4 px-1">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
                  <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {points.length} point{points.length !== 1 ? 's' : ''} converted
                  </p>
                  <p className="text-sm text-gray-500">Click a row or map marker to highlight it</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleDownload()}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] px-6 py-3 font-semibold text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all text-sm"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download {kmlFilename}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Point table */}
              <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/80 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">Points</span>
                  <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">{points.length}</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">Name</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wide">Easting</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wide">Northing</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wide">Elev (m)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {points.map((pt, i) => (
                        <tr
                          key={i}
                          onClick={() => setSelectedIndex(i === selectedIndex ? null : i)}
                          className={`cursor-pointer border-b border-gray-50 last:border-0 transition-colors ${
                            i === selectedIndex
                              ? 'bg-[#FF8C32]/8 text-gray-900'
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <td className="px-4 py-3 font-medium">
                            <span className={`inline-flex items-center gap-2 ${i === selectedIndex ? 'text-[#CC5500]' : ''}`}>
                              {i === selectedIndex
                                ? <span className="h-2 w-2 rounded-full bg-[#FF8C32] shrink-0" />
                                : <span className="h-2 w-2 rounded-full bg-gray-200 shrink-0" />
                              }
                              {pt.name}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right font-mono text-xs tabular-nums">{pt.easting.toFixed(3)}</td>
                          <td className="px-4 py-3 text-right font-mono text-xs tabular-nums">{pt.northing.toFixed(3)}</td>
                          <td className="px-4 py-3 text-right font-mono text-xs tabular-nums">{pt.elevation.toFixed(3)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Leaflet map */}
              <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-gray-100" style={{ minHeight: 400 }}>
                <KmlMap
                  points={points}
                  selectedIndex={selectedIndex}
                  onPointClick={(i) => setSelectedIndex(i === selectedIndex ? null : i)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* KML options modal — after successful generate */}
      <AnimatePresence>
        {kmlOptionsModalOpen && kml && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
              onClick={() => setKmlOptionsModalOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="kml-options-title"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-1/2 z-[101] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setKmlOptionsModalOpen(false)}
                className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h3 id="kml-options-title" className="text-lg font-semibold text-gray-900 pr-10">
                Your KML is ready
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {kmlFilename} &middot; {points.length} point{points.length !== 1 ? 's' : ''}
              </p>
              <p className="mt-3 text-sm text-gray-600">
                Download the file to your device. We&apos;ll then show you how to open it in Google Earth or CivDocs.
              </p>
              <button
                type="button"
                onClick={() =>
                  handleDownload(() => {
                    setKmlOptionsModalOpen(false);
                    setPostSaveOptionsModalOpen(true);
                  })
                }
                className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] px-6 py-3.5 font-semibold text-white shadow-md hover:shadow-lg transition-all"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
              <button
                type="button"
                onClick={() => setKmlOptionsModalOpen(false)}
                className="mt-4 w-full text-center text-sm font-medium text-gray-500 hover:text-gray-800"
              >
                View map and table
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Step 2 — after the file is saved: pick where to open it */}
      <AnimatePresence>
        {postSaveOptionsModalOpen && kml && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[102] bg-black/50 backdrop-blur-sm"
              onClick={() => setPostSaveOptionsModalOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="post-save-title"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-1/2 z-[103] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setPostSaveOptionsModalOpen(false)}
                className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-3">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 id="post-save-title" className="text-lg font-semibold text-gray-900 pr-10">
                File saved
              </h3>
              <p className="mt-1 text-sm text-gray-500 break-all">{kmlFilename}</p>
              <p className="mt-3 text-sm text-gray-600">
                Where would you like to open it?
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setPostSaveOptionsModalOpen(false);
                    setGoogleEarthHelpModalOpen(true);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-200 bg-white px-6 py-3.5 font-semibold text-gray-800 hover:border-[#FF8C32] hover:text-[#FF8C32] transition-all"
                >
                  <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  Open in Google Earth
                </button>
                <button
                  type="button"
                  onClick={() => {
                    openInCivDocs();
                    setPostSaveOptionsModalOpen(false);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-200 bg-white px-6 py-3.5 font-semibold text-gray-800 hover:border-[#FF8C32] hover:text-[#FF8C32] transition-all"
                  aria-label="Open in CivDocs"
                >
                  <OptimizedImage
                    src="/civdocs-mark-icon.png"
                    alt=""
                    width={32}
                    height={32}
                    className="h-7 w-7 shrink-0 rounded-full object-cover"
                  />
                  <span>Open in CivDocs</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => setPostSaveOptionsModalOpen(false)}
                className="mt-4 w-full text-center text-sm font-medium text-gray-500 hover:text-gray-800"
              >
                View map and table
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Step 3 — Google Earth: how to load the saved file */}
      <AnimatePresence>
        {googleEarthHelpModalOpen && kml && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[104] bg-black/50 backdrop-blur-sm"
              onClick={() => setGoogleEarthHelpModalOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="earth-help-title"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-1/2 z-[105] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setGoogleEarthHelpModalOpen(false)}
                className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h3 id="earth-help-title" className="text-lg font-semibold text-gray-900 pr-10">
                Open in Google Earth
              </h3>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                In Google Earth, use <span className="font-semibold text-gray-800">New local KML file</span>, then pick
                this file:{' '}
                <span className="font-mono text-sm text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded break-all">
                  {kmlFilename}
                </span>
              </p>
              <button
                type="button"
                onClick={() => {
                  openGoogleEarth();
                  setGoogleEarthHelpModalOpen(false);
                }}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] px-6 py-3.5 font-semibold text-white shadow-md hover:shadow-lg transition-all"
              >
                <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                Open Google Earth
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
