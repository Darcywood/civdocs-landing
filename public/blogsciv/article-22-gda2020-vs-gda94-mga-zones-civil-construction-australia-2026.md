# GDA2020 vs GDA94: What Civil Contractors and Surveyors Need to Know (Australia 2026)

If a survey company sends you control point coordinates, or you're reading through a set of survey drawings before a civil job, you'll see either GDA94 or GDA2020 listed as the horizontal datum. Most contractors and operators know these are different things but aren't sure exactly what the difference is, whether it matters for their job, and what happens if you mix the two up.

This guide explains the difference in practical terms — no geodesy degree required — and covers what it means for civil construction crews, surveyors, and grader operators working with MGA coordinates in Australia.

---

## What Is a Geodetic Datum?

A geodetic datum is the reference framework used to define coordinates on the Earth's surface. It's the mathematical model that says: "when we give you an easting and northing, here's what surface, origin point, and orientation we're using."

Australia is a big continent, and its position on the surface of the Earth is not static. The Australian tectonic plate moves approximately 7 cm per year to the north-northeast — one of the fastest-moving plates on the planet. This movement is small enough to be invisible day-to-day but significant enough to accumulate over decades and cause the coordinate framework to drift relative to global reference systems.

That drift is why Australia has updated its datum twice in the modern era — from AGD66/AGD84 to GDA94, and then to GDA2020.

---

## GDA94: The Previous Standard

GDA94 (Geocentric Datum of Australia 1994) was Australia's official geodetic datum from 1994 until the adoption of GDA2020. It was a significant improvement over the older AGD datums, bringing Australian coordinates into alignment with the global GPS reference frame (ITRF92) as it existed at the epoch of 1 January 1994.

GDA94 uses the GRS80 ellipsoid and the Map Grid of Australia (MGA) projection, based on the Universal Transverse Mercator (UTM) system.

For most of the 1994–2020 period, GDA94 was the standard for engineering surveys, cadastral surveys, and civil construction in Australia. The majority of existing survey datum marks, project control networks, and infrastructure datasets across Australia were established in GDA94.

---

## GDA2020: The Current Standard

GDA2020 (Geocentric Datum of Australia 2020) is Australia's current official geodetic datum, adopted progressively from 2017 and now the mandatory standard for new surveys in most jurisdictions.

GDA2020 uses the same GRS80 ellipsoid as GDA94 but aligns to the global reference frame at a different epoch — 1 January 2020. Because the Australian plate has moved approximately 1.8 metres to the north-northeast between 1994 and 2020, the coordinates of any fixed point on the ground differ between GDA94 and GDA2020.

**The key practical fact: the same physical point has different MGA coordinates in GDA94 and GDA2020.** The difference is approximately 1.7–1.8 metres, varying slightly by location across Australia.

For most civil construction work — road formation, bulk earthworks, drainage — a 1.8 metre horizontal difference is within the tolerance of rough earthworks. But for setting out buildings, structures, and infrastructure that needs to connect to existing GDA94 infrastructure (sewer mains, water services, boundary surveys), it's a significant difference.

---

## What This Means Practically for Civil Contractors

### When does the datum matter?

**For GPS-controlled earthworks and grading:** The GPS and machine control system your graders and excavators use will be set to a specific datum. If your total station control survey and your machine control design model are in different datums, your machines will be working to the wrong coordinates.

Most modern machine control setups (Trimble, Leica, Topcon) allow you to specify the datum in the receiver settings. Confirm with your surveyor and machine control technician that both are set to the same datum — GDA2020 or GDA94 — before calibrating.

**For connecting to existing infrastructure:** If you're laying sewer or water pipe that needs to connect to existing infrastructure, and the existing infrastructure was surveyed in GDA94, your as-built coordinates need to be in the same datum to confirm correct connection. Mixing datums in the as-built survey can create apparent discrepancies that don't exist physically.

**For boundary surveys and setout:** Cadastral surveys (land boundaries) in Australia are transitioning to GDA2020. On subdivisions and lot setout, confirm with the project surveyor which datum is being used for the legal boundary survey and whether this matches the engineering design datum.

**For CSV to KML conversion:** When you convert your survey control point CSV to KML for Google Earth, you need to specify the correct datum. If your CSV is in GDA94 coordinates and you tell the converter it's GDA2020 (or vice versa), the points will appear approximately 1.8 metres from their actual location. For viewing on Google Earth satellite imagery, this is usually visible — the markers won't align with the physical features (road edges, structures, marks) you can see in the imagery.

---

## How to Tell Which Datum Your Survey Uses

The datum should be stated explicitly in the survey documentation. Check:

1. **Survey report cover page** — Licensed surveyors are required to state the datum and map grid used on their reports
2. **Drawing title block** — Civil drawings typically include a note in the title block: "Coordinates: MGA Zone 55, GDA2020" or similar
3. **CSV export header** — Some software includes the datum in the file header or filename
4. **Machine control design package notes** — The design model documentation should specify the datum

If you're not sure, ask the surveyor directly. It's a straightforward question and a professional surveyor will give you a straight answer.

---

## MGA Zones: What They Are and Which One You're In

The Map Grid of Australia (MGA) divides Australia into 6-degree longitude zones numbered 46 to 56. Both GDA94 and GDA2020 use the same MGA zone system — the zones themselves haven't changed between datums.

Each zone has its own easting/northing origin. An easting of 322000 in Zone 55 is a completely different location from an easting of 322000 in Zone 54. Using the wrong zone when converting CSV to KML will put your control points hundreds of kilometres from where they should be on the map.

**MGA zone boundaries:**

| Zone | Longitude range | Areas covered |
|------|----------------|--------------|
| 49 | 114°–120°E | Far south-west WA |
| 50 | 120°–126°E | Perth region, south-west WA |
| 51 | 126°–132°E | Central WA, northern WA coast |
| 52 | 132°–138°E | NT (Darwin), northern SA |
| 53 | 138°–144°E | NT (Alice Springs), central QLD, north SA |
| 54 | 144°–150°E | North QLD, NW NSW, Cairns, Townsville |
| 55 | 150°–156°E | Brisbane, Gold Coast, Sydney, Melbourne, Adelaide |
| 56 | 156°–162°E | Far north QLD, Norfolk Island |

The boundary between Zone 54 and Zone 55 runs through mid-Queensland (approximately through Rockhampton and the NSW mid-north coast). The boundary between Zone 55 and Zone 56 runs through the far north of Queensland.

**For most Australian civil construction work:**
- Victoria, ACT, Tasmania, and southern NSW: Zone 55
- Sydney CBD: Zone 56 (the boundary clips just east of Sydney's CBD, but most of metropolitan Sydney sits in Zone 56)
- Brisbane, Gold Coast, and SEQ: Zone 56
- Adelaide and SA: Zone 54 and 55 (the boundary passes through the state)
- Perth and WA: Zone 50 and 51
- Darwin and NT: Zone 52 and 53

---

## The Coordinate Difference: How Large Is 1.8 Metres?

To make this concrete: the coordinate difference between GDA94 and GDA2020 for the same physical point in Victoria is approximately:

- Northing: +1.23 metres (GDA2020 northing is larger)
- Easting: +1.29 metres (GDA2020 easting is larger)
- Vector: approximately 1.8 metres total, bearing approximately north-northeast

These values vary slightly across Australia. In Queensland the shift is approximately 1.72–1.74 metres. In Western Australia it's approximately 1.76–1.78 metres.

For rough earthworks, this difference is within tolerance. For structural setout, service connections, and surveys that need to integrate with existing GDA94 infrastructure, it's not negligible.

---

## Converting Between GDA94 and GDA2020

If you need to convert control point coordinates from one datum to the other, the transformation is not just adding a fixed offset. The official transformation parameters are published by Geoscience Australia and are implemented in:

- **QGIS** (free GIS software): supports GDA94 to GDA2020 transformation via the NTv2 grid file
- **AUSPOS** (Geoscience Australia): online GPS processing service that outputs in GDA2020
- **Survey software** (Trimble Business Center, Leica Infinity, Topcon Magnet): support datum transformation with the appropriate transformation files installed
- **Geoscience Australia's PROD online tool**: coordinate transformation tool at ga.gov.au

For day-to-day field use, the simplest approach is to ensure your entire project — control survey, design model, machine control — is in the same datum from the start, rather than converting between them.

---

## Convert Your MGA Coordinates to Google Earth KML

Whether your survey is in GDA94 or GDA2020, the CivDocs CSV to KML converter supports both datums. Select the correct datum and zone before generating your KML, and every control point will appear correctly positioned on Google Earth satellite imagery.

[Open the CSV to KML Converter →](https://www.civdocs.com.au/free-tools/csv-to-kml)

---

## Frequently Asked Questions

**Do GDA94 and GDA2020 use the same MGA zone numbers?**
Yes. The MGA zone numbering (46–56) is the same for both GDA94 and GDA2020. The zone boundaries haven't changed. What changes between the datums is the coordinate values for any given physical point — approximately 1.8 metres different.

**How do I know if my survey is in GDA94 or GDA2020?**
Check the survey report cover page, the drawing title block, or ask your surveyor. The datum should be explicitly stated. Most surveys conducted since 2020 will be in GDA2020.

**Does the CSV to KML converter account for the datum correctly?**
The CivDocs converter uses the Redfearn series with the GRS80 ellipsoid, which is mathematically identical for both GDA94 and GDA2020 (both use GRS80). The datum selection in the converter affects the KML description labels — the actual coordinate conversion math is the same. For the purposes of viewing control points on Google Earth, the resulting positions are effectively identical between GDA94 and GDA2020 (1.8m difference is not visible at most Google Earth zoom levels used for site reconnaissance).

**What is the difference between MGA and UTM?**
MGA (Map Grid of Australia) is Australia's national adoption of the UTM (Universal Transverse Mercator) projection. The math is identical — MGA is UTM applied to Australian datums (GDA94 or GDA2020). Outside Australia, the same projection is called UTM. Inside Australia, MGA is the preferred terminology for engineering and cadastral surveys.

**Why did Australia change from GDA94 to GDA2020?**
The Australian tectonic plate moves approximately 7cm per year. Over the 26 years between the GDA94 epoch (1994) and the GDA2020 epoch (2020), this accumulated to approximately 1.8 metres. GDA2020 brings Australian coordinates back into close alignment with the current global reference frame (ITRF2014), which improves the accuracy of GPS-based positioning and simplifies integration with global datasets and satellite-based systems.

---

## Work With Your Survey Coordinates Correctly

[Convert Your CSV to KML — Free →](https://www.civdocs.com.au/free-tools/csv-to-kml)
