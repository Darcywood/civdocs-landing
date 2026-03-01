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

// ---- Section 2 Answers (Step 3) ----
export type Section2Answers = Record<string, QuestionAnswer>;

// ---- Lead (Step 4) ----
export interface RiskAssessmentLead {
  firstName: string;
  email: string;
  companyName: string;
  phone?: string;
  marketingConsent: boolean;
}

// ---- Full Form Payload ----
export interface RiskAssessmentPayload {
  submissionId?: string;
  basics: MachineBasics;
  specs: GraderSpecs;
  answers: Section2Answers;
  lead: RiskAssessmentLead;
  _gotcha?: string;
}

// ---- PDF generation ----
export interface TreatmentEntry {
  treatment: RiskTreatment;
  questionId: string;
}
