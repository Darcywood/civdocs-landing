import { z } from 'zod';

// Step 1 — Basics
export const yearsOperatingOptions = [
  { value: 'under_2', label: 'Under 2 years' },
  { value: '2_5', label: '2–5 years' },
  { value: '5_10', label: '5–10 years' },
  { value: '10_plus', label: '10+ years' },
] as const;

export const businessTypeOptions = [
  { value: 'civil_contractor', label: 'Civil Contractor' },
  { value: 'plant_hire', label: 'Plant Hire' },
  { value: 'both', label: 'Both' },
  { value: 'subcontractor', label: 'Subcontractor' },
] as const;

export const coreServicesOptions = [
  { value: 'earthworks', label: 'Earthworks' },
  { value: 'roads', label: 'Roads' },
  { value: 'drainage', label: 'Drainage' },
  { value: 'demolition', label: 'Demolition' },
  { value: 'bulk_excavation', label: 'Bulk Excavation' },
  { value: 'other', label: 'Other' },
] as const;

export const typicalClientsOptions = [
  { value: 'local_council', label: 'Local Council' },
  { value: 'state_government', label: 'State Government' },
  { value: 'tier_1_contractor', label: 'Tier 1 Contractor' },
  { value: 'private_developer', label: 'Private Developer' },
  { value: 'mining', label: 'Mining' },
] as const;

// Step 2 — Proof
export const projectSizeOptions = [
  { value: 'under_100k', label: 'Under $100k' },
  { value: '100k_500k', label: '$100k–$500k' },
  { value: '500k_2m', label: '$500k–$2M' },
  { value: '2m_plus', label: '$2M+' },
] as const;

export const plantEquipmentOptions = [
  { value: 'excavators', label: 'Excavators' },
  { value: 'bulldozers', label: 'Bulldozers' },
  { value: 'loaders', label: 'Loaders' },
  { value: 'graders', label: 'Graders' },
  { value: 'dump_trucks', label: 'Dump Trucks' },
  { value: 'compactors', label: 'Compactors' },
  { value: 'water_carts', label: 'Water Carts' },
  { value: 'tippers', label: 'Tippers' },
  { value: 'other', label: 'Other' },
] as const;

export const complianceOptions = [
  { value: 'public_liability', label: 'Public Liability' },
  { value: 'workers_comp', label: 'Workers Comp' },
  { value: 'swms_whs', label: 'SWMS/WHS' },
  { value: 'iso_9001', label: 'ISO 9001' },
  { value: 'iso_14001', label: 'ISO 14001' },
  { value: 'iso_45001', label: 'ISO 45001' },
  { value: 'other', label: 'Other' },
] as const;

export const audienceOptions = [
  { value: 'head_contractors', label: 'Head Contractors' },
  { value: 'government', label: 'Government' },
  { value: 'private_clients', label: 'Private Clients' },
  { value: 'mining_companies', label: 'Mining Companies' },
] as const;

// Sub-schemas
const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  client: z.string().optional(),
  location: z.string().optional(),
  duration: z.string().optional(),
  scope: z.string().min(1, 'Scope is required'),
  challenges: z.string().optional(),
  value: z.string().optional(),
  outcome: z.string().optional(),
});

const personnelSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  yearsExperience: z.string().min(1, 'Years experience is required'),
});

// Step 1 schema
export const step1Schema = z.object({
  businessName: z.string().min(1, 'Business name is required').max(100),
  locationRegions: z.string().min(1, 'Location/regions is required').max(200),
  yearsOperating: z.enum(['under_2', '2_5', '5_10', '10_plus']),
  businessType: z.enum(['civil_contractor', 'plant_hire', 'both', 'subcontractor']),
  coreServices: z.array(z.string()).min(1, 'Select at least one core service'),
  coreServicesOther: z.string().optional(),
  typicalClients: z.array(z.string()).min(1, 'Select at least one typical client'),
  phone: z.string().max(20).optional(),
  abn: z.string().max(20).optional(),
  website: z.string().max(200).optional(),
  contactEmail: z.string().email('Valid email required').or(z.literal('')).optional(),
  missionStatement: z.string().max(500).optional(),
});

// Step 2 schema
export const step2Schema = z.object({
  projects: z.array(projectSchema).min(2, 'Add at least 2 projects').max(4),
  averageProjectSize: z.enum(['under_100k', '100k_500k', '500k_2m', '2m_plus']),
  keyPersonnel: z.array(personnelSchema).min(1, 'Add at least one key person').max(3),
  plantEquipment: z.array(z.string()).min(1, 'Select at least one plant/equipment type'),
  plantEquipmentOther: z.preprocess(
    (val) => (Array.isArray(val) ? val : typeof val === 'string' && val.trim() ? [val.trim()] : []),
    z.array(z.string()).optional().default([])
  ),
  compliance: z.array(z.string()).min(1, 'Select at least one compliance/certification'),
  complianceOther: z.preprocess(
    (val) => (Array.isArray(val) ? val : typeof val === 'string' && val.trim() ? [val.trim()] : []),
    z.array(z.string()).optional().default([])
  ),
  audience: z.enum(['head_contractors', 'government', 'private_clients', 'mining_companies']),
});

// Step 3 schema (lead capture + optional files validated separately)
export const step3LeadSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  email: z.string().email('Valid email is required'),
  marketingConsent: z.boolean(),
  accentColour: z.string().max(20).optional(),
  _gotcha: z.string().max(0).optional(), // Honeypot
});

export const step3Schema = step3LeadSchema.extend({
  logo: z.instanceof(File).optional(),
  projectPhotos: z.array(z.instanceof(File)).max(4).optional(),
  plantPhotos: z.array(z.instanceof(File)).max(4).optional(),
});

// Full form type (for wizard state)
export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;

export interface CapabilityFormData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
}

// Generate API payload
export const generatePayloadSchema = z.object({
  submissionId: z.string().uuid().optional(),
  answers: z.object({
    step1: step1Schema,
    step2: step2Schema,
  }),
  lead: z.object({
    firstName: z.string().min(1).max(100),
    email: z.string().email(),
    marketingConsent: z.boolean(),
    accentColour: z.string().max(20).optional(),
  }),
  uploadManifest: z.array(z.string()).optional(),
  projectPhotoMap: z.array(z.number()).optional(),
  _gotcha: z.string().max(0).optional(),
});

export type GeneratePayload = z.infer<typeof generatePayloadSchema>;

// AI / buildContent output schema
export interface PdfContent {
  company_overview: string;
  core_capabilities: string[];
  regions: string[];
  project_experience: Array<{
    name: string;
    client: string | null;
    location: string | null;
    duration: string | null;
    scope: string;
    challenges: string | null;
    value: string | null;
    outcome: string | null;
  }>;
  plant_and_equipment: Array<{ name: string; description: string }>;
  key_personnel: Array<{ name: string; role: string; experience: string }>;
  compliance: string[];
  audience_note: string | null;
}
