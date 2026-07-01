# How to Set Up on a Control Point Without Shooting Retros for an Hour (Australia 2026)

There's a familiar scene on civil sites all over Australia. The survey company has sent a CSV of control points. The grader operator or site engineer arrives on site, sets up the total station somewhere sensible, and starts shooting marks. Third retro in, the coordinates still don't match. They move. Try again. It's forty minutes into the morning and they're still not set up.

The problem isn't that the marks are wrong. It's that nobody knows where the marks actually are. The CSV is a list of coordinates. The marks are dots in a paddock. Without knowing which dot corresponds to which coordinate — before you arrive on site — you end up shooting everything until something matches.

This is a solved problem. Converting your control point CSV to KML and opening it in Google Earth before you arrive on site takes less than three minutes and turns a guessing exercise into a planned setup with known sight lines, verified accessibility, and a clear map of where every mark is before the machine is off the truck.

---

## The Actual Problem: You Don't Know Where the Marks Are

A survey control point CSV looks like this:

```
RM1, 322145.234, 5812007.891, 87.456
CB001, 322387.109, 5812234.671, 91.023
TBM-01, 321987.450, 5811895.230, 86.778
```

The coordinates tell you precisely where each mark is — in MGA terms. But on the ground, a mark is a brass plug in a concrete block, a steel pin with a witness post, or a PK nail in a road kerb. They don't announce themselves.

Without a way to visualise the coordinate grid against the physical landscape, you're navigating by dead reckoning. You know the coordinates but you can't see where they are relative to the site features — the access track, the fence line, the cutting that's already been started, the utilities trench.

A KML in Google Earth solves this by rendering every point as a named marker on satellite imagery. You can see RM1 is at the end of the gravel track, CB001 is on top of the embankment on the western boundary, and TBM-01 is in the middle of the proposed bulk cut (which means it's going to be buried if you don't use it before the 'dozer comes through).

That's information worth having before you drive to site.

---

## Step 1: Get the CSV from the Survey Company

When the survey company mobilises a control survey, they'll provide you with a handover document. This should include:

- The survey report (listing all marks, their coordinates, datum, zone, and a description of each mark's physical form and location)
- A CSV or job file with the coordinates in a format compatible with your total station software

The format you want for Google Earth conversion is the standard comma-separated format:

```
Name, Easting, Northing, Elevation
```

If the survey company sends you a Trimble JXL, DC file, or other proprietary job file, ask them to also export a CSV. Most survey software exports to CSV in two clicks. A surveyor who can't produce a CSV from their job file shouldn't be doing survey control.

If you only have a PDF report with coordinates in a table, you can manually type the values into a CSV in a text editor or Excel — it's tedious but it works for small control networks.

---

## Step 2: Convert the CSV to KML

Go to [civdocs.com.au/free-tools/csv-to-kml](https://www.civdocs.com.au/free-tools/csv-to-kml).

Upload your CSV. Select the datum (GDA2020 for most surveys since 2020; GDA94 for older projects). Select the MGA zone — if you're not sure which zone, hit "Find My Zone" to use your device's location.

Click Generate. The tool converts your MGA coordinates to geographic coordinates (lat/lon) using the Redfearn series and produces a KML file. It also shows you an interactive preview map with all points plotted — a quick sanity check that the points appear in the right geographic area before you download.

Download the KML file. The whole process takes under two minutes from CSV to downloaded KML.

---

## Step 3: Open in Google Earth and Do Your Setup Planning

Open Google Earth for Web at earth.google.com (or the desktop application). Go to New → Local KML file and select your downloaded KML.

All your control points appear as named markers on the satellite imagery.

**What you're looking for:**

**Accessible marks.** Which marks can you drive to or walk to with a tripod? If RM1 is behind a locked gate that the developer hasn't given you a key for, you need to know that before you get on site.

**Which marks are safe for the duration of the job.** A mark in the middle of the proposed cut is going to be destroyed. A mark on the existing road pavement is going to be overlaid. Identify which marks will survive the earthworks program and which need to be transferred before they're lost.

**Which marks you can see from your proposed instrument positions.** For a backsight/foresight setup, you need two marks you can see from your instrument position. With marks on the map, you can visually trace whether a sight line from your proposed position to two marks is clear — or whether there's an embankment, a windrow, or a shed in the way.

**Mark separation and geometry.** For most control setups, you want your backsight and foresight marks to be as far apart as possible and at a reasonable angle to your instrument position. The map lets you assess this before you're on site with a tripod up and realising your two closest marks are 30 metres apart and directly in line with each other.

**Elevation of marks vs work area.** Google Earth's terrain mode gives you a rough idea of relative elevation across the site. This helps confirm that a mark near the top of an embankment is actually above the work area and will have line of sight to machines in the cut.

---

## Step 4: Plan Your Instrument Setup Before You Leave the Office

After reviewing the marks in Google Earth, you should be able to plan:

1. **Which marks you're using as your primary control.** Usually two or three marks from which all your setout can be derived with minimal moves.

2. **Where your first instrument position will be.** Pick a position that gives you clear sight lines to both your primary control marks and clear sight lines to the area you're setting out.

3. **A backup if a mark is inaccessible or destroyed.** Know which marks are available as alternatives before you discover the primary mark has been grubbed out.

4. **Any transfer points needed before earthworks start.** If marks are going to be lost to bulk cut, establish a transfer point in a stable location before earthworks begin. Mark it on your Google Earth KML so you have its position recorded.

With this planned, your on-site setup is a confirmation exercise, not a discovery exercise. You know where you're going, which marks you're using, and what your backup options are.

---

## The Shooting Retros Problem: Why It Happens and How to Stop It

Shooting retros to establish position — selecting a random instrument position and observing marks until you find two that match the job coordinate system — is a time-consuming field method that's often used when proper planning hasn't been done.

The specific failure mode:

1. You arrive on site and can't find the marks from the survey report (because you don't know where they are on the ground)
2. You observe whatever marks you can see
3. The residuals don't close, because you've observed a mixture of marks from different surveys or construction-placed marks that aren't on the control network
4. You try different combinations until something closes

This can take anywhere from 20 minutes to most of a morning, depending on how many marks are in the area and how carefully they were described in the survey report.

The solution is not faster retro-shooting. It's knowing where the marks are before you start — which is exactly what a KML in Google Earth gives you.

With a KML on Google Earth, you walk straight to RM1 because you can see on the satellite image that it's beside the concrete headwall at the northern end of the drainage structure. You set up, observe CB001 and TBM-01 as your known points, and you're working inside twenty minutes.

---

## Using the CivDocs App on Site

If you use CivDocs on site, the control point KML can be loaded into the app's 3D map. Each point appears as a named marker on the live map with your current GPS position visible alongside the control network. From the cab of a machine or walking the site, you can see your distance and bearing to each mark from your current position.

This is the difference between navigating with a map and navigating with a GPS. The 3D map in CivDocs puts you on the map, alongside the control network, rather than reading coordinates off a screen and estimating direction.

---

## Summary: The Three-Minute Setup Plan

Before you go to site:

1. Get the control point CSV from the survey company
2. Convert to KML at [civdocs.com.au/free-tools/csv-to-kml](https://www.civdocs.com.au/free-tools/csv-to-kml) — takes under two minutes
3. Open in Google Earth, review mark locations, plan your instrument position and control marks

On site:

1. Go directly to your planned instrument position
2. Observe your two planned control marks
3. Verify residuals, adjust if necessary
4. Proceed to setout

The difference between planning this in the office and discovering it on site is measured in hours per week, across every setup on every job.

---

## Convert Your Survey CSV to KML for Free

[Open the CSV to KML Converter →](https://www.civdocs.com.au/free-tools/csv-to-kml)

No login. No account. Works with Trimble, Topcon, Leica, and any total station CSV export. GDA2020 and GDA94, MGA Zones 46–56.

---

## Frequently Asked Questions

**What if the survey company hasn't sent me a CSV?**
Ask for one. Any licensed surveyor can export a CSV from their job file. If they've provided a PDF report with coordinates in a table, you can manually create a CSV in a text editor (Name, Easting, Northing, Elevation, one row per point). For a small control network of 10–15 marks, this takes less than five minutes.

**What if the satellite imagery in Google Earth is out of date for my site?**
Google Earth imagery is updated regularly but is not live. For a new development area, the satellite imagery may show paddock or pre-development condition. The marks will still appear in the correct geographic position — the imagery just won't show site works that are more recent than the last image capture. The mark locations relative to known permanent features (roads, buildings, boundaries) will still be identifiable.

**Can I share the KML with the grader operator or machine control tech?**
Yes. Email the KML file or share it via any file sharing service. Anyone with Google Earth (free) can open the KML and see the control point locations. For machine control techs, it's useful context for confirming the control network before calibrating.

**What if I have both old GDA94 marks and new GDA2020 marks on the same site?**
If the survey company has provided marks in both datums (common on projects that connect to existing infrastructure), you need to be careful. Confirm with the surveyor which marks are in which datum, and whether the design model and machine control setup are referenced to one datum consistently. Mixing GDA94 and GDA2020 marks in the same setup introduces approximately 1.8 metres of systematic error.

**Does this work for drainage setout as well as grading?**
Yes. The workflow is the same for any setout task where control points are involved — bulk earthworks, drainage setout, pavement setout, structure setout. The KML shows you where the marks are; the total station setup on those marks is how you extend the coordinate system to the work area.

---

## Stop Shooting Retros

[Convert Your Control Points to KML →](https://www.civdocs.com.au/free-tools/csv-to-kml)
