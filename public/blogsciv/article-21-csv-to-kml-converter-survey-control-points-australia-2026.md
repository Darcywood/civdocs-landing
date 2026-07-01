# CSV to KML Converter for Survey Control Points: A Guide for Civil Contractors and Surveyors (Australia 2026)

When a survey company sends you a set of control points before a civil job, you get a CSV file full of MGA coordinates. Names, eastings, northings, elevations. Maybe thirty points. Maybe a hundred and fifty.

The problem is that a spreadsheet of coordinates tells you almost nothing about where those points actually are on the ground. Which ones are accessible? Which one is closest to your proposed set-up position? Which marks are going to be on the far side of the cut and useless until bulk earthworks are done?

Answering those questions on site — by shooting retros one by one until two match up — wastes time and burns hours on work that could have been done before the truck even left the yard.

The solution is converting your CSV file to KML and opening it in Google Earth. Every control point appears as a named marker on satellite imagery. You can see exactly where each one is, which ones are accessible, and which set-up will give you coverage of the work area before you leave the office.

This guide covers how to do it, what the file formats mean, and the free tool that converts your survey CSV to KML in under a minute.

---

## What Is a KML File?

KML (Keyhole Markup Language) is the file format used by Google Earth, Google Maps, and most GIS applications to store geographic features — points, lines, polygons — as geographic coordinates.

A KML file is an XML document. Each point in the file has a name, a longitude, a latitude, and an optional elevation. When you open a KML in Google Earth, those points appear as markers on the map, labelled with the names from the file.

For civil construction control points, a KML lets you see every mark's location on satellite imagery — overlaid on the actual project area. You can see whether a mark is on a formed road, in a paddock, behind a fence, or in the middle of a proposed cut. That context is invisible in a spreadsheet and takes time to establish on site.

---

## What Is a Survey Control Point CSV?

Survey control points are physical marks in the ground — brass plugs, concrete blocks, steel pins — placed by a licensed surveyor to establish a known coordinate framework for a project. Every point has:

- A name or number (e.g. "RM1", "CB001", "TBM-01")
- An easting and northing in the local map grid (MGA in Australia)
- An elevation (AHD — Australian Height Datum)

The CSV format used by total stations and survey software is typically:

```
Name, Easting, Northing, Elevation
RM1, 322145.234, 5812007.891, 87.456
CB001, 322387.109, 5812234.671, 91.023
TBM-01, 321987.450, 5811895.230, 86.778
```

Most major survey software exports in this format: Trimble Business Center, Topcon Magnet Office, Leica Infinity, and any total station that exports a job CSV. The file the survey company sends you before mobilisation is almost always in this format — or can be exported from their software to it.

---

## Why Can't You Just Open the CSV in Google Earth?

Google Earth uses geographic coordinates (latitude and longitude in WGS84). Your survey CSV uses projected coordinates (easting and northing in MGA — Map Grid of Australia). These are different coordinate systems.

An easting of 322145 and a northing of 5812007 are meaningless to Google Earth without knowing which datum (GDA94 or GDA2020) and which MGA zone those coordinates are referenced to. The conversion from MGA to geographic coordinates (lat/lon) requires a mathematical transformation — the Redfearn series formula applied to the GRS80 ellipsoid.

That's the step the CSV to KML converter handles for you. You provide the datum and zone, it does the math, and the output is a KML file with proper geographic coordinates that Google Earth can render on its satellite imagery.

---

## How the CivDocs CSV to KML Converter Works

The CivDocs free CSV to KML converter is available at [civdocs.com.au/free-tools/csv-to-kml](https://www.civdocs.com.au/free-tools/csv-to-kml).

**Step 1: Upload your CSV**

Drag and drop your control point CSV onto the converter, or click to select it from your files. The file should be comma-separated with one point per row:

```
Name, Easting, Northing, Elevation
```

The converter accepts CSV exports from Trimble, Topcon, Leica, and any total station that produces a standard comma-separated coordinate file.

**Step 2: Select datum and MGA zone**

**Datum:** Choose GDA2020 (the current standard) or GDA94 (the previous standard, still in use on older projects). If you're not sure which datum your survey uses, check the survey report cover page — it should state the datum and map grid used.

**MGA zone:** Australia is divided into MGA zones based on longitude. Select the zone that covers your project area (zones 46–56). If you're not sure, use the "Find My Zone" button — the tool will use your browser's location to determine the correct zone.

A quick guide to common zones:
- Zone 50: Western Australia (Perth region)
- Zone 54: Queensland (Brisbane) and northern NSW
- Zone 55: Victoria, southern NSW, ACT
- Zone 56: Far north Queensland

**Step 3: Generate and review**

Click Generate KML. The converter processes your file and displays:

- An interactive map with all control points plotted on OpenStreetMap satellite imagery
- A point table showing Name, Easting, Northing, and Elevation for each converted point
- A map marker for each point — click any point in the table to highlight it on the map, and vice versa

Review the map to confirm the points look correct — they should appear on or near the project area you're working in.

**Step 4: Download the KML**

Click download to save the KML file to your device. The filename is based on your original CSV filename.

**Step 5: Open in Google Earth**

On desktop: open Google Earth for Web (earth.google.com), click the "New" → "Local KML file" option, and select your downloaded file. All control points appear as named markers on the satellite imagery.

On mobile: the download flow offers a direct "Open in Google Earth" option.

---

## What the KML File Contains

Each point in the KML output includes:

- The point name (from your CSV)
- Geographic coordinates (latitude and longitude, converted from MGA)
- Elevation (in metres above the ground surface)
- A description popup with: name, easting, northing, elevation, datum, and zone — so when you click a marker in Google Earth, you see the original MGA coordinates alongside the geographic position

The KML document is labelled with the original filename and includes a document description noting the datum and zone used in the conversion.

---

## What You Can See in Google Earth That You Can't See in a Spreadsheet

Once your control points are on Google Earth satellite imagery:

**Which marks are accessible.** A mark that's shown at a coordinate in a spreadsheet might be behind a fence, in a waterway, on the far side of a cut batter, or in a building's footprint that hasn't been demolished yet. Satellite imagery shows you the real-world context.

**Which set-up positions give you coverage.** For a grader or machine operator, knowing which TBM you can see from your proposed set-up position — without driving the machine around for an hour trying sight lines — means you can make that call from the office before mobilising.

**Where marks are relative to the work area.** Is TBM-05 going to be in the middle of the proposed bulk cut? Then you need to use it before earthworks reach that area, or establish a transfer point. This is planning you can do in the office with a KML in Google Earth, not information you discover on site when the mark has been buried.

**Distance between marks.** Google Earth lets you measure distances between points. For control surveys, knowing which marks are close enough together for a traverse or for reliable back-sight/fore-sight setups helps with planning instrument positions.

---

## CSV Format Tips for Best Results

The converter expects the standard four-column format:

```
Name, Easting, Northing, Elevation
```

**Common issues that cause errors:**

- **Header row included.** If your CSV has a header row ("Name, Easting, Northing, Elevation" as the first line), most survey software will include it. The converter skips rows where the first field is non-numeric — so a header row of "Name, ..." will usually be skipped correctly. If your header row starts with a number (unlikely), remove it manually.

- **Row numbers as first column.** Some export formats prefix each row with a sequential number. The converter handles this by skipping rows where the first column is numeric.

- **Comma in point names.** If a point name contains a comma (e.g. "Junction, South"), it will break the CSV parsing. Use a different delimiter in your export, or rename the points before converting.

- **Missing elevation.** If your CSV doesn't include elevation, the converter treats elevation as zero and the KML marks will appear at ground level (clamped to ground). This is fine for most use cases.

**Checking before you upload:** Open the CSV in a text editor (not Excel — Excel can reformat numbers). Confirm the file has at least Name, Easting, and Northing in the expected column positions.

---

## Convert Your Survey CSV to KML for Free

The CivDocs CSV to KML converter is free. No account. No login. No file size limit that will catch you out with a large control network.

[Open the CSV to KML Converter →](https://www.civdocs.com.au/free-tools/csv-to-kml)

---

## Frequently Asked Questions

**What CSV format does the converter accept?**
The converter accepts comma-separated files with columns in the order: Name, Easting, Northing, Elevation. Elevation is optional. This format is the standard export from Trimble, Topcon, Leica, and most total station software. If your file uses a different column order, reorder the columns in a text editor or spreadsheet before uploading.

**What MGA zone is Melbourne? Sydney? Brisbane? Perth?**
Melbourne/Victoria: Zone 55. Sydney/NSW: Zone 55 or 56 depending on longitude. Brisbane/South Queensland: Zone 56. Perth/WA: Zone 50. For any location, use the "Find My Zone" button in the converter or check the survey report cover page.

**What is the difference between GDA94 and GDA2020?**
GDA94 and GDA2020 are the two geodetic datums used in Australia. GDA2020 is the current standard, adopted in 2020, and aligns more closely with the ITRF (International Terrestrial Reference Frame). For most civil construction control surveys in Australia since 2020, GDA2020 is the correct datum. Older projects may still use GDA94. See the survey report for clarification.

**Can I open the KML in Google Maps instead of Google Earth?**
Google Maps supports basic KML file viewing through "My Maps" but has limited functionality compared to Google Earth. For full satellite imagery overlay with named markers and coordinate details, Google Earth (web or desktop) provides a better experience.

**Is the CivDocs CSV to KML converter free?**
Yes. The converter is completely free, with no account required.

**What are the MGA zones for Australia?**
MGA zones covering mainland Australia and Tasmania: Zone 49 (far WA), Zone 50 (Perth/SW WA), Zone 51 (central WA), Zone 52 (WA/NT border), Zone 53 (Darwin/central Australia), Zone 54 (NQ/north SA), Zone 55 (Vic/southern NSW/ACT/SA), Zone 56 (Brisbane, northern NSW/SEQ). Check your survey documentation for the specific zone used.

---

## Open the Converter

[Convert Your CSV to KML →](https://www.civdocs.com.au/free-tools/csv-to-kml)

No account. Instant results. Works with Trimble, Topcon, Leica, and any total station CSV export.
