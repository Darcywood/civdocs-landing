import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type {
  MachineBasics,
  GraderSpecs,
  Section2Answers,
  TreatmentEntry,
} from '@/lib/risk-assessment/types';
import { GRADER_QUESTIONS } from '@/lib/risk-assessment/graderQuestions';

// ─── Styles ──────────────────────────────────────────────────────────────────

const DARK = '#1A1A1A';
const ACCENT = '#CC2222';
const MID_GREY = '#555555';
const LIGHT_GREY = '#F2F2F2';
const BORDER = '#CCCCCC';

const s = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 8.5, color: DARK, paddingHorizontal: 36, paddingTop: 28, paddingBottom: 40 },

  // Cover
  coverPage: { fontFamily: 'Helvetica', backgroundColor: DARK, color: '#ffffff', paddingHorizontal: 48, paddingTop: 60, paddingBottom: 40, flexDirection: 'column', justifyContent: 'space-between' },
  coverTitle: { fontSize: 22, fontFamily: 'Helvetica-Bold', letterSpacing: 2, marginBottom: 4, color: '#ffffff' },
  coverSubtitle: { fontSize: 11, color: '#cccccc', marginBottom: 36 },
  coverTable: { marginTop: 28, marginBottom: 28 },
  coverRow: { flexDirection: 'row', marginBottom: 5 },
  coverLabel: { width: 120, fontSize: 9, color: '#999999', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' },
  coverValue: { flex: 1, fontSize: 9.5, color: '#ffffff' },
  coverDivider: { borderTopWidth: 1, borderTopColor: '#444444', marginVertical: 20 },
  summaryBox: { backgroundColor: '#2A2A2A', borderRadius: 4, padding: 16, marginTop: 16 },
  summaryTitle: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#999999', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  summaryLabel: { fontSize: 9, color: '#cccccc' },
  summaryValue: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#ffffff' },
  coverBrand: { fontSize: 8, color: '#666666', marginTop: 24 },

  // Header/footer
  pageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: BORDER, paddingBottom: 6, marginBottom: 14 },
  pageHeaderLeft: { fontSize: 7.5, color: MID_GREY },
  pageHeaderRight: { fontSize: 7.5, color: MID_GREY },
  footer: { position: 'absolute', bottom: 18, left: 36, right: 36, flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 0.5, borderTopColor: BORDER, paddingTop: 5 },
  footerText: { fontSize: 7, color: '#999999' },

  // Section headers
  sectionTag: { backgroundColor: DARK, color: '#ffffff', fontFamily: 'Helvetica-Bold', fontSize: 9, paddingVertical: 5, paddingHorizontal: 10, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
  sectionIntro: { fontSize: 8, color: MID_GREY, lineHeight: 1.5, marginBottom: 14 },

  // TOC
  tocTitle: { fontSize: 14, fontFamily: 'Helvetica-Bold', marginBottom: 20 },
  tocRow: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderBottomColor: '#e5e5e5', paddingVertical: 7, marginBottom: 2 },
  tocSection: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: DARK },
  tocDesc: { fontSize: 8, color: MID_GREY, marginTop: 2 },
  tocPage: { fontSize: 8.5, color: MID_GREY },

  // Machine details
  specGroup: { marginBottom: 12 },
  specGroupTitle: { fontSize: 8, fontFamily: 'Helvetica-Bold', backgroundColor: LIGHT_GREY, paddingVertical: 4, paddingHorizontal: 8, marginBottom: 1, textTransform: 'uppercase', color: MID_GREY, letterSpacing: 0.5 },
  specRow: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#eeeeee' },
  specLabel: { width: '55%', fontSize: 8, paddingVertical: 4, paddingHorizontal: 8, color: MID_GREY },
  specValue: { flex: 1, fontSize: 8, paddingVertical: 4, paddingHorizontal: 8, fontFamily: 'Helvetica-Bold' },

  // Risk treatment rows
  treatmentSection: { marginBottom: 6 },
  treatmentCategoryLabel: { backgroundColor: '#444444', color: '#ffffff', fontSize: 8, fontFamily: 'Helvetica-Bold', paddingVertical: 4, paddingHorizontal: 8, marginBottom: 1, textTransform: 'uppercase', letterSpacing: 0.5 },
  treatmentCard: { borderWidth: 0.5, borderColor: BORDER, marginBottom: 6 },
  treatmentHeaderRow: { flexDirection: 'row', backgroundColor: LIGHT_GREY, borderBottomWidth: 0.5, borderBottomColor: BORDER, paddingVertical: 4, paddingHorizontal: 8, justifyContent: 'space-between', alignItems: 'center' },
  treatmentHazards: { fontSize: 8, fontFamily: 'Helvetica-Bold', flex: 1 },
  ratingPill: { flexDirection: 'row', alignItems: 'center', marginLeft: 6 },
  ratingLabel: { fontSize: 7, paddingHorizontal: 5, paddingVertical: 2, borderRadius: 2, fontFamily: 'Helvetica-Bold', color: '#ffffff' },
  ratingArrow: { fontSize: 7, marginHorizontal: 3, color: MID_GREY },
  treatmentNameRow: { paddingHorizontal: 8, paddingTop: 5, paddingBottom: 2 },
  treatmentName: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: DARK },
  treatmentType: { fontSize: 7, color: MID_GREY, marginTop: 1 },
  treatmentBody: { paddingHorizontal: 8, paddingBottom: 6 },
  treatmentText: { fontSize: 7.5, color: DARK, lineHeight: 1.5, marginTop: 2 },
  treatmentRefs: { fontSize: 7, color: MID_GREY, marginTop: 4, fontFamily: 'Helvetica-Oblique' },

  // Section 3 risk matrix
  matrixTitle: { fontSize: 10, fontFamily: 'Helvetica-Bold', marginBottom: 8 },
  matrixTable: { marginBottom: 16, borderWidth: 0.5, borderColor: BORDER },
  matrixHeaderRow: { flexDirection: 'row', backgroundColor: DARK },
  matrixHeaderCell: { flex: 1, paddingVertical: 5, paddingHorizontal: 4, fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: '#ffffff', textAlign: 'center', borderRightWidth: 0.5, borderRightColor: '#444' },
  matrixRow: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: BORDER },
  matrixCell: { flex: 1, paddingVertical: 4, paddingHorizontal: 4, fontSize: 7.5, borderRightWidth: 0.5, borderRightColor: BORDER, textAlign: 'center' },

  // Acknowledgement
  ackTitle: { fontSize: 12, fontFamily: 'Helvetica-Bold', marginBottom: 8 },
  ackIntro: { fontSize: 8, color: MID_GREY, lineHeight: 1.6, marginBottom: 20 },
  ackTable: { borderWidth: 0.5, borderColor: BORDER },
  ackHeaderRow: { flexDirection: 'row', backgroundColor: DARK },
  ackHeaderCell: { paddingVertical: 5, paddingHorizontal: 8, fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#ffffff', borderRightWidth: 0.5, borderRightColor: '#444' },
  ackDataRow: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: BORDER, minHeight: 28 },
  ackDataCell: { paddingVertical: 6, paddingHorizontal: 8, fontSize: 8, borderRightWidth: 0.5, borderRightColor: BORDER },

  emptySection: { paddingVertical: 24, alignItems: 'center' },
  emptySectionText: { fontSize: 9, color: '#aaaaaa', fontFamily: 'Helvetica-Oblique' },
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

function ratingColor(label: string): string {
  switch (label) {
    case 'CRITICAL': return '#8B0000';
    case 'HIGH': return '#CC4400';
    case 'MEDIUM': return '#CC8800';
    case 'LOW': return '#336633';
    default: return '#555';
  }
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PageHeader({ basics }: { basics: MachineBasics }) {
  return (
    <View style={s.pageHeader} fixed>
      <Text style={s.pageHeaderLeft}>{basics.make} {basics.model} | {basics.machineType} | {basics.assetNumber}</Text>
      <Text style={s.pageHeaderRight}>Assessed By {basics.assessorName} | {formatDate(basics.date)}</Text>
    </View>
  );
}

function PageFooter({ pageLabel }: { pageLabel?: string }) {
  return (
    <View style={s.footer} fixed>
      <Text style={s.footerText}>{pageLabel ?? 'CivDocs Risk Management Report'}</Text>
      <Text style={s.footerText} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
    </View>
  );
}

function RatingPills({ prelim, residual }: { prelim: { label: string; value: number }; residual: { label: string; value: number } }) {
  return (
    <View style={s.ratingPill}>
      <Text style={[s.ratingLabel, { backgroundColor: ratingColor(prelim.label) }]}>{prelim.label} {prelim.value}</Text>
      <Text style={s.ratingArrow}>→</Text>
      <Text style={[s.ratingLabel, { backgroundColor: ratingColor(residual.label) }]}>{residual.label} {residual.value}</Text>
    </View>
  );
}

function TreatmentBlock({ entry, inPlace }: { entry: TreatmentEntry; inPlace: boolean }) {
  const t = entry.treatment;
  return (
    <View style={s.treatmentCard} wrap={false}>
      <View style={s.treatmentHeaderRow}>
        <Text style={s.treatmentHazards}>{t.hazards.join(', ')}</Text>
        <RatingPills prelim={t.prelimRating} residual={t.residualRating} />
      </View>
      <View style={s.treatmentNameRow}>
        <Text style={s.treatmentName}>{inPlace ? 'Risk Treatments in Place: ' : 'Risk Treatment Required: '}{t.name}</Text>
      </View>
      <View style={s.treatmentBody}>
        <Text style={s.treatmentText}>{t.treatmentText}</Text>
        <Text style={s.treatmentRefs}>References: {t.references}</Text>
      </View>
    </View>
  );
}

// ─── Spec helpers ────────────────────────────────────────────────────────────

function SpecGroup({ title, rows }: { title: string; rows: [string, string | undefined][] }) {
  const filled = rows.filter(([, v]) => v);
  if (filled.length === 0) return null;
  return (
    <View style={s.specGroup} wrap={false}>
      <Text style={s.specGroupTitle}>{title}</Text>
      {filled.map(([label, value]) => (
        <View key={label} style={s.specRow}>
          <Text style={s.specLabel}>{label}</Text>
          <Text style={s.specValue}>{value}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Main document ────────────────────────────────────────────────────────────

export interface RiskAssessmentPdfProps {
  basics: MachineBasics;
  specs: GraderSpecs;
  answers: Section2Answers;
  assessorNotes?: string;
}

export default function RiskAssessmentPdf({ basics, specs, answers, assessorNotes }: RiskAssessmentPdfProps) {
  // Build treatment lists
  const inPlaceTreatments: TreatmentEntry[] = [];
  const requiredTreatments: TreatmentEntry[] = [];

  GRADER_QUESTIONS.forEach((q) => {
    const answer = answers[q.id];
    if (!answer || answer === 'na') return;
    if (answer === 'yes') inPlaceTreatments.push({ treatment: q.treatment, questionId: q.id });
    if (answer === 'no') requiredTreatments.push({ treatment: q.treatment, questionId: q.id });
  });

  // Group in-place by operation category
  const categories: Array<'DELIVERY' | 'OPERATION' | 'DESIGN COMPLIANCE' | 'MAINTENANCE'> = ['DELIVERY', 'OPERATION', 'DESIGN COMPLIANCE', 'MAINTENANCE'];

  const groupedInPlace = categories.reduce((acc, cat) => {
    acc[cat] = inPlaceTreatments.filter((e) => e.treatment.operationCategory === cat);
    return acc;
  }, {} as Record<string, TreatmentEntry[]>);

  const groupedRequired = categories.reduce((acc, cat) => {
    acc[cat] = requiredTreatments.filter((e) => e.treatment.operationCategory === cat);
    return acc;
  }, {} as Record<string, TreatmentEntry[]>);

  const extrasChecked = [
    specs.extras_air_conditioning && 'Air Conditioning',
    specs.extras_drawbar && 'Drawbar',
    specs.extras_final_trim && 'Final Trim Equipment',
    specs.extras_fops && 'FOPS',
    specs.extras_front_grader_blade && 'Front Grader Blade',
    specs.extras_grader_blade && 'Grader Blade',
    specs.extras_rippers_centre && 'Rippers – Centre',
    specs.extras_rippers_rear && 'Rippers – Rear',
    specs.extras_roller_attachment && 'Roller Attachment',
    specs.extras_rops_cabin && 'ROPS – Cabin',
    specs.extras_wheel_chocks && 'Wheel Chocks',
  ].filter(Boolean) as string[];

  return (
    <Document>
      {/* ── COVER PAGE ─────────────────────────────────────────────────── */}
      <Page size="A4" style={s.coverPage}>
        <View>
          <Text style={s.coverTitle}>RISK MANAGEMENT REPORT</Text>
          <Text style={s.coverSubtitle}>Prepared by CivDocs</Text>

          <View style={s.coverDivider} />

          <View style={s.coverTable}>
            {[
              ['TYPE', basics.machineType],
              ['MAKE', basics.make],
              ['MODEL', basics.model],
              ['ASSET NUMBER', basics.assetNumber],
              ['REGISTRATION', basics.registration],
              ['REPORT NUMBER', basics.reportNumber],
              ['DATE', formatDate(basics.date)],
              ['ASSESSMENT PURPOSE', basics.assessmentPurpose],
              ['STATE', basics.state],
              ['CREATED BY', basics.assessorName],
              ['OWNER', basics.owner],
            ].map(([label, value]) => (
              <View key={label} style={s.coverRow}>
                <Text style={s.coverLabel}>{label}</Text>
                <Text style={s.coverValue}>{value || '—'}</Text>
              </View>
            ))}
          </View>

          <View style={s.summaryBox}>
            <Text style={s.summaryTitle}>Summary</Text>
            {[
              ['Risk Treatments In Place', inPlaceTreatments.length],
              ['Risk Treatments Required', requiredTreatments.length],
              ['Critical', requiredTreatments.filter((e) => e.treatment.prelimRating.label === 'CRITICAL').length],
              ['High', requiredTreatments.filter((e) => e.treatment.prelimRating.label === 'HIGH').length],
              ['Medium', requiredTreatments.filter((e) => e.treatment.prelimRating.label === 'MEDIUM').length],
              ['Low', requiredTreatments.filter((e) => e.treatment.prelimRating.label === 'LOW').length],
            ].map(([label, value]) => (
              <View key={String(label)} style={s.summaryRow}>
                <Text style={s.summaryLabel}>{label}:</Text>
                <Text style={s.summaryValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={s.coverBrand}>Generated by CivDocs  ·  civdocs.com.au  ·  {basics.reportNumber}</Text>
      </Page>

      {/* ── TABLE OF CONTENTS ──────────────────────────────────────────── */}
      <Page size="A4" style={s.page}>
        <PageHeader basics={basics} />
        <Text style={s.tocTitle}>Table of Contents</Text>
        {[
          ['SECTION 1', 'Important Information', 'Contains the scope and limitations applicable to this report'],
          ['SECTION 2', 'Machine Details', 'Contains standard machine specifications and details of any extras fitted'],
          ['SECTION 3', 'Risk Analysis / Risk Evaluation', 'Contains details of the technique used to calculate risk ratings'],
          ['SECTION 4', 'Risk Treatments Required', 'Contains risk treatments to be implemented'],
          ['SECTION 5', 'Risk Treatments In Place', 'Contains risk treatments currently in place on this item of plant'],
          ['SECTION 6', 'Images and Notes', 'Contains images and any relevant information entered by the assessor'],
        ].map(([section, title, desc]) => (
          <View key={section} style={s.tocRow}>
            <View style={{ flex: 1 }}>
              <Text style={s.tocSection}>{section}  {title}</Text>
              <Text style={s.tocDesc}>{desc}</Text>
            </View>
          </View>
        ))}
        <PageFooter />
      </Page>

      {/* ── SECTION 1: IMPORTANT INFORMATION ──────────────────────────── */}
      <Page size="A4" style={s.page}>
        <PageHeader basics={basics} />
        <Text style={s.sectionTag}>Section 1  Important Information</Text>
        <Text style={s.sectionIntro}>
          This report was generated by CivDocs on {formatDate(basics.date)}.{'\n\n'}
          All operators of this item of plant must read and understand this report prior to operating this item of plant. This report pertains to this item of plant as it appeared on the day of inspection.{'\n\n'}
          The safety hazards associated with the operating and maintaining of this item of plant have been identified as far as practical by visual inspection. The condition of this item of plant will change with use. No physical testing has been conducted (eg. Wire rope tests, stress tests, structural/non-destructive tests, noise tests, vibration tests, brake tests, insulation tests etc.) unless stated otherwise in the notes.{'\n\n'}
          Controls outlined in both Section 4 & 5 of this report must be maintained at all times whilst this item of plant is in operation.{'\n\n'}
          Any information contained in the notes section of this report shall be read in conjunction with Section 3. Any information relating to standard features have been supplied via the manufacturer and shall be used as a guide only until verified.{'\n\n'}
          Additional Risk Assessment may be required, specific to the operating environment, for this item of plant.{'\n\n'}
          All operators and maintenance personnel must be appropriately trained in the use & maintenance of this item of plant.{'\n\n'}
          For further information regarding this report contact CivDocs at civdocs.com.au.
        </Text>
        <PageFooter />
      </Page>

      {/* ── SECTION 2: MACHINE DETAILS ─────────────────────────────────── */}
      <Page size="A4" style={s.page}>
        <PageHeader basics={basics} />
        <Text style={s.sectionTag}>Section 2  Machine Details</Text>

        <SpecGroup title="Machine Identification" rows={[
          ['Make / Model', `${basics.make} – ${basics.model}`],
          ['Type', basics.machineType],
          ['Asset Number', basics.assetNumber],
          ['Registration', basics.registration],
          ['Assessment Purpose', basics.assessmentPurpose],
          ['State', basics.state],
          ['Owner', basics.owner],
          ['Assessor', basics.assessorName],
        ]} />

        <SpecGroup title="Noise Test Results" rows={[
          ["Manufacturer's specified noise level dBA", specs.noise_mfr_dba],
          ['Ambient noise level dBA', specs.noise_ambient_dba],
          ['Noise level – Operator position (high idle) dBA', specs.noise_operator_high],
          ['Noise level – Operator position (low idle) dBA', specs.noise_operator_low],
          ['Noise level LHS dBA (high idle)', specs.noise_lhs],
          ['Noise level Front dBA (high idle)', specs.noise_front],
          ['Noise level RHS dBA (high idle)', specs.noise_rhs],
          ['Noise level Rear dBA (high idle)', specs.noise_rear],
        ]} />

        <SpecGroup title="Blade" rows={[
          ['Blade height (mm)', specs.blade_height_mm],
          ['Blade length (mm)', specs.blade_length_mm],
          ['Blade lift (mm)', specs.blade_lift_mm],
          ['Blade thickness (mm)', specs.blade_thickness_mm],
          ['Blade tilt Fwd/Back (deg)', specs.blade_tilt],
        ]} />

        <SpecGroup title="Body Type" rows={[
          ['Articulated/Rigid', specs.body_type],
          ['Articulation, either side (deg)', specs.articulation_deg],
        ]} />

        <SpecGroup title="Capacities" rows={[
          ['Fuel Tank Capacity (L)', specs.fuel_capacity_l],
          ['Hydraulic Oil Tank Capacity (L)', specs.hydraulic_oil_capacity_l],
        ]} />

        <SpecGroup title="Dimensions / Weights" rows={[
          ['Front axle total oscillation (deg)', specs.front_axle_oscillation],
          ['Height to top of cab (mm)', specs.height_cab_mm],
          ['Length (mm)', specs.length_mm],
          ['Operating weight (kg)', specs.operating_weight_kg],
          ['Shoulder reach L/R (mm)', specs.shoulder_reach],
          ['Turn circle diameter (mm)', specs.turn_circle_mm],
          ['Width without blade (mm)', specs.width_no_blade_mm],
        ]} />

        <SpecGroup title="Drives" rows={[['Drive', specs.drive]]} />

        <SpecGroup title="Engine" rows={[
          ['Engine Make & Model', specs.engine_make_model],
          ['Engine Number', specs.engine_number],
          ['Engine Displacement', specs.engine_displacement],
          ['Engine Hours', specs.engine_hours],
          ['Number of Cylinders', specs.engine_cylinders],
          ['Net engine power, 1st gear (kW @ rpm)', specs.engine_power],
          ['Torque (Nm@rpm)', specs.engine_torque],
          ['Torque rise (%)', specs.engine_torque_rise],
          ['Variable power, net, max (kW@rpm)', specs.engine_variable_power],
        ]} />

        <SpecGroup title="Hydraulics" rows={[
          ['Hydraulic Oil Flow (l/min)', specs.hydraulic_flow],
          ['Hydraulic Oil Pressure (Bar)', specs.hydraulic_pressure],
          ['Hydraulic System', specs.hydraulic_system],
        ]} />

        <SpecGroup title="Plant Classification" rows={[
          ['Class', specs.plant_class],
          ['Year', specs.plant_year],
        ]} />

        <SpecGroup title="Safety Structures" rows={[
          ['ROPS Compliance No.', specs.rops_compliance],
          ['ROPS Serial No.', specs.rops_serial],
          ['FOPS Compliance No.', specs.fops_compliance],
          ['FOPS Serial No.', specs.fops_serial],
        ]} />

        <SpecGroup title="Steering" rows={[['Front wheel lean, L/R (deg)', specs.front_wheel_lean]]} />

        <SpecGroup title="Transmission" rows={[
          ['Maximum speed Fwd/Rev (km/h)', specs.max_speed],
          ['Speeds F/R', specs.speeds_fr],
          ['Transmission', specs.transmission],
        ]} />

        <SpecGroup title="Tyres" rows={[['Tyre Size', specs.tyre_size]]} />

        {extrasChecked.length > 0 && (
          <SpecGroup title="Extras Fitted" rows={extrasChecked.map((e) => [e, '✓'] as [string, string])} />
        )}

        <PageFooter />
      </Page>

      {/* ── SECTION 3: RISK ANALYSIS ───────────────────────────────────── */}
      <Page size="A4" style={s.page}>
        <PageHeader basics={basics} />
        <Text style={s.sectionTag}>Section 3  Risk Analysis / Risk Evaluation</Text>

        <Text style={s.sectionIntro}>
          Risk ratings in this report are calculated using a likelihood × consequence matrix in accordance with AS/NZS ISO 31000 – Risk Management. The preliminary risk rating represents the risk level without any controls in place. The residual risk rating represents the risk level after the recommended risk treatments have been applied.
        </Text>

        <Text style={s.matrixTitle}>Risk Rating Matrix</Text>
        <View style={s.matrixTable}>
          <View style={s.matrixHeaderRow}>
            <Text style={[s.matrixHeaderCell, { flex: 1.5 }]}>Likelihood / Consequence</Text>
            {['Insignificant', 'Minor', 'Moderate', 'Major', 'Catastrophic'].map((c) => (
              <Text key={c} style={s.matrixHeaderCell}>{c}</Text>
            ))}
          </View>
          {[
            ['Almost Certain', '9', '12', '16', '20', '25'],
            ['Likely', '7', '10', '14', '18', '22'],
            ['Possible', '5', '8', '12', '15', '19'],
            ['Unlikely', '3', '6', '9', '13', '17'],
            ['Rare', '1', '2', '4', '7', '11'],
          ].map(([likelihood, ...cells]) => (
            <View key={likelihood} style={s.matrixRow}>
              <Text style={[s.matrixCell, { flex: 1.5, textAlign: 'left' }]}>{likelihood}</Text>
              {cells.map((cell, i) => (
                <Text key={i} style={s.matrixCell}>{cell}</Text>
              ))}
            </View>
          ))}
        </View>

        <View wrap={false}>
          {[
            ['CRITICAL', '≥ 24', 'Immediate action required. Do not operate until controls are in place.', '#8B0000'],
            ['HIGH', '17–23', 'Action required urgently, within 24–48 hours.', '#CC4400'],
            ['MEDIUM', '9–16', 'Action required within 7–14 days.', '#CC8800'],
            ['LOW', '1–8', 'Monitor and review. Action as resources allow.', '#336633'],
          ].map(([level, range, desc, color]) => (
            <View key={level} style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'flex-start' }}>
              <View style={{ backgroundColor: color as string, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 2, marginRight: 8, minWidth: 70 }}>
                <Text style={{ color: '#fff', fontSize: 7.5, fontFamily: 'Helvetica-Bold' }}>{level} ({range})</Text>
              </View>
              <Text style={{ fontSize: 7.5, flex: 1, color: MID_GREY, lineHeight: 1.5 }}>{desc}</Text>
            </View>
          ))}
        </View>

        <PageFooter />
      </Page>

      {/* ── SECTION 4: RISK TREATMENTS REQUIRED ──────────────────────── */}
      <Page size="A4" style={s.page}>
        <PageHeader basics={basics} />
        <Text style={s.sectionTag}>Section 4  Risk Treatments Required</Text>
        <Text style={s.sectionIntro}>
          This section of the report pertains to hazards created by use of this item of plant which currently do not have risk treatments in place. The risk treatments recommended in this section have been developed based on relevant Australian Standards, health & safety legislation, the hierarchy of risk treatment in accordance with the guidelines set forth in AS/NZS ISO 31000 – Risk Management and various other sources. The recommended risk treatment measures must be developed, implemented and validated as effective prior to the operation, maintenance or testing of this item of plant.
        </Text>

        {requiredTreatments.length === 0 ? (
          <View style={s.emptySection}>
            <Text style={s.emptySectionText}>No risk treatments required — all assessed items are compliant.</Text>
          </View>
        ) : (
          categories.map((cat) =>
            groupedRequired[cat].length > 0 ? (
              <View key={cat} style={s.treatmentSection}>
                <Text style={s.treatmentCategoryLabel}>{cat}</Text>
                {groupedRequired[cat].map((entry) => (
                  <TreatmentBlock key={entry.questionId} entry={entry} inPlace={false} />
                ))}
              </View>
            ) : null
          )
        )}
        <PageFooter />
      </Page>

      {/* ── SECTION 5: RISK TREATMENTS IN PLACE ──────────────────────── */}
      <Page size="A4" style={s.page}>
        <PageHeader basics={basics} />
        <Text style={s.sectionTag}>Section 5  Risk Treatments In Place</Text>
        <Text style={s.sectionIntro}>
          This section of the report pertains to risk treatments currently in place on this item of plant. This section must be read in conjunction with the safety section of the manufacturer's handbook. All operators must read and understand the entire contents of this section prior to operating this item of plant. These treatments or equivalent must remain in place at all times whilst this item of plant is in operation.
        </Text>

        {inPlaceTreatments.length === 0 ? (
          <View style={s.emptySection}>
            <Text style={s.emptySectionText}>No risk treatments recorded as in place for this assessment.</Text>
          </View>
        ) : (
          categories.map((cat) =>
            groupedInPlace[cat].length > 0 ? (
              <View key={cat} style={s.treatmentSection}>
                <Text style={s.treatmentCategoryLabel}>{cat}</Text>
                {groupedInPlace[cat].map((entry) => (
                  <TreatmentBlock key={entry.questionId} entry={entry} inPlace={true} />
                ))}
              </View>
            ) : null
          )
        )}
        <PageFooter />
      </Page>

      {/* ── SECTION 6: IMAGES AND NOTES ──────────────────────────────── */}
      <Page size="A4" style={s.page}>
        <PageHeader basics={basics} />
        <Text style={s.sectionTag}>Section 6  Images and Notes</Text>

        {assessorNotes ? (
          <View>
            <Text style={[s.specGroupTitle, { marginBottom: 8 }]}>NOTES</Text>
            <Text style={{ fontSize: 8, lineHeight: 1.6, color: DARK }}>{assessorNotes}</Text>
          </View>
        ) : (
          <View style={s.emptySection}>
            <Text style={s.emptySectionText}>– No Notes Available –</Text>
          </View>
        )}
        <PageFooter />
      </Page>

      {/* ── OPERATOR ACKNOWLEDGEMENT ──────────────────────────────────── */}
      <Page size="A4" style={s.page}>
        <View style={s.coverPage as object}>
          <View>
            <Text style={s.coverTitle}>RISK MANAGEMENT REPORT</Text>
            <Text style={s.coverSubtitle}>Operator Acknowledgement</Text>
            <View style={s.coverDivider} />
            {[
              ['TYPE', basics.machineType],
              ['MAKE', basics.make],
              ['MODEL', basics.model],
              ['ASSET NUMBER', basics.assetNumber],
              ['REGISTRATION', basics.registration],
              ['REPORT NUMBER', basics.reportNumber],
              ['DATE', formatDate(basics.date)],
              ['ASSESSOR', basics.assessorName],
              ['OWNER', basics.owner],
            ].map(([label, value]) => (
              <View key={label} style={s.coverRow}>
                <Text style={s.coverLabel}>{label}</Text>
                <Text style={s.coverValue}>{value || '—'}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{ paddingHorizontal: 36, paddingTop: 24 }}>
          <Text style={s.ackTitle}>Operator Acknowledgement</Text>
          <Text style={s.ackIntro}>
            I the undersigned acknowledge that I have read and understand the risk management report described above.{'\n'}
            I also acknowledge that I have received a copy of this risk management report.
          </Text>
          <View style={s.ackTable}>
            <View style={s.ackHeaderRow}>
              {['Date', 'Name', 'Company / Position', 'Signature'].map((h, i) => (
                <Text key={h} style={[s.ackHeaderCell, i === 3 ? { flex: 2 } : { flex: 1 }]}>{h}</Text>
              ))}
            </View>
            {[1, 2, 3, 4].map((row) => (
              <View key={row} style={s.ackDataRow}>
                {[1, 2, 3, 4].map((col) => (
                  <Text key={col} style={[s.ackDataCell, col === 4 ? { flex: 2 } : { flex: 1 }]}> </Text>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
