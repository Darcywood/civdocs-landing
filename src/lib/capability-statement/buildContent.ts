import type { Step1Data, Step2Data, PdfContent } from './schema';
import {
  businessTypeOptions,
  yearsOperatingOptions,
  projectSizeOptions,
  audienceOptions,
  coreServicesOptions,
  plantEquipmentOptions,
  complianceOptions,
  typicalClientsOptions,
} from './schema';

function getLabel<T extends { value: string; label: string }>(opts: readonly T[], value: string): string {
  return opts.find((o) => o.value === value)?.label ?? value;
}

export function buildContentFromAnswers(step1: Step1Data, step2: Step2Data): PdfContent {
  const businessType = getLabel(businessTypeOptions, step1.businessType);
  const years = getLabel(yearsOperatingOptions, step1.yearsOperating);
  const projectSize = getLabel(projectSizeOptions, step2.averageProjectSize);
  const audience = getLabel(audienceOptions, step2.audience);

  const coreServices = step1.coreServices
    .map((v) => getLabel(coreServicesOptions, v))
    .filter(Boolean);
  if (step1.coreServicesOther?.trim()) {
    coreServices.push(step1.coreServicesOther.trim());
  }

  const typicalClients = step1.typicalClients
    .map((v) => getLabel(typicalClientsOptions, v))
    .filter(Boolean);

  const plantEquipment = step2.plantEquipment
    .map((v) => getLabel(plantEquipmentOptions, v))
    .filter(Boolean);
  const plantOtherArr = Array.isArray(step2.plantEquipmentOther)
    ? step2.plantEquipmentOther
    : typeof step2.plantEquipmentOther === 'string' && step2.plantEquipmentOther.trim()
      ? [step2.plantEquipmentOther.trim()]
      : [];
  plantOtherArr.forEach((s) => {
    const t = String(s).trim();
    if (t) plantEquipment.push(t);
  });

  const compliance = step2.compliance
    .map((v) => getLabel(complianceOptions, v))
    .filter(Boolean);
  const complianceOtherArr = Array.isArray(step2.complianceOther)
    ? step2.complianceOther
    : typeof step2.complianceOther === 'string' && step2.complianceOther.trim()
      ? [step2.complianceOther.trim()]
      : [];
  complianceOtherArr.forEach((s) => {
    const t = String(s).trim();
    if (t) compliance.push(t);
  });

  const companyOverview = `${step1.businessName} is a ${businessType} operating in ${step1.locationRegions}. With ${years} of experience, we deliver ${coreServices.slice(0, 3).join(', ')}${coreServices.length > 3 ? ' and more' : ''} to ${typicalClients.slice(0, 2).join(' and ')} clients.`;

  return {
    company_overview: companyOverview,
    core_capabilities: coreServices,
    regions: step1.locationRegions.split(/[,;]/).map((s) => s.trim()).filter(Boolean),
    project_experience: step2.projects.map((p) => ({
      name: p.name,
      client: p.client?.trim() || null,
      location: p.location?.trim() || null,
      duration: p.duration?.trim() || null,
      scope: p.scope,
      challenges: p.challenges?.trim() || null,
      value: p.value?.trim() || null,
      outcome: p.outcome?.trim() || null,
    })),
    plant_and_equipment: plantEquipment.map((name) => ({ name, description: '' })),
    key_personnel: step2.keyPersonnel.map((p) => ({
      name: p.name,
      role: p.role,
      experience: `${p.yearsExperience} years experience`,
    })),
    compliance,
    audience_note: `This capability statement is prepared for ${audience}. Typical project size: ${projectSize}.`,
  };
}
