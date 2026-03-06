import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import type {
  MachineBasics,
  GraderSpecs,
  ExcavatorSpecs,
  PosiTrackSpecs,
  RollerSpecs,
  Section2Answers,
  TreatmentEntry,
} from '@/lib/risk-assessment/types';
import { GRADER_QUESTIONS } from '@/lib/risk-assessment/graderQuestions';
import { EXCAVATOR_QUESTIONS } from '@/lib/risk-assessment/excavatorQuestions';
import { POSI_TRACK_QUESTIONS } from '@/lib/risk-assessment/posiTrackQuestions';
import { ROLLER_QUESTIONS } from '@/lib/risk-assessment/rollerQuestions';

// ─── Colour tokens ────────────────────────────────────────────────────────────

const NAVY        = '#1B3A6B';
const ORANGE      = '#F97316';
const BLUE_SOFT   = '#EBF4FF';
const BLUE_MED    = '#2563EB';
const DARK        = '#111827';
const MID_GREY    = '#6B7280';
const LIGHT_GREY  = '#F9FAFB';
const BORDER      = '#E5E7EB';
const WHITE       = '#FFFFFF';

const CAT_COLOR: Record<string, string> = {
  DELIVERY:             '#2563EB',
  OPERATION:            '#D97706',
  'DESIGN COMPLIANCE':  '#0F766E',
  MAINTENANCE:          '#7C3AED',
};

const CAT_ICON: Record<string, string> = {
  DELIVERY:             'D',
  OPERATION:            'O',
  'DESIGN COMPLIANCE':  'DC',
  MAINTENANCE:          'M',
};

// Treatment name → icon filename (icons in public/icons-riskassesment/)
const TREATMENT_ICON: Record<string, string> = {
  'Operation Handbook': 'operation-handbook',
  'Maintenance Manual': 'maintenance-manual',
  'Service Records': 'service-records',
  'Pre-op Checklist Grader': 'pre-opp-checklist',
  'SOP Grader': 'sop-grader',
  'Operator Competency': 'operator-competency',
  'SWMS Loading/Unloading': 'swmns-loading-unloading',
  'SWMS Load Restraint': 'swmsload-restraint',
  'Brakes': 'brakes',
  'Park Brake': 'park-break',
  'Operator Work Area Access/Egress': 'hand-rails',
  'Access/Egress Instruction Label': 'access-egress-label',
  'Two Operator Exits': 'two-operator-exit',
  'Emergency Exits': 'emergency-exits',
  'Windows & Screens': 'windows-screens',
  'Windscreen Wipers': 'windscreen-wipers',
  'Loose Items - Operator Work Area': 'loose-items',
  'Work Area Floors': 'work-area-floors',
  'Operator Mirrors': 'operator-mirrors',
  'Operator Seat': 'operator-seat',
  'Seat Belt': 'seat-belt',
  'Passenger Seat Label': 'passenger-seat-label-only--label',
  'Air Conditioning': 'air-conditioning',
  'Open Cabin': 'open-cabin',
  'Phone Use Label': 'no-phone-use-label',
  'Rear Camera': 'rear-camera',
  'Handrails': 'hand-rails',
  'Restricted Access Switches': 'restricted-access',
  'Warning Device (Horn)': 'warning-device-horn',
  'Controls Ergonomics': 'controls-ergonomics',
  'Control Labels': 'control-labels',
  'Intuitive Controls': 'intutive-controls',
  'Control Levers/Pedals/Buttons': 'control-levers-pedals-buttons',
  'Neutral Start': 'neatral-start',
  'Reverse Movement Alarm': 'reverse-movement-alarm',
  'Emergency Stop/Shutdown Device': 'emergency-stop',
  'External Emergency Stop/Shutdown Device': 'external-emergency-stop',
  'Earthmoving ROPS': 'earthmoving-rops',
  'ROPS Damage': 'rops-damage',
  'ROPS Label': 'rops-label',
  'ROPS Seat Belt Label': 'rops-seat-belt-label',
  'FOPS General': 'fops-general',
  'FOPS Level II': 'fops-2',
  'Hearing Protection Label - Operator': 'hearing-protection-label',
  'Hearing Protection Label - Bystanders': 'hearing-protection-label',
  'Machine Lights': 'machine-lights',
  'Turning, Braking & Presence Lights': 'turning-breaking-precence-lights',
  'Beacon': 'beacon',
  'Front Grader Blade Label': 'front-grader-blade-label',
  'Engine Guards': 'engine-guards',
  'Engine Guard Label': 'engine-guard-label',
  'Exhaust': 'exhaust',
  'Engine Bay Access': 'engine-bay--access',
  'Battery Cover': 'battery-cover',
  'Battery Isolator': 'battery isolater',
  'Hydraulic Hoses': 'hydralic-hose',
  'Hydraulic Damage': 'hydralic-damage',
  'Hydraulic Hose Failure Shield': 'hydralic-hose-failure-shield',
  'Fire Extinguisher': 'fire-extinguisher',
  'Engine/Motor Compartment': 'engine-motor-compartment',
  'Grader Blade Label': 'grader-blade-label',
  'Tank ID Label': 'tank-id-label',
  'Articulated Joint Crush Label': 'articulated-joint-label',
  'Articulated Joint Locking Device': 'articilated-joint-locking-device',
  'Tyres': 'tyres',
  'Drawbar Capacity Label': 'drawbar-capacity-label',
  'Recovery Point Label': 'recovery-point-label',
  'Ripper Crush Zone Label': 'ripper-crush--zzone',
  'Roller Attachment': 'roller-attachement',
  'Vehicle Frequently Reversing': 'vechile-frequently-reversing',
  'Major Fluid Leaks': 'major-fluid-leaks',
  'Plant Modification': 'plant-modification',
  'Structural Integrity': 'structural-integrity',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function riskLevelForValue(v: number): { bg: string; fg: string; badge: string } {
  if (v >= 24) return { bg: '#FEE2E2', fg: '#7F1D1D', badge: '#B91C1C' };
  if (v >= 17) return { bg: '#FFEDD5', fg: '#9A3412', badge: '#C2410C' };
  if (v >=  9) return { bg: '#FEF9C3', fg: '#713F12', badge: '#A16207' };
  return             { bg: '#DCFCE7', fg: '#14532D', badge: '#15803D' };
}

function ratingBadgeColor(label: string): string {
  switch (label) {
    case 'CRITICAL': return '#B91C1C';
    case 'HIGH':     return '#C2410C';
    case 'MEDIUM':   return '#A16207';
    case 'LOW':      return '#15803D';
    default:         return MID_GREY;
  }
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  // ── Page base ──
  page: {
    fontFamily: 'Helvetica',
    fontSize: 8.5,
    color: DARK,
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 40,
  },
  pageInner: {
    paddingHorizontal: 36,
    paddingTop: 12,
  },

  // ── Cover ──
  coverPage: {
    fontFamily: 'Helvetica',
    fontSize: 8.5,
    color: DARK,
    backgroundColor: WHITE,
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  coverTopAccent: {
    height: 6,
    backgroundColor: NAVY,
  },
  coverLogoArea: {
    paddingHorizontal: 48,
    paddingTop: 28,
    paddingBottom: 12,
    alignItems: 'flex-start',
  },
  coverLogo: {
    width: 150,
    height: 60,
  },
  coverOrangeLine: {
    height: 3,
    backgroundColor: ORANGE,
    marginHorizontal: 48,
    marginBottom: 28,
  },
  coverContent: {
    paddingHorizontal: 48,
    flex: 1,
  },
  coverTitle: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: NAVY,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  coverSubtitle: {
    fontSize: 10.5,
    color: MID_GREY,
    marginBottom: 28,
  },
  coverDivider: {
    borderTopWidth: 1,
    borderTopColor: BORDER,
    marginBottom: 22,
  },
  coverRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER,
  },
  coverLabel: {
    width: 130,
    fontSize: 10,
    color: NAVY,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  coverValue: {
    flex: 1,
    fontSize: 9,
    color: DARK,
    fontFamily: 'Helvetica',
  },
  coverDividerBlue: {
    height: 1,
    backgroundColor: NAVY,
    marginVertical: 12,
  },
  coverDetailLabel: {
    width: 130,
    fontSize: 8.5,
    color: DARK,
    fontFamily: 'Helvetica-Bold',
  },
  coverTwoCol: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  coverLeftCol: {
    flex: 1,
    marginRight: 24,
  },
  summaryBox: {
    width: 140,
    backgroundColor: WHITE,
    borderWidth: 0.5,
    borderColor: BORDER,
    padding: 10,
  },
  summaryTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: NAVY,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
    textAlign: 'center',
  },
  summaryRiskLabel: {
    fontSize: 7.5,
    color: DARK,
    marginBottom: 6,
  },
  summaryInPlace: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  summaryInPlaceIcon: {
    fontSize: 9,
    color: '#15803D',
    marginRight: 6,
  },
  summaryRequired: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryRequiredIcon: {
    fontSize: 9,
    color: '#D97706',
    marginRight: 6,
  },
  summaryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginBottom: 2,
  },
  summaryBadgeText: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
  },
  coverFooter: {
    borderTopWidth: 2,
    borderTopColor: NAVY,
    marginHorizontal: 48,
    marginTop: 16,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coverFooterText: {
    fontSize: 7.5,
    color: MID_GREY,
  },

  // ── Page header (fixed) ──
  pageHeader: {
    backgroundColor: NAVY,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 36,
    height: 44,
  },
  headerLogo: {
    width: 65,
    height: 26,
  },
  headerDivider: {
    width: 1,
    height: 22,
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginHorizontal: 12,
  },
  headerMachineInfo: {
    flex: 1,
    fontSize: 8.5,
    color: WHITE,
    fontFamily: 'Helvetica-Bold',
  },
  headerSub: {
    fontSize: 7,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 1,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  headerReportNum: {
    fontSize: 7.5,
    color: ORANGE,
    fontFamily: 'Helvetica-Bold',
  },
  headerDate: {
    fontSize: 7,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 1,
  },

  // ── Page footer (absolute, fixed) ──
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 36,
    borderTopWidth: 2,
    borderTopColor: NAVY,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 36,
    backgroundColor: WHITE,
  },
  footerLogo: {
    width: 42,
    height: 17,
    marginRight: 12,
  },
  footerMachineDetailsBadge: {
    backgroundColor: NAVY,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 12,
    justifyContent: 'center',
  },
  footerMachineDetailsText: {
    fontSize: 6.5,
    fontFamily: 'Helvetica-Bold',
    color: WHITE,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  footerBlock: {
    flexDirection: 'column',
    marginRight: 18,
  },
  footerBlockRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  footerBlockLabel: {
    fontSize: 6.5,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
    width: 58,
  },
  footerBlockValue: {
    fontSize: 6.5,
    color: DARK,
  },
  footerDivider: {
    width: 1,
    height: 22,
    backgroundColor: BORDER,
    marginRight: 14,
  },
  footerSpacer: {
    flex: 1,
  },
  footerPageNum: {
    fontSize: 7,
    color: DARK,
  },

  // ── Section badge header ──
  sectionBadge: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  sectionBadgeNum: {
    backgroundColor: NAVY,
    color: WHITE,
    fontFamily: 'Helvetica-Bold',
    fontSize: 8.5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionBadgeTitle: {
    backgroundColor: BLUE_SOFT,
    color: NAVY,
    fontFamily: 'Helvetica-Bold',
    fontSize: 8.5,
    paddingVertical: 5,
    paddingHorizontal: 12,
    flex: 1,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionIntro: {
    fontSize: 8,
    color: MID_GREY,
    lineHeight: 1.65,
    marginBottom: 14,
  },

  // ── TOC ──
  tocTitle: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: NAVY,
    marginBottom: 20,
  },
  coverTocTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: NAVY,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  coverTocRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  coverTocSectionNum: {
    width: 48,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: NAVY,
  },
  coverTocRowDivider: {
    width: 1,
    backgroundColor: NAVY,
    marginHorizontal: 10,
    minHeight: 22,
  },
  coverTocEntry: {
    flex: 1,
  },
  coverTocEntryTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
    textTransform: 'uppercase',
  },
  coverTocEntryTitleOrange: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: ORANGE,
    textTransform: 'uppercase',
  },
  coverTocEntryTitleGreen: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#15803D',
    textTransform: 'uppercase',
  },
  coverTocDesc: {
    fontSize: 7,
    color: DARK,
    marginTop: 2,
    lineHeight: 1.4,
  },
  tocRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER,
  },
  tocBadge: {
    backgroundColor: NAVY,
    color: WHITE,
    fontFamily: 'Helvetica-Bold',
    fontSize: 7.5,
    paddingHorizontal: 7,
    paddingVertical: 2,
    marginRight: 10,
    marginTop: 1,
  },
  tocTitle2: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
  },
  tocDesc: {
    fontSize: 7.5,
    color: MID_GREY,
    marginTop: 2,
  },

  // ── Spec groups ──
  specGroup: {
    marginBottom: 10,
  },
  specGroupTitle: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    backgroundColor: NAVY,
    color: WHITE,
    paddingVertical: 4,
    paddingHorizontal: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Section 2 vertical sidebar
  section2Sidebar: {
    width: 24,
    backgroundColor: NAVY,
    paddingVertical: 8,
    paddingHorizontal: 2,
    alignItems: 'center',
    marginRight: 10,
    alignSelf: 'stretch',
  },
  section2SidebarText: {
    fontSize: 5.5,
    fontFamily: 'Helvetica-Bold',
    color: WHITE,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    lineHeight: 1.1,
  },
  specRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER,
  },
  specRowAlt: {
    backgroundColor: BLUE_SOFT,
  },
  specLabel: {
    width: '55%',
    fontSize: 7.5,
    paddingVertical: 3.5,
    paddingHorizontal: 8,
    color: DARK,
    fontFamily: 'Helvetica-Bold',
  },
  specValue: {
    flex: 1,
    fontSize: 7.5,
    paddingVertical: 3.5,
    paddingHorizontal: 8,
    fontFamily: 'Helvetica',
    color: DARK,
  },

  // ── Risk matrix ──
  matrixTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: NAVY,
    marginBottom: 8,
  },
  matrixTable: {
    marginBottom: 14,
    borderWidth: 0.5,
    borderColor: BORDER,
  },
  matrixHeaderRow: {
    flexDirection: 'row',
    backgroundColor: NAVY,
  },
  matrixHeaderCell: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 4,
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: WHITE,
    textAlign: 'center',
    borderRightWidth: 0.5,
    borderRightColor: 'rgba(255,255,255,0.15)',
  },
  matrixRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER,
  },
  matrixLabelCell: {
    flex: 1.6,
    paddingVertical: 4,
    paddingHorizontal: 6,
    fontSize: 7.5,
    color: DARK,
    fontFamily: 'Helvetica-Bold',
    borderRightWidth: 0.5,
    borderRightColor: BORDER,
    backgroundColor: LIGHT_GREY,
  },
  matrixCell: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 2,
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    borderRightWidth: 0.5,
    borderRightColor: 'rgba(255,255,255,0.4)',
  },

  // ── Treatment categories ──
  treatmentSection: {
    marginBottom: 4,
  },
  treatmentSectionBorder: {
    borderLeftWidth: 4,
    paddingLeft: 8,
    marginLeft: 0,
  },
  treatmentCategoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  treatmentCategoryCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },
  treatmentCategoryCircleText: {
    fontSize: 6.5,
    fontFamily: 'Helvetica-Bold',
    color: WHITE,
  },
  treatmentCategoryLabel: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // ── Treatment cards ──
  treatmentCard: {
    marginBottom: 6,
    borderWidth: 0.5,
    borderColor: BORDER,
    borderRadius: 2,
  },
  treatmentHeaderRow: {
    flexDirection: 'row',
    backgroundColor: LIGHT_GREY,
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER,
    paddingVertical: 5,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  treatmentHazards: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    flex: 1,
    color: DARK,
  },
  ratingPillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 6,
  },
  ratingPillBadge: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 2,
    color: WHITE,
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
  },
  ratingArrow: {
    fontSize: 8,
    marginHorizontal: 3,
    color: MID_GREY,
  },
  treatmentBody: {
    padding: 8,
  },
  treatmentName: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
    marginBottom: 4,
  },
  treatmentText: {
    fontSize: 7.5,
    color: DARK,
    lineHeight: 1.55,
  },
  treatmentRefs: {
    fontSize: 7,
    color: MID_GREY,
    marginTop: 4,
    fontFamily: 'Helvetica-Oblique',
  },

  // ── Section 5 (target layout) ──
  s5HeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginBottom: 4,
  },
  s5HeaderHazard: {
    flex: 1,
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
    textTransform: 'uppercase',
  },
  s5HeaderRatings: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  s5HazardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER,
  },
  s5IconPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: NAVY,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  s5IconPlaceholderText: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: WHITE,
  },
  s5HazardName: {
    flex: 1,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
    textTransform: 'uppercase',
  },
  s5TreatmentBody: {
    padding: 10,
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  s5TreatmentTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: DARK,
    marginBottom: 6,
  },
  s5TreatmentText: {
    fontSize: 7.5,
    color: DARK,
    lineHeight: 1.5,
    marginBottom: 4,
  },
  s5TreatmentRefs: {
    fontSize: 7,
    color: '#4B5563',
    fontFamily: 'Helvetica-Oblique',
  },

  // ── Acknowledgement ──
  ackTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: NAVY,
    marginBottom: 10,
  },
  ackIntro: {
    fontSize: 8,
    color: MID_GREY,
    lineHeight: 1.6,
    marginBottom: 20,
  },
  ackTable: {
    borderWidth: 0.5,
    borderColor: BORDER,
  },
  ackHeaderRow: {
    flexDirection: 'row',
    backgroundColor: NAVY,
  },
  ackHeaderCell: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: WHITE,
    borderRightWidth: 0.5,
    borderRightColor: 'rgba(255,255,255,0.2)',
  },
  ackDataRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER,
    minHeight: 32,
  },
  ackDataRowAlt: {
    backgroundColor: BLUE_SOFT,
  },
  ackDataCell: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    fontSize: 8,
    borderRightWidth: 0.5,
    borderRightColor: BORDER,
  },

  // ── Empty state ──
  emptySection: {
    paddingVertical: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 3,
    marginTop: 8,
  },
  emptySectionText: {
    fontSize: 8.5,
    color: '#9CA3AF',
    fontFamily: 'Helvetica-Oblique',
  },
});

// ─── Sub-components ───────────────────────────────────────────────────────────

function PageFooter({
  basics,
  logoDataUrl,
}: {
  basics: MachineBasics;
  logoDataUrl?: string | null;
}) {
  return (
    <View style={s.footer} fixed>
      {logoDataUrl ? (
        <Image src={logoDataUrl} style={s.footerLogo} />
      ) : (
        <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: DARK, marginRight: 12 }}>CivDocs</Text>
      )}

      <View style={s.footerMachineDetailsBadge}>
        <Text style={s.footerMachineDetailsText}>Machine Details</Text>
      </View>

      <View style={s.footerBlock}>
        <View style={s.footerBlockRow}>
          <Text style={s.footerBlockLabel}>Make:</Text>
          <Text style={s.footerBlockValue}>{basics.make}</Text>
        </View>
        <View style={s.footerBlockRow}>
          <Text style={s.footerBlockLabel}>Model:</Text>
          <Text style={s.footerBlockValue}>{basics.model}</Text>
        </View>
        <View style={s.footerBlockRow}>
          <Text style={s.footerBlockLabel}>Type:</Text>
          <Text style={s.footerBlockValue}>{basics.machineType}</Text>
        </View>
      </View>

      <View style={s.footerDivider} />

      <View style={s.footerBlock}>
        <View style={s.footerBlockRow}>
          <Text style={s.footerBlockLabel}>Asset Number:</Text>
          <Text style={s.footerBlockValue}>{basics.assetNumber || '—'}</Text>
        </View>
        <View style={s.footerBlockRow}>
          <Text style={s.footerBlockLabel}>Assessed By:</Text>
          <Text style={s.footerBlockValue}>{basics.assessorName}</Text>
        </View>
        <View style={s.footerBlockRow}>
          <Text style={s.footerBlockLabel}>Date:</Text>
          <Text style={s.footerBlockValue}>{formatDate(basics.date)}</Text>
        </View>
      </View>

      <View style={s.footerDivider} />

      <View style={s.footerSpacer} />

      <Text
        style={s.footerPageNum}
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
      />
    </View>
  );
}

function SectionBadge({ num, title }: { num: string; title: string }) {
  return (
    <View style={s.sectionBadge}>
      <Text style={s.sectionBadgeNum}>{num}</Text>
      <Text style={s.sectionBadgeTitle}>{title}</Text>
    </View>
  );
}

function RatingPills({
  prelim,
  residual,
}: {
  prelim: { label: string; value: number };
  residual: { label: string; value: number };
}) {
  return (
    <View style={s.ratingPillRow}>
      <Text style={[s.ratingPillBadge, { backgroundColor: ratingBadgeColor(prelim.label) }]}>
        {prelim.label} {prelim.value}
      </Text>
      <Text style={s.ratingArrow}>→</Text>
      <Text style={[s.ratingPillBadge, { backgroundColor: ratingBadgeColor(residual.label) }]}>
        {residual.label} {residual.value}
      </Text>
    </View>
  );
}

function getTreatmentIconKey(treatmentName: string): string {
  return TREATMENT_ICON[treatmentName] ?? '';
}

function TreatmentCard({ entry, inPlace }: { entry: TreatmentEntry; inPlace: boolean }) {
  const t = entry.treatment;
  return (
    <View style={s.treatmentCard} wrap={false}>
      <View style={s.treatmentHeaderRow}>
        <Text style={s.treatmentHazards}>{t.hazards.join('  ·  ')}</Text>
        <RatingPills prelim={t.prelimRating} residual={t.residualRating} />
      </View>
      <View style={s.treatmentBody}>
        <Text style={s.treatmentName}>
          {inPlace ? 'Treatment in Place: ' : 'Treatment Required: '}
          {t.name}
        </Text>
        <Text style={s.treatmentText}>{t.treatmentText}</Text>
        <Text style={s.treatmentRefs}>References: {t.references}</Text>
      </View>
    </View>
  );
}

function Section5TreatmentBlock({ entry, iconDataUrls }: { entry: TreatmentEntry; iconDataUrls?: Record<string, string> }) {
  const t = entry.treatment;
  const iconKey = getTreatmentIconKey(t.name);
  const iconSrc = iconDataUrls?.[iconKey];
  return (
    <View wrap={false}>
      <View style={s.s5HazardRow}>
        {iconSrc ? (
          <Image src={iconSrc} style={{ width: 24, height: 24, marginRight: 8 }} />
        ) : (
          <View style={s.s5IconPlaceholder}>
            <Text style={s.s5IconPlaceholderText}>{t.hazards[0]?.[0] ?? '?'}</Text>
          </View>
        )}
        <Text style={s.s5HazardName}>{t.hazards.join(', ')}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
          <View style={{ backgroundColor: ratingBadgeColor(t.prelimRating.label), paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2, marginRight: 6 }}>
            <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: WHITE }}>{t.prelimRating.label} {t.prelimRating.value}</Text>
          </View>
          <View style={{ backgroundColor: ratingBadgeColor(t.residualRating.label), paddingHorizontal: 6, paddingVertical: 2, borderRadius: 2 }}>
            <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: WHITE }}>{t.residualRating.label} {t.residualRating.value}</Text>
          </View>
        </View>
      </View>
      <View style={s.s5TreatmentBody}>
        <Text style={s.s5TreatmentTitle}>Risk Treatments in Place: {t.name}</Text>
        <Text style={s.s5TreatmentText}>{t.treatmentText}</Text>
        <Text style={s.s5TreatmentRefs}>References: {t.references}</Text>
      </View>
    </View>
  );
}

function VerticalSidebarLabel({ text }: { text: string }) {
  return (
    <View style={s.section2Sidebar}>
      {text.split('').map((char, i) => (
        <Text key={i} style={s.section2SidebarText}>{char}</Text>
      ))}
    </View>
  );
}

function SpecGroup({ title, rows }: { title: string; rows: [string, string | undefined][] }) {
  const filled = rows.filter(([, v]) => v);
  if (filled.length === 0) return null;
  return (
    <View style={s.specGroup} wrap={false}>
      <Text style={s.specGroupTitle}>{title}</Text>
      {filled.map(([label, value], idx) => (
        <View key={label} style={[s.specRow, idx % 2 === 1 ? s.specRowAlt : {}]}>
          <Text style={s.specLabel}>{label}</Text>
          <Text style={s.specValue}>{value}</Text>
        </View>
      ))}
    </View>
  );
}

function CategorySection({
  cat,
  entries,
  inPlace,
}: {
  cat: string;
  entries: TreatmentEntry[];
  inPlace: boolean;
}) {
  if (entries.length === 0) return null;
  const color = CAT_COLOR[cat] ?? NAVY;
  const icon = CAT_ICON[cat] ?? '?';
  return (
    <View style={s.treatmentSection}>
      <View style={s.treatmentCategoryRow}>
        <View style={[s.treatmentCategoryCircle, { backgroundColor: color }]}>
          <Text style={s.treatmentCategoryCircleText}>{icon}</Text>
        </View>
        <Text style={s.treatmentCategoryLabel}>{cat}</Text>
      </View>
      <View style={[s.treatmentSectionBorder, { borderLeftColor: color }]}>
        {entries.map((entry) => (
          <TreatmentCard key={entry.questionId} entry={entry} inPlace={inPlace} />
        ))}
      </View>
    </View>
  );
}

// ─── Matrix cell helper ───────────────────────────────────────────────────────

function MatrixCell({ value }: { value: number }) {
  const { bg, fg } = riskLevelForValue(value);
  return (
    <Text style={[s.matrixCell, { backgroundColor: bg, color: fg }]}>{value}</Text>
  );
}

// ─── Risk level legend row ────────────────────────────────────────────────────

const RISK_LEVELS = [
  { label: 'CRITICAL', range: '≥ 24', desc: 'Immediate action required. Do not operate until controls are in place.', color: '#B91C1C' },
  { label: 'HIGH',     range: '17–23', desc: 'Action required urgently, within 24–48 hours.', color: '#C2410C' },
  { label: 'MEDIUM',   range: '9–16',  desc: 'Action required within 7–14 days.', color: '#A16207' },
  { label: 'LOW',      range: '1–8',   desc: 'Monitor and review. Action as resources allow.', color: '#15803D' },
];

// ─── Main document ────────────────────────────────────────────────────────────

export interface RiskAssessmentPdfProps {
  basics: MachineBasics;
  specs: GraderSpecs | ExcavatorSpecs | PosiTrackSpecs | RollerSpecs;
  answers: Section2Answers;
  assessorNotes?: string;
  /** Base64 data URLs of uploaded machine images */
  machineImages?: string[];
  logoDataUrl?: string | null;
  /** Map of icon filename (without extension) to base64 data URL. Icons in public/icons-riskassesment/ */
  iconDataUrls?: Record<string, string>;
  /** QR code data URL for hosted report link (printed on last page) */
  qrCodeDataUrl?: string;
  /** Public URL to view this report (e.g. civdocs.com.au/r/{token}) */
  publicReportUrl?: string;
}

const CATEGORIES: Array<'DELIVERY' | 'OPERATION' | 'DESIGN COMPLIANCE' | 'MAINTENANCE'> = [
  'DELIVERY',
  'OPERATION',
  'DESIGN COMPLIANCE',
  'MAINTENANCE',
];

export default function RiskAssessmentPdf({
  basics,
  specs,
  answers,
  assessorNotes,
  machineImages,
  logoDataUrl,
  iconDataUrls,
  qrCodeDataUrl,
  publicReportUrl,
}: RiskAssessmentPdfProps) {
  const isExcavator = basics.machineType === 'Excavator';
  const isPosiTrack = basics.machineType === 'Posi Track';
  const isRoller = basics.machineType === 'Roller';
  const activeQuestions = isExcavator
    ? EXCAVATOR_QUESTIONS
    : isPosiTrack
      ? POSI_TRACK_QUESTIONS
      : isRoller
        ? ROLLER_QUESTIONS
        : GRADER_QUESTIONS;

  // Build treatment lists
  const inPlaceTreatments: TreatmentEntry[] = [];
  const requiredTreatments: TreatmentEntry[] = [];

  activeQuestions.forEach((q) => {
    const answer = answers[q.id];
    if (!answer || answer === 'na') return;
    if (answer === 'yes') inPlaceTreatments.push({ treatment: q.treatment, questionId: q.id });
    if (answer === 'no')  requiredTreatments.push({ treatment: q.treatment, questionId: q.id });
  });

  const groupedInPlace = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = inPlaceTreatments.filter((e) => e.treatment.operationCategory === cat);
    return acc;
  }, {} as Record<string, TreatmentEntry[]>);

  const groupedRequired = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = requiredTreatments.filter((e) => e.treatment.operationCategory === cat);
    return acc;
  }, {} as Record<string, TreatmentEntry[]>);

  // Build extras list based on machine type
  const graderSpecs = !isExcavator && !isPosiTrack && !isRoller ? (specs as GraderSpecs) : null;
  const excavatorSpecs = isExcavator ? (specs as ExcavatorSpecs) : null;
  const posiTrackSpecs = isPosiTrack ? (specs as PosiTrackSpecs) : null;
  const rollerSpecs = isRoller ? (specs as RollerSpecs) : null;

  const extrasChecked = isExcavator
    ? [
        excavatorSpecs?.extras_air_conditioning && 'Air Conditioning',
        excavatorSpecs?.extras_fops && 'FOPS',
        excavatorSpecs?.extras_rops_cabin && 'ROPS – Cabin',
        excavatorSpecs?.extras_quick_hitch && 'Mechanical Quick Hitch',
        excavatorSpecs?.extras_hydraulic_quick_hitch && 'Hydraulic Quick Hitch',
        excavatorSpecs?.extras_rear_camera && 'Rear / 360° Camera',
        excavatorSpecs?.extras_proximity_detection && 'Proximity Detection System',
        excavatorSpecs?.extras_wheel_chocks && 'Wheel Chocks',
      ].filter(Boolean) as string[]
    : isPosiTrack
      ? [
          posiTrackSpecs?.extras_air_conditioning && 'Air Conditioning',
          posiTrackSpecs?.extras_fops && 'FOPS',
          posiTrackSpecs?.extras_rops_cabin && 'ROPS – Cabin',
          posiTrackSpecs?.extras_rear_camera && 'Rear / 360° Camera',
          posiTrackSpecs?.extras_proximity_detection && 'Proximity Detection System',
          posiTrackSpecs?.extras_wheel_chocks && 'Wheel Chocks',
        ].filter(Boolean) as string[]
      : isRoller
        ? [
            rollerSpecs?.extras_air_conditioning && 'Air Conditioning',
            rollerSpecs?.extras_fops && 'FOPS',
            rollerSpecs?.extras_rops_cabin && 'ROPS – Cabin',
            rollerSpecs?.extras_rear_camera && 'Rear / 360° Camera',
            rollerSpecs?.extras_wheel_chocks && 'Wheel Chocks',
          ].filter(Boolean) as string[]
        : [
        graderSpecs?.extras_air_conditioning && 'Air Conditioning',
        graderSpecs?.extras_drawbar && 'Drawbar',
        graderSpecs?.extras_fops && 'FOPS',
        graderSpecs?.extras_roller_attachment && 'Roller Attachment',
        graderSpecs?.extras_rops_cabin && 'ROPS – Cabin',
        graderSpecs?.extras_wheel_chocks && 'Wheel Chocks',
      ].filter(Boolean) as string[];

  return (
    <Document>
      {/* ── COVER PAGE ─────────────────────────────────────────────────────── */}
      <Page size="A4" style={s.coverPage}>
        <View style={s.coverTopAccent} />

        <View style={s.coverLogoArea}>
          {logoDataUrl ? (
            <Image src={logoDataUrl} style={s.coverLogo} />
          ) : (
            <Text style={{ fontSize: 20, fontFamily: 'Helvetica-Bold', color: NAVY }}>CivDocs</Text>
          )}
        </View>

        <View style={s.coverOrangeLine} />

        <View style={s.coverContent}>
          <Text style={s.coverTitle}>RISK MANAGEMENT{'\n'}REPORT</Text>

          <View style={s.coverDivider} />

          {[
            ['TYPE',          basics.machineType],
            ['MAKE',          basics.make],
            ['MODEL',         basics.model],
            ['ASSET NUMBER',  basics.assetNumber],
            ['REGISTRATION',  basics.registration],
          ].map(([label, value]) => (
            <View key={label} style={s.coverRow}>
              <Text style={s.coverLabel}>{label}</Text>
              <Text style={s.coverValue}>{value || '—'}</Text>
            </View>
          ))}

          <View style={s.coverDividerBlue} />

          <View style={s.coverTwoCol}>
            <View style={s.coverLeftCol}>
              {[
                ['Report Number', basics.reportNumber],
                ['Date',          formatDate(basics.date)],
                ['State',         basics.state],
                ['Created By',    basics.assessorName],
                ['Owner',         basics.owner],
              ].map(([label, value]) => (
                <View key={label} style={s.coverRow}>
                  <Text style={s.coverDetailLabel}>{label}</Text>
                  <Text style={s.coverValue}>{value || '—'}</Text>
                </View>
              ))}
              {basics.operatingContext && (() => {
                const ctx = basics.operatingContext;
                const hasSiteTypes = ctx.siteTypes?.length > 0;
                const hasConditions = ctx.siteConditions && Object.values(ctx.siteConditions).some(Boolean);
                if (!hasSiteTypes && !hasConditions) return null;
                return (
                  <View key="operating" style={{ marginTop: 8, paddingTop: 8, borderTopWidth: 0.5, borderTopColor: BORDER }}>
                    <Text style={[s.coverDetailLabel, { marginBottom: 4 }]}>Operating Context</Text>
                    {hasSiteTypes && (
                      <Text style={[s.coverValue, { fontSize: 7, marginBottom: 2 }]}>{ctx.siteTypes.join(', ')}</Text>
                    )}
                    {hasConditions && (
                      <Text style={[s.coverValue, { fontSize: 7 }]}>
                        {Object.entries(ctx.siteConditions).filter(([, v]) => v).map(([k]) => k).join(', ')}
                      </Text>
                    )}
                  </View>
                );
              })()}
            </View>

            <View style={s.summaryBox}>
              <Text style={s.summaryTitle}>Summary</Text>
              <Text style={s.summaryRiskLabel}>Risk Treatments</Text>
              <View style={s.summaryInPlace}>
                <Text style={s.summaryInPlaceIcon}>✓</Text>
                <Text style={{ fontSize: 7.5, color: '#15803D' }}>In Place: {inPlaceTreatments.length}</Text>
              </View>
              <View style={s.summaryRequired}>
                <Text style={s.summaryRequiredIcon}>⚠</Text>
                <Text style={{ fontSize: 7.5, color: '#D97706' }}>Required: {requiredTreatments.length}</Text>
              </View>
              {[
                ['Critical', '#1F2937', '#FFFFFF'],
                ['High',     '#B91C1C', '#FFFFFF'],
                ['Medium',   '#D97706', '#FFFFFF'],
                ['Low',      '#FACC15', '#1F2937'],
              ].map(([label, bg, fg]) => (
                <View key={label} style={[s.summaryBadge, { backgroundColor: bg }]}>
                  <Text style={[s.summaryBadgeText, { color: fg }]}>
                    {label}: {label === 'Critical' ? requiredTreatments.filter((e) => e.treatment.prelimRating.label === 'CRITICAL').length :
                      label === 'High' ? requiredTreatments.filter((e) => e.treatment.prelimRating.label === 'HIGH').length :
                      label === 'Medium' ? requiredTreatments.filter((e) => e.treatment.prelimRating.label === 'MEDIUM').length :
                      requiredTreatments.filter((e) => e.treatment.prelimRating.label === 'LOW').length}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={s.coverDividerBlue} />

          <Text style={s.coverTocTitle}>Table of Contents</Text>
          {[
            ['SECTION 1', 'Important Information',          'Scope, limitations and obligations applicable to this report', 'default'],
            ['SECTION 2', 'Machine Details',                'Standard machine specifications and extras fitted', 'default'],
            ['SECTION 3', 'Risk Analysis / Evaluation',    'Technique and matrix used to calculate risk ratings', 'default'],
            ['SECTION 4', 'Risk Treatments Required',      'Risk treatments to be implemented before operation', 'orange'],
            ['SECTION 5', 'Risk Treatments In Place',      'Risk treatments recorded/observed during inspection for this item of plant', 'green'],
            ['SECTION 6', 'Images and Notes',              'Images and additional information entered by assessor', 'default'],
          ].map(([section, title, desc, accent]) => (
            <View key={section} style={s.coverTocRow}>
              <Text style={s.coverTocSectionNum}>{section}</Text>
              <View style={s.coverTocRowDivider} />
              <View style={s.coverTocEntry}>
                <Text style={
                  accent === 'orange' ? s.coverTocEntryTitleOrange :
                  accent === 'green' ? s.coverTocEntryTitleGreen :
                  s.coverTocEntryTitle
                }>{title.toUpperCase()}</Text>
                <Text style={s.coverTocDesc}>{desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={s.coverFooter}>
          <View style={{ flex: 1 }} />
          <Text style={s.coverFooterText}>{basics.reportNumber}</Text>
        </View>
      </Page>

      {/* ── SECTION 1: IMPORTANT INFORMATION ──────────────────────────────── */}
      <Page size="A4" style={s.page}>
        <View style={s.pageInner}>
          <SectionBadge num="Section 1" title="Important Information" />
          <Text style={s.sectionIntro}>
            This report was generated by CivDocs on {formatDate(basics.date)}.{'\n\n'}
            All operators of this item of plant must read and understand this report prior to operating this item of plant. This report pertains to this item of plant as it appeared on the day of inspection.{'\n\n'}
            The safety hazards associated with the operating and maintaining of this item of plant have been identified as far as reasonably practicable based on a visual inspection and information available at the time. The condition of this item of plant will change with use. No physical testing has been conducted (e.g. wire rope tests, stress tests, structural/non-destructive tests, noise tests, vibration tests, brake tests, insulation tests etc.) unless stated otherwise in the notes. Where this report refers to features or devices (e.g. brakes, alarms, cameras), this should be read as controls that must be present and maintained; their performance has not been certified unless explicitly stated in notes.{'\n\n'}
            Controls outlined in both Section 4 &amp; 5 of this report must be maintained at all times whilst this item of plant is in operation.{'\n\n'}
            Any information contained in the notes section of this report shall be read in conjunction with Section 3. Any information relating to standard features have been supplied via the manufacturer and shall be used as a guide only until verified.{'\n\n'}
            Additional risk assessment may be required, specific to the operating environment, for this item of plant.{'\n\n'}
            All operators and maintenance personnel must be appropriately trained in the use and maintenance of this item of plant.
          </Text>
        </View>
        <PageFooter basics={basics} logoDataUrl={logoDataUrl} />
      </Page>

      {/* ── SECTION 2: MACHINE DETAILS ─────────────────────────────────────── */}
      <Page size="A4" style={s.page}>
        <View style={s.pageInner}>
          <SectionBadge num="Section 2" title="Machine Details" />

          <View style={{ flexDirection: 'row' }}>
            <VerticalSidebarLabel text="MACHINE DETAILS" />
            <View style={{ flex: 1, minWidth: 0 }}>
              <SpecGroup title="MACHINE IDENTIFICATION" rows={[
                ['Make / Model',   `${basics.make} – ${basics.model}`],
                ['Type',           basics.machineType],
                ['Asset Number',   basics.assetNumber],
                ['Registration',   basics.registration],
                ['State',          basics.state],
                ['Owner',          basics.owner],
                ['Assessor',       basics.assessorName],
              ]} />

              {/* ── Grader spec groups ── */}
              {!isExcavator && graderSpecs && (<>
                <SpecGroup title="NOISE TEST RESULTS" rows={[
                  ["Manufacturers specified noise level dBA", graderSpecs.noise_mfr_dba],
                  ['Ambient noise level dBA', graderSpecs.noise_ambient_dba],
                  ['Noise level - Operator position (high idle) dBA', graderSpecs.noise_operator_high],
                  ['Noise level - Operator position (low idle) dBA', graderSpecs.noise_operator_low],
                  ['Noise level LHS dBA @ m (high idle)', graderSpecs.noise_lhs],
                  ['Noise level Front dBA @ m (high idle)', graderSpecs.noise_front],
                  ['Noise level RHS dBA @ m (high idle)', graderSpecs.noise_rhs],
                  ['Noise level Rear dBA @ m (high idle)', graderSpecs.noise_rear],
                ]} />
                <SpecGroup title="BLADE" rows={[
                  ['Blade height (mm)',        graderSpecs.blade_height_mm],
                  ['Blade length (mm)',        graderSpecs.blade_length_mm],
                  ['Blade lift (mm)',          graderSpecs.blade_lift_mm],
                  ['Blade thickness (mm)',     graderSpecs.blade_thickness_mm],
                  ['Blade tilt, Fwd/Back (deg)', graderSpecs.blade_tilt],
                ]} />
                <SpecGroup title="BODY TYPE" rows={[
                  ['Articulated/Rigid',           graderSpecs.body_type],
                  ['Articulation, either side (deg)', graderSpecs.articulation_deg],
                ]} />
                <SpecGroup title="CAPACITIES" rows={[
                  ['Fuel Tank Capacity (Litres)',          graderSpecs.fuel_capacity_l],
                  ['Hydraulic Oil Tank Capacity (Litres)', graderSpecs.hydraulic_oil_capacity_l],
                ]} />
                <SpecGroup title="DIMENSIONS/WEIGHTS" rows={[
                  ['Front axle total oscillation (deg)', graderSpecs.front_axle_oscillation],
                  ['Height to top of cab (mm)',          graderSpecs.height_cab_mm],
                  ['Length (mm)',                        graderSpecs.length_mm],
                  ['Operating weight (kg)',              graderSpecs.operating_weight_kg],
                  ['Shoulder reach L/R (mm)',            graderSpecs.shoulder_reach],
                  ['Turn circle diameter (mm)',          graderSpecs.turn_circle_mm],
                  ['Width w/out blade (mm)',             graderSpecs.width_no_blade_mm],
                ]} />
                <SpecGroup title="DRIVES" rows={[['Drive', graderSpecs.drive]]} />
                <SpecGroup title="ENGINE" rows={[
                  ['Engine Make & Model',              graderSpecs.engine_make_model],
                  ['Engine Number',                    graderSpecs.engine_number],
                  ['Engine Displacement (Litres)',     graderSpecs.engine_displacement],
                  ['Engine Hours',                     graderSpecs.engine_hours],
                  ['Number of Cylinders',              graderSpecs.engine_cylinders],
                  ['Net engine power, 1st gear (kW @ rpm)', graderSpecs.engine_power],
                  ['Torque (Nm@rpm)',                  graderSpecs.engine_torque],
                  ['Torque rise (%)',                  graderSpecs.engine_torque_rise],
                  ['Variable power, net, max (kW@rpm)', graderSpecs.engine_variable_power],
                ]} />
                {graderSpecs.front_wheel_drive && (
                  <SpecGroup title="EXTRAS" rows={[
                    ['Frontwheel drive (Std/Opt)', graderSpecs.front_wheel_drive],
                  ]} />
                )}
                <SpecGroup title="HYDRAULICS" rows={[
                  ['Hydraulic Oil Flow (l/min)',   graderSpecs.hydraulic_flow],
                  ['Hydraulic Oil Pressure (Bar)', graderSpecs.hydraulic_pressure],
                  ['Hydraulic System',             graderSpecs.hydraulic_system],
                ]} />
                <SpecGroup title="PLANT CLASSIFICATIONS" rows={[
                  ['Class', graderSpecs.plant_class],
                  ['Year',  graderSpecs.plant_year],
                ]} />
                <SpecGroup title="SAFETY STRUCTURES" rows={[
                  ['ROPS Compliance No.', graderSpecs.rops_compliance],
                  ['ROPS Serial No.',     graderSpecs.rops_serial],
                  ['FOPS Compliance No.', graderSpecs.fops_compliance],
                  ['FOPS Serial No.',     graderSpecs.fops_serial],
                ]} />
                {graderSpecs.front_wheel_lean && (
                  <SpecGroup title="STEERING" rows={[
                    ['Front wheel lean, L/R (deg)', graderSpecs.front_wheel_lean],
                  ]} />
                )}
                <SpecGroup title="TRANSMISSION" rows={[
                  ['Maximum speed, Fwd/Rev (km/h)', graderSpecs.max_speed],
                  ['Speeds F/R',                    graderSpecs.speeds_fr],
                  ['Transmission',                  graderSpecs.transmission],
                ]} />
                <SpecGroup title="TYRES" rows={[['Tyre Size', graderSpecs.tyre_size]]} />
              </>)}

              {/* ── Excavator spec groups ── */}
              {isExcavator && excavatorSpecs && (<>
                <SpecGroup title="NOISE TEST RESULTS" rows={[
                  ['Manufacturers specified noise level dBA', excavatorSpecs.noise_mfr_dba],
                ]} />
                <SpecGroup title="ENGINE" rows={[
                  ['Engine Make & Model',          excavatorSpecs.engine_make_model],
                  ['Engine Number',                excavatorSpecs.engine_number],
                  ['Engine Displacement',          excavatorSpecs.engine_displacement],
                  ['Engine Hours',                 excavatorSpecs.engine_hours],
                  ['Number of Cylinders',          excavatorSpecs.engine_cylinders],
                  ['Net engine power (kW @ rpm)',  excavatorSpecs.engine_power],
                  ['Torque (Nm @ rpm)',            excavatorSpecs.engine_torque],
                ]} />
                <SpecGroup title="DIGGING PERFORMANCE" rows={[
                  ['Max dig depth (mm)',           excavatorSpecs.max_dig_depth_mm],
                  ['Max reach at ground level (mm)', excavatorSpecs.max_reach_mm],
                  ['Max cutting height (mm)',      excavatorSpecs.max_cutting_height_mm],
                  ['Max dump/loading height (mm)', excavatorSpecs.max_dump_height_mm],
                ]} />
                <SpecGroup title="SWING & TRAVEL" rows={[
                  ['Swing speed (rpm)',            excavatorSpecs.swing_speed_rpm],
                  ['Travel speed High/Low (km/h)', excavatorSpecs.travel_speed_kmh],
                  ['Tail swing radius (mm)',       excavatorSpecs.tail_swing_radius_mm],
                ]} />
                <SpecGroup title="CAPACITIES" rows={[
                  ['Bucket capacity (m³)',         excavatorSpecs.bucket_capacity_m3],
                  ['Fuel tank capacity (L)',        excavatorSpecs.fuel_capacity_l],
                ]} />
                <SpecGroup title="DIMENSIONS/WEIGHTS" rows={[
                  ['Operating weight (kg)',          excavatorSpecs.operating_weight_kg],
                  ['Overall transport length (mm)',  excavatorSpecs.overall_length_mm],
                  ['Overall width (mm)',             excavatorSpecs.overall_width_mm],
                  ['Overall height – cab (mm)',      excavatorSpecs.overall_height_mm],
                  ['Undercarriage length (mm)',      excavatorSpecs.undercarriage_length_mm],
                  ['Track pad width (mm)',           excavatorSpecs.track_width_mm],
                ]} />
                <SpecGroup title="HYDRAULICS" rows={[
                  ['Main pump flow (L/min)',        excavatorSpecs.hydraulic_flow_lpm],
                  ['Main relief pressure (bar)',    excavatorSpecs.hydraulic_pressure_bar],
                ]} />
                <SpecGroup title="PLANT CLASSIFICATIONS" rows={[
                  ['Class', excavatorSpecs.plant_class],
                  ['Year',  excavatorSpecs.plant_year],
                ]} />
                <SpecGroup title="SAFETY STRUCTURES" rows={[
                  ['ROPS Compliance No.', excavatorSpecs.rops_compliance],
                  ['ROPS Serial No.',     excavatorSpecs.rops_serial],
                  ['FOPS Compliance No.', excavatorSpecs.fops_compliance],
                  ['FOPS Serial No.',     excavatorSpecs.fops_serial],
                ]} />
                {excavatorSpecs.tyre_size && (
                  <SpecGroup title="TYRES" rows={[['Tyre Size', excavatorSpecs.tyre_size]]} />
                )}
              </>)}

              {/* ── Posi Track spec groups ── */}
              {isPosiTrack && posiTrackSpecs && (<>
                <SpecGroup title="NOISE TEST RESULTS" rows={[
                  ['Manufacturers specified noise level dBA', posiTrackSpecs.noise_mfr_dba],
                ]} />
                <SpecGroup title="ENGINE" rows={[
                  ['Engine Make & Model',          posiTrackSpecs.engine_make_model],
                  ['Engine Number',                posiTrackSpecs.engine_number],
                  ['Engine Displacement',          posiTrackSpecs.engine_displacement],
                  ['Engine Hours',                 posiTrackSpecs.engine_hours],
                  ['Number of Cylinders',          posiTrackSpecs.engine_cylinders],
                  ['Net engine power (kW @ rpm)',  posiTrackSpecs.engine_power],
                  ['Torque (Nm @ rpm)',            posiTrackSpecs.engine_torque],
                ]} />
                <SpecGroup title="LOADER PERFORMANCE" rows={[
                  ['Rated operating capacity ROC (kg)', posiTrackSpecs.rated_operating_capacity_kg],
                  ['Breakout force (kN)',              posiTrackSpecs.breakout_force_kn],
                  ['Lift height to hinge pin (mm)',   posiTrackSpecs.lift_height_mm],
                  ['Dump/clearance height (mm)',      posiTrackSpecs.dump_height_mm],
                  ['Dump reach at full height (mm)',  posiTrackSpecs.dump_reach_mm],
                  ['Bucket capacity (m³)',             posiTrackSpecs.bucket_capacity_m3],
                ]} />
                <SpecGroup title="TRAVEL" rows={[
                  ['Travel speed (km/h)', posiTrackSpecs.travel_speed_kmh],
                ]} />
                <SpecGroup title="CAPACITIES" rows={[
                  ['Fuel tank capacity (L)', posiTrackSpecs.fuel_capacity_l],
                ]} />
                <SpecGroup title="DIMENSIONS/WEIGHTS" rows={[
                  ['Operating weight (kg)',          posiTrackSpecs.operating_weight_kg],
                  ['Overall length (mm)',            posiTrackSpecs.overall_length_mm],
                  ['Overall width (mm)',             posiTrackSpecs.overall_width_mm],
                  ['Overall height – cab (mm)',      posiTrackSpecs.overall_height_mm],
                  ['Track pad width (mm)',           posiTrackSpecs.track_width_mm],
                ]} />
                <SpecGroup title="HYDRAULICS" rows={[
                  ['Main pump flow (L/min)',        posiTrackSpecs.hydraulic_flow_lpm],
                  ['Main relief pressure (bar)',    posiTrackSpecs.hydraulic_pressure_bar],
                ]} />
                <SpecGroup title="PLANT CLASSIFICATIONS" rows={[
                  ['Class', posiTrackSpecs.plant_class],
                  ['Year',  posiTrackSpecs.plant_year],
                ]} />
                <SpecGroup title="SAFETY STRUCTURES" rows={[
                  ['ROPS Compliance No.', posiTrackSpecs.rops_compliance],
                  ['ROPS Serial No.',     posiTrackSpecs.rops_serial],
                  ['FOPS Compliance No.', posiTrackSpecs.fops_compliance],
                  ['FOPS Serial No.',     posiTrackSpecs.fops_serial],
                ]} />
              </>)}

              {/* ── Roller spec groups ── */}
              {isRoller && rollerSpecs && (<>
                <SpecGroup title="NOISE TEST RESULTS" rows={[
                  ['Manufacturers specified noise level dBA', rollerSpecs.noise_mfr_dba],
                ]} />
                <SpecGroup title="DRUM & COMPACTION" rows={[
                  ['Drum width (mm)', rollerSpecs.drum_width_mm],
                  ['Drum diameter (mm)', rollerSpecs.drum_diameter_mm],
                  ['Centrifugal force (kN)', rollerSpecs.centrifugal_force_kn],
                  ['Vibrating frequency (Hz)', rollerSpecs.vibrating_frequency_hz],
                ]} />
                <SpecGroup title="ENGINE" rows={[
                  ['Engine Make & Model',          rollerSpecs.engine_make_model],
                  ['Engine Number',                rollerSpecs.engine_number],
                  ['Engine Displacement',          rollerSpecs.engine_displacement],
                  ['Engine Hours',                 rollerSpecs.engine_hours],
                  ['Number of Cylinders',          rollerSpecs.engine_cylinders],
                  ['Net engine power (kW @ rpm)',  rollerSpecs.engine_power],
                  ['Torque (Nm @ rpm)',            rollerSpecs.engine_torque],
                ]} />
                <SpecGroup title="TRAVEL" rows={[
                  ['Travel speed (km/h)', rollerSpecs.travel_speed_kmh],
                ]} />
                <SpecGroup title="CAPACITIES" rows={[
                  ['Fuel tank capacity (L)', rollerSpecs.fuel_capacity_l],
                ]} />
                <SpecGroup title="DIMENSIONS/WEIGHTS" rows={[
                  ['Operating weight (kg)',          rollerSpecs.operating_weight_kg],
                  ['Overall length (mm)',            rollerSpecs.overall_length_mm],
                  ['Overall width (mm)',             rollerSpecs.overall_width_mm],
                  ['Overall height – cab (mm)',      rollerSpecs.overall_height_mm],
                ]} />
                <SpecGroup title="HYDRAULICS" rows={[
                  ['Main pump flow (L/min)',        rollerSpecs.hydraulic_flow_lpm],
                  ['Main relief pressure (bar)',    rollerSpecs.hydraulic_pressure_bar],
                ]} />
                <SpecGroup title="PLANT CLASSIFICATIONS" rows={[
                  ['Class', rollerSpecs.plant_class],
                  ['Year',  rollerSpecs.plant_year],
                ]} />
                <SpecGroup title="SAFETY STRUCTURES" rows={[
                  ['ROPS Compliance No.', rollerSpecs.rops_compliance],
                  ['ROPS Serial No.',     rollerSpecs.rops_serial],
                  ['FOPS Compliance No.', rollerSpecs.fops_compliance],
                  ['FOPS Serial No.',     rollerSpecs.fops_serial],
                ]} />
              </>)}

              {extrasChecked.length > 0 && (
                <SpecGroup
                  title="EXTRAS FITTED"
                  rows={extrasChecked.map((e) => [e, '✓'] as [string, string])}
                />
              )}
            </View>
          </View>
        </View>
        <PageFooter basics={basics} logoDataUrl={logoDataUrl} />
      </Page>

      {/* ── SECTION 3: RISK ANALYSIS ──────────────────────────────────────── */}
      <Page size="A4" style={s.page}>
        <View style={s.pageInner}>
          <SectionBadge num="Section 3" title="Risk Analysis / Risk Evaluation" />

          {/* ── RISK ANALYSIS TABLE ── */}
          <View style={{ borderWidth: 1, borderColor: '#374151', marginBottom: 18 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#444', paddingHorizontal: 8, paddingVertical: 3 }}>
                <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: WHITE, textTransform: 'uppercase', letterSpacing: 0.5 }}>Risk Analysis</Text>
              </View>
            </View>

            {/* Arrow header indicating CONSEQUENCE */}
            <View style={{ flexDirection: 'row', marginBottom: 1, paddingTop: 4 }}>
              <View style={{ width: 70 }} />
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: BORDER, paddingBottom: 2, marginBottom: 2 }}>
                <Text style={{ fontSize: 6.5, fontFamily: 'Helvetica-Bold', color: DARK, flex: 1, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  ← CONSEQUENCE →
                </Text>
              </View>
            </View>

            <View style={{ borderTopWidth: 0.5, borderTopColor: BORDER }}>
            {/* Consequence header row */}
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: 70, borderRightWidth: 0.5, borderRightColor: BORDER }} />
              {[
                ['1. INSIGNIFICANT', 'Dealt with by in house first aid'],
                ['2. MINOR', 'Treated by medical professionals, hospital out patients'],
                ['3. MODERATE', 'Significant non permanent injury overnight hospital stay'],
                ['4. MAJOR', 'Extensive permanent injury eg. Loss of fingers, extended hospital stay'],
                ['5. CATASTROPHIC', 'Death, permanent disabling injury eg. Loss of hand, quadriplegia'],
              ].map(([title, desc], i) => (
                <View key={i} style={{ flex: 1, borderRightWidth: i < 4 ? 0.5 : 0, borderRightColor: BORDER, padding: 4, backgroundColor: LIGHT_GREY }}>
                  <Text style={{ fontSize: 6, fontFamily: 'Helvetica-Bold', color: DARK, marginBottom: 2 }}>{title}</Text>
                  <Text style={{ fontSize: 5.5, color: MID_GREY, lineHeight: 1.3 }}>{desc}</Text>
                </View>
              ))}
            </View>
            {/* Data rows with likelihood label + vertical LIKELIHOOD label */}
            {([
              ['A. Almost certain to occur in most circumstances', 8, 16, 18, 23, 25, 'MEDIUM','HIGH','HIGH','CRITICAL','CRITICAL'],
              ['B. Likely to occur frequently',                     7, 10, 17, 20, 24, 'MEDIUM','MEDIUM','HIGH','HIGH','CRITICAL'],
              ['C. Possibly and likely to occur at sometime',       3,  9, 12, 19, 22, 'LOW','MEDIUM','MEDIUM','HIGH','HIGH'],
              ['D. Unlikely to occur but could happen',             2,  5, 11, 14, 21, 'LOW','LOW','MEDIUM','MEDIUM','HIGH'],
              ['E. May occur but only in rare circumstances',       1,  4,  6, 13, 15, 'LOW','LOW','LOW','MEDIUM','MEDIUM'],
            ] as [string, number, number, number, number, number, string, string, string, string, string][]).map(([label, v1, v2, v3, v4, v5, l1, l2, l3, l4, l5], ri) => {
              const vals = [v1,v2,v3,v4,v5];
              const levels = [l1,l2,l3,l4,l5];
              const bgOf = (lvl: string) => lvl === 'CRITICAL' ? '#1F2937' : lvl === 'HIGH' ? '#B91C1C' : lvl === 'MEDIUM' ? '#D97706' : '#D4A800';
              return (
                <View key={ri} style={{ flexDirection: 'row', borderTopWidth: 0.5, borderTopColor: BORDER }}>
                  <View style={{ width: 70, borderRightWidth: 0.5, borderRightColor: BORDER, padding: 4, justifyContent: 'center', backgroundColor: LIGHT_GREY }}>
                    <Text style={{ fontSize: 6, color: MID_GREY, lineHeight: 1.35 }}>{label}</Text>
                  </View>
                  {vals.map((v, ci) => {
                    const lvl = levels[ci];
                    return (
                      <View key={ci} style={{ flex: 1, borderRightWidth: ci < 4 ? 0.5 : 0, borderRightColor: BORDER, backgroundColor: bgOf(lvl), justifyContent: 'center', alignItems: 'center', paddingVertical: 7 }}>
                        <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: WHITE, textTransform: 'uppercase' }}>{lvl}</Text>
                        <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: WHITE }}>{v}</Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
            </View>
          </View>

          {/* ── RISK EVALUATION TABLE ── */}
          <View style={{ borderWidth: 1, borderColor: '#374151', marginBottom: 18 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#444', paddingHorizontal: 8, paddingVertical: 3 }}>
                <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: WHITE, textTransform: 'uppercase', letterSpacing: 0.5 }}>Risk Evaluation</Text>
              </View>
            </View>
            <View style={{ borderTopWidth: 0.5, borderTopColor: BORDER }}>
            {[
              { label: 'CRITICAL', color: '#1F2937', desc: 'Act immediately to mitigate risk. Implement risk treatment(s) in accordance with the risk treatment table below.' },
              { label: 'HIGH',     color: '#B91C1C', desc: 'Act immediately to mitigate risk. Implement risk treatment(s) in accordance with the risk treatment table below. If the appropriate risk treatments are not immediately accessible interim risk treatment strategies. Permanent risk treatments must be implemented within one week.' },
              { label: 'MEDIUM',   color: '#D97706', desc: 'Take reasonable steps to mitigate and monitor the risk. Implement risk treatment(s) in accordance with the risk treatment table below. Permanent risk treatments must be implemented within one month.' },
              { label: 'LOW',      color: '#D4A800', desc: 'Take reasonable steps to mitigate and monitor the risk. Implement risk treatment(s) in accordance with the risk treatment table below. Permanent risk treatments must be implemented within three months.' },
            ].map(({ label, color, desc }, i) => (
              <View key={label} style={{ flexDirection: 'row', borderTopWidth: i === 0 ? 0 : 0.5, borderTopColor: BORDER }}>
                <View style={{ width: 60, backgroundColor: color, justifyContent: 'center', alignItems: 'center', paddingVertical: 8 }}>
                  <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: WHITE }}>{label}</Text>
                </View>
                <View style={{ flex: 1, padding: 6, justifyContent: 'center', backgroundColor: i % 2 === 0 ? WHITE : BLUE_SOFT }}>
                  <Text style={{ fontSize: 7, color: DARK, lineHeight: 1.45 }}>{desc}</Text>
                </View>
              </View>
            ))}
            </View>
          </View>

          {/* ── RISK TREATMENT TABLE ── */}
          <View style={{ borderWidth: 1, borderColor: '#374151' }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ backgroundColor: '#444', paddingHorizontal: 8, paddingVertical: 3 }}>
                <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: WHITE, textTransform: 'uppercase', letterSpacing: 0.5 }}>Risk Treatment</Text>
              </View>
            </View>
            <View style={{ borderTopWidth: 0.5, borderTopColor: BORDER }}>
            {/* Intro row */}
            <View style={{ padding: 7, borderBottomWidth: 0.5, borderBottomColor: BORDER, backgroundColor: BLUE_SOFT }}>
              <Text style={{ fontSize: 7, color: DARK, lineHeight: 1.4 }}>
                Selecting the most appropriate risk treatment option involves balancing the costs and efforts of implementation against the benefits derived, with regard to legal, regulatory and other requirements. (source AS/NZS ISO 31000:2018)
              </Text>
            </View>
            {[
              ['Eliminate',         'Eliminate the risk source.'],
              ['Substitute',        'Provide an alternative that is capable of performing the same task which is safer.'],
              ['Isolate',           'Isolate people from the hazard.'],
              ['Engineering',       'Provide or construct a physical barrier or guard.'],
              ['Administration',    'Develop policies, procedures, practices and guidelines in consultation with employees to mitigate the risk. Provide training, instruction and supervision about the risk source.'],
              ['Personal protective','Provide personal protective equipment to protect the individual from the risk source.'],
            ].map(([label, desc], i) => (
              <View key={label} style={{ flexDirection: 'row', borderTopWidth: 0.5, borderTopColor: BORDER, backgroundColor: i % 2 === 0 ? WHITE : BLUE_SOFT }}>
                <View style={{ width: 85, padding: 6, borderRightWidth: 0.5, borderRightColor: BORDER, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: DARK }}>{label}</Text>
                </View>
                <View style={{ flex: 1, padding: 6 }}>
                  <Text style={{ fontSize: 7, color: DARK, lineHeight: 1.4 }}>{desc}</Text>
                </View>
              </View>
            ))}
            </View>
          </View>
        </View>
        <PageFooter basics={basics} logoDataUrl={logoDataUrl} />
      </Page>
      {/* SECTION 4: RISK TREATMENTS REQUIRED */}
      <Page size="A4" style={s.page}>
        <View style={s.pageInner}>
          <SectionBadge num="Section 4" title="Risk Treatments Required" />
          <Text style={s.sectionIntro}>
            This section pertains to hazards created by use of this item of plant which currently do not have risk treatments in place. The recommended risk treatment measures must be developed, implemented and verified by the duty holder as effective prior to operation, maintenance or testing of this item of plant.
          </Text>

          {requiredTreatments.length === 0 ? (
            <View style={s.emptySection}>
              <Text style={s.emptySectionText}>No risk treatments required — all assessed items are compliant.</Text>
            </View>
          ) : (
            CATEGORIES.map((cat) => (
              <CategorySection key={cat} cat={cat} entries={groupedRequired[cat]} inPlace={false} />
            ))
          )}
        </View>
        <PageFooter basics={basics} logoDataUrl={logoDataUrl} />
      </Page>

      {/* ── SECTION 5: RISK TREATMENTS IN PLACE ──────────────────────────── */}
      <Page size="A4" style={s.page}>
        <View style={s.pageInner}>
          <SectionBadge num="Section 5" title="Risk Treatments In Place" />
          <Text style={s.sectionIntro}>
            This section pertains to risk treatments recorded/observed during inspection for this item of plant. All operators must read and understand the entire contents of this section prior to operating this item of plant. These controls or equivalent must remain in place at all times whilst this item of plant is in operation.
          </Text>

          {inPlaceTreatments.length === 0 ? (
            <View style={s.emptySection}>
              <Text style={s.emptySectionText}>No risk treatments recorded as in place for this assessment.</Text>
            </View>
          ) : (
            <>
              <View style={s.s5HeaderRow}>
                <Text style={s.s5HeaderHazard}>Hazard(s)</Text>
                <View style={s.s5HeaderRatings}>
                  <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: DARK, marginRight: 40 }}>Prelim. Risk Rating</Text>
                  <Text style={{ fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: DARK }}>Residual Risk Rating</Text>
                </View>
              </View>
              {inPlaceTreatments.map((entry) => (
                <Section5TreatmentBlock key={entry.questionId} entry={entry} iconDataUrls={iconDataUrls} />
              ))}
            </>
          )}
        </View>
        <PageFooter basics={basics} logoDataUrl={logoDataUrl} />
      </Page>

      {/* ── SECTION 6: IMAGES AND NOTES ───────────────────────────────────── */}
      <Page size="A4" style={s.page}>
        <View style={s.pageInner}>
          <SectionBadge num="Section 6" title="Images and Notes" />
          {(machineImages?.length ?? 0) > 0 ? (
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: NAVY, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
                Machine photos
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {machineImages!.map((src, i) => (
                  <Image key={i} src={src} style={{ width: 120, height: 90, marginRight: 12, marginBottom: 8 }} />
                ))}
              </View>
            </View>
          ) : null}
          {assessorNotes ? (
            <View>
              <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: NAVY, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
                Notes
              </Text>
              <Text style={{ fontSize: 8, lineHeight: 1.65, color: DARK }}>{assessorNotes}</Text>
            </View>
          ) : (machineImages?.length ?? 0) === 0 ? (
            <View style={s.emptySection}>
              <Text style={s.emptySectionText}>No photos/evidence were attached to this report.</Text>
            </View>
          ) : null}
        </View>
        <PageFooter basics={basics} logoDataUrl={logoDataUrl} />
      </Page>

      {/* ── OPERATOR ACKNOWLEDGEMENT ──────────────────────────────────────── */}
      <Page size="A4" style={s.page}>
        <View style={s.pageInner}>
          <SectionBadge num="Operator" title="Acknowledgement" />

          <View style={{ marginBottom: 16 }}>
            {[
              ['TYPE',          basics.machineType],
              ['MAKE',          basics.make],
              ['MODEL',         basics.model],
              ['ASSET NUMBER',  basics.assetNumber],
              ['REPORT NUMBER', basics.reportNumber],
              ['DATE',          formatDate(basics.date)],
              ['OWNER',         basics.owner],
            ].map(([label, value]) => (
              <View key={label} style={s.coverRow}>
                <Text style={s.coverLabel}>{label}</Text>
                <Text style={[s.coverValue, { color: DARK }]}>{value || '—'}</Text>
              </View>
            ))}
          </View>

          <Text style={s.ackIntro}>
            I the undersigned acknowledge that I have read and understand the risk management report described above.{'\n'}
            I also acknowledge that I have received a copy of this risk management report.{'\n\n'}
            I acknowledge this report does not replace site/task-specific risk assessments (e.g. SWMS/JSEA) and does not certify compliance.
          </Text>

          <View style={s.ackTable}>
            <View style={s.ackHeaderRow}>
              {['Date', 'Name', 'Company / Position', 'Signature'].map((h, i) => (
                <Text
                  key={h}
                  style={[s.ackHeaderCell, i === 3 ? { flex: 2 } : { flex: 1 }]}
                >
                  {h}
                </Text>
              ))}
            </View>
            {[0, 1, 2, 3, 4, 5].map((row) => (
              <View key={row} style={[s.ackDataRow, row % 2 === 1 ? s.ackDataRowAlt : {}]}>
                {[0, 1, 2, 3].map((col) => (
                  <Text
                    key={col}
                    style={[s.ackDataCell, col === 3 ? { flex: 2 } : { flex: 1 }]}
                  >
                    {' '}
                  </Text>
                ))}
              </View>
            ))}
          </View>

          {/* QR code for hosted report */}
          {qrCodeDataUrl && publicReportUrl && (
            <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: BORDER, paddingTop: 16 }}>
              <Image src={qrCodeDataUrl} style={{ width: 72, height: 72, marginRight: 14 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: NAVY, marginBottom: 4 }}>
                  Scan to view this report online
                </Text>
                <Text style={{ fontSize: 7, color: MID_GREY, lineHeight: 1.4 }}>
                  Print this page and mount the QR code on the machine. Anyone can scan it to instantly view this risk assessment — no app, no login.
                </Text>
                <Text style={{ fontSize: 6.5, color: ORANGE, marginTop: 4, fontFamily: 'Helvetica-Bold' }}>
                  {publicReportUrl}
                </Text>
              </View>
            </View>
          )}
        </View>
        <PageFooter basics={basics} logoDataUrl={logoDataUrl} />
      </Page>
    </Document>
  );
}
