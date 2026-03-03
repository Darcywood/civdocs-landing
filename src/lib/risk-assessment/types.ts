export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type QuestionAnswer = 'yes' | 'no' | 'na' | null;
export type OperationCategory = 'DELIVERY' | 'OPERATION' | 'DESIGN COMPLIANCE' | 'MAINTENANCE';

export interface RiskRating {
  label: RiskLevel;
  value: number;
}

export interface RiskTreatment {
  name: string;
  hazards: string[];
  prelimRating: RiskRating;
  residualRating: RiskRating;
  treatmentText: string;
  references: string;
  operationCategory: OperationCategory;
}

export interface Question {
  id: string;
  text: string;
  shortLabel: string;
  surveyGroup: string;
  allowNA: boolean;
  naCondition?: string;
  treatment: RiskTreatment;
}

// ---- Operating Context (Step 1) ----
export const SITE_TYPES = [
  'Civil roadworks',
  'Subdivision',
  'Quarry',
  'Public road',
  'Industrial site',
  'Confined site',
] as const;

export const SITE_CONDITIONS = [
  'Works near pedestrians',
  'Works near traffic',
  'Night works',
  'Steep slopes',
  'Soft ground',
  'Overhead services',
  'Underground services',
  'Works near excavation',
] as const;

export type SiteType = (typeof SITE_TYPES)[number];
export type SiteCondition = (typeof SITE_CONDITIONS)[number];

export interface OperatingContext {
  siteTypes: SiteType[];
  siteConditions: Record<SiteCondition, boolean>;
}

// Elevated risks derived from operating context
export const ELEVATED_RISK_LABELS = [
  'Collision risk',
  'Rollover risk',
  'Visibility risk',
  'Overhead strike risk',
  'Underground strike risk',
  'Entrapment risk',
  'Slip/trip risk',
  'Excavation/collapse risk',
] as const;

export type ElevatedRiskLabel = (typeof ELEVATED_RISK_LABELS)[number];

/** Derive elevated risks from operating context selections */
export function deriveElevatedRisks(ctx: OperatingContext): ElevatedRiskLabel[] {
  const risks: Set<ElevatedRiskLabel> = new Set();
  const { siteTypes, siteConditions } = ctx;

  if (siteConditions['Works near pedestrians'] || siteConditions['Works near traffic']) {
    risks.add('Collision risk');
  }
  if (siteConditions['Steep slopes'] || siteConditions['Soft ground'] || siteTypes.includes('Confined site')) {
    risks.add('Rollover risk');
  }
  if (siteConditions['Night works']) {
    risks.add('Visibility risk');
  }
  if (siteConditions['Overhead services']) {
    risks.add('Overhead strike risk');
  }
  if (siteConditions['Underground services']) {
    risks.add('Underground strike risk');
  }
  if (siteTypes.includes('Confined site')) {
    risks.add('Entrapment risk');
  }
  if (siteConditions['Soft ground'] || siteConditions['Steep slopes']) {
    risks.add('Slip/trip risk');
  }
  if (siteConditions['Works near excavation']) {
    risks.add('Excavation/collapse risk');
  }

  return [...risks];
}

// ---- Machine Basics (Step 1) ----
export interface MachineBasics {
  reportNumber: string;
  date: string;
  assessmentPurpose: string;
  state: string;
  owner: string;
  assessorName: string;
  make: string;
  model: string;
  machineType: string;
  assetNumber: string;
  registration: string;
  operatingContext?: OperatingContext;
}

// ---- Grader Specs (Step 2) ----
export interface GraderSpecs {
  // Noise
  noise_mfr_dba?: string;
  noise_ambient_dba?: string;
  noise_operator_high?: string;
  noise_operator_low?: string;
  noise_lhs?: string;
  noise_front?: string;
  noise_rhs?: string;
  noise_rear?: string;
  // Blade
  blade_height_mm?: string;
  blade_length_mm?: string;
  blade_lift_mm?: string;
  blade_thickness_mm?: string;
  blade_tilt?: string;
  // Body
  body_type?: string;
  articulation_deg?: string;
  // Capacities
  fuel_capacity_l?: string;
  hydraulic_oil_capacity_l?: string;
  // Dimensions/Weights
  front_axle_oscillation?: string;
  height_cab_mm?: string;
  length_mm?: string;
  operating_weight_kg?: string;
  shoulder_reach?: string;
  turn_circle_mm?: string;
  width_no_blade_mm?: string;
  // Drives
  drive?: string;
  // Engine
  engine_displacement?: string;
  engine_hours?: string;
  engine_make_model?: string;
  engine_number?: string;
  engine_power?: string;
  engine_cylinders?: string;
  engine_torque?: string;
  engine_torque_rise?: string;
  engine_variable_power?: string;
  // Extras
  front_wheel_drive?: string;
  // Hydraulics
  hydraulic_flow?: string;
  hydraulic_pressure?: string;
  hydraulic_system?: string;
  // Plant Classifications
  plant_class?: string;
  plant_year?: string;
  // Safety Structures
  fops_compliance?: string;
  fops_serial?: string;
  rops_compliance?: string;
  rops_serial?: string;
  // Steering
  front_wheel_lean?: string;
  // Transmission
  max_speed?: string;
  speeds_fr?: string;
  transmission?: string;
  // Tyres
  tyre_size?: string;
  // Extras checklist
  extras_air_conditioning?: boolean;
  extras_drawbar?: boolean;
  extras_final_trim?: boolean;
  extras_fops?: boolean;
  extras_front_grader_blade?: boolean;
  extras_grader_blade?: boolean;
  extras_rippers_centre?: boolean;
  extras_rippers_rear?: boolean;
  extras_roller_attachment?: boolean;
  extras_rops_cabin?: boolean;
  extras_wheel_chocks?: boolean;
}

// ---- Excavator Specs (Step 2 — Excavator) ----
export interface ExcavatorSpecs {
  // Noise
  noise_mfr_dba?: string;
  // Engine
  engine_make_model?: string;
  engine_displacement?: string;
  engine_power?: string;
  engine_cylinders?: string;
  engine_torque?: string;
  engine_hours?: string;
  engine_number?: string;
  // Weight / Dimensions
  operating_weight_kg?: string;
  overall_length_mm?: string;
  overall_width_mm?: string;
  overall_height_mm?: string;
  tail_swing_radius_mm?: string;
  zero_tail_swing?: string;
  // Undercarriage
  track_width_mm?: string;
  undercarriage_length_mm?: string;
  // Digging performance
  max_dig_depth_mm?: string;
  max_reach_mm?: string;
  max_cutting_height_mm?: string;
  max_dump_height_mm?: string;
  // Swing / Travel
  swing_speed_rpm?: string;
  travel_speed_kmh?: string;
  // Capacities
  bucket_capacity_m3?: string;
  fuel_capacity_l?: string;
  // Hydraulics
  hydraulic_flow_lpm?: string;
  hydraulic_pressure_bar?: string;
  // Safety structures
  rops_compliance?: string;
  rops_serial?: string;
  fops_compliance?: string;
  fops_serial?: string;
  // Plant classification
  plant_class?: string;
  plant_year?: string;
  // Tyres (wheeled excavators)
  tyre_size?: string;
  // Extras checklist
  extras_air_conditioning?: boolean;
  extras_fops?: boolean;
  extras_rops_cabin?: boolean;
  extras_quick_hitch?: boolean;
  extras_hydraulic_quick_hitch?: boolean;
  extras_rear_camera?: boolean;
  extras_proximity_detection?: boolean;
  extras_wheel_chocks?: boolean;
}

// ---- Posi Track Specs (Step 2 — Posi Track / Compact Track Loader) ----
export interface PosiTrackSpecs {
  noise_mfr_dba?: string;
  operating_weight_kg?: string;
  rated_operating_capacity_kg?: string;
  breakout_force_kn?: string;
  lift_height_mm?: string;
  dump_height_mm?: string;
  dump_reach_mm?: string;
  bucket_capacity_m3?: string;
  engine_make_model?: string;
  engine_displacement?: string;
  engine_power?: string;
  engine_cylinders?: string;
  engine_torque?: string;
  engine_hours?: string;
  engine_number?: string;
  travel_speed_kmh?: string;
  track_width_mm?: string;
  overall_length_mm?: string;
  overall_width_mm?: string;
  overall_height_mm?: string;
  fuel_capacity_l?: string;
  hydraulic_flow_lpm?: string;
  hydraulic_pressure_bar?: string;
  rops_compliance?: string;
  rops_serial?: string;
  fops_compliance?: string;
  fops_serial?: string;
  plant_class?: string;
  plant_year?: string;
  extras_air_conditioning?: boolean;
  extras_fops?: boolean;
  extras_rops_cabin?: boolean;
  extras_rear_camera?: boolean;
  extras_proximity_detection?: boolean;
  extras_wheel_chocks?: boolean;
}

// ---- Roller Specs (Step 2 — Roller / Compaction Roller) ----
export interface RollerSpecs {
  noise_mfr_dba?: string;
  drum_width_mm?: string;
  drum_diameter_mm?: string;
  operating_weight_kg?: string;
  centrifugal_force_kn?: string;
  vibrating_frequency_hz?: string;
  engine_make_model?: string;
  engine_displacement?: string;
  engine_power?: string;
  engine_cylinders?: string;
  engine_torque?: string;
  engine_hours?: string;
  engine_number?: string;
  travel_speed_kmh?: string;
  overall_length_mm?: string;
  overall_width_mm?: string;
  overall_height_mm?: string;
  fuel_capacity_l?: string;
  hydraulic_flow_lpm?: string;
  hydraulic_pressure_bar?: string;
  rops_compliance?: string;
  rops_serial?: string;
  fops_compliance?: string;
  fops_serial?: string;
  plant_class?: string;
  plant_year?: string;
  extras_air_conditioning?: boolean;
  extras_fops?: boolean;
  extras_rops_cabin?: boolean;
  extras_rear_camera?: boolean;
  extras_wheel_chocks?: boolean;
}

// ---- Section 2 Answers (Step 3) ----
export type Section2Answers = Record<string, QuestionAnswer>;

// ---- Lead (Step 4) ----
export interface RiskAssessmentLead {
  firstName: string;
  email: string;
  companyName: string;
  phone?: string;
  marketingConsent: boolean;
  /** Base64 data URLs of uploaded machine images (max 2, ~500KB each) */
  machineImages?: string[];
}

// ---- Full Form Payload ----
export interface RiskAssessmentPayload {
  submissionId?: string;
  basics: MachineBasics;
  specs: GraderSpecs | ExcavatorSpecs | PosiTrackSpecs | RollerSpecs;
  answers: Section2Answers;
  lead: RiskAssessmentLead;
  _gotcha?: string;
}

// ---- PDF generation ----
export interface TreatmentEntry {
  treatment: RiskTreatment;
  questionId: string;
}
