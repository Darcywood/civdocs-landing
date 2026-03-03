import type { Question } from './types';

export const ROLLER_SURVEY_GROUPS = [
  'Information',
  'Brakes',
  'Cabin/Work Area',
  'Controls',
  'Operator Protective Guards',
  'PPE',
  'Lighting',
  'Engine',
  'Battery',
  'Hydraulics',
  'Drum & Compaction',
  'Plant Condition',
] as const;

export const ROLLER_QUESTIONS: Question[] = [
  // ─── INFORMATION ─────────────────────────────────────────────────────────
  {
    id: 'rl_q_ops_handbook',
    shortLabel: "Manufacturer's operation handbook available",
    text: "Is the manufacturer's operation handbook available for this item of plant? (You cannot answer N/A)",
    surveyGroup: 'Information',
    allowNA: false,
    treatment: {
      name: 'Operation Handbook',
      hazards: ['INCORRECT OPERATION'],
      prelimRating: { label: 'HIGH', value: 22 },
      residualRating: { label: 'MEDIUM', value: 15 },
      operationCategory: 'OPERATION',
      treatmentText:
        "The manufacturer's operation handbook has been supplied for this item of plant. This handbook must be available at all times to all potential operators and supervisory staff. All potential operators must read and be familiar with this handbook prior to operating. A complete risk assessment/Job Safety Analysis must be undertaken covering all operating processes and environments associated with this item of plant. SWMS should be produced for specific tasks associated with use of this item of plant.",
      references: 'Work Health & Safety Act & Regulations- , Occupational Health & Safety Act & Regulations',
    },
  },
  {
    id: 'rl_q_maint_manual',
    shortLabel: "Manufacturer's maintenance manual(s) available",
    text: "Is the manufacturer's maintenance manual(s) available for this item of plant? (You cannot answer N/A)",
    surveyGroup: 'Information',
    allowNA: false,
    treatment: {
      name: 'Maintenance Manual',
      hazards: ['INCORRECT OPERATION'],
      prelimRating: { label: 'HIGH', value: 22 },
      residualRating: { label: 'MEDIUM', value: 15 },
      operationCategory: 'MAINTENANCE',
      treatmentText:
        "The manufacturer's maintenance manual(s) has been supplied for this item of plant. These manual(s) must be available at all times to all users and maintenance staff of this item of plant. All users and maintenance staff must read and be familiar with these handbook(s) prior to maintaining or repairing this item of plant. A complete risk assessment/JSEA must be undertaken covering all inspection, maintenance, servicing and transportation requirements of this piece of plant prior to use.",
      references: 'Work Health & Safety Act & Regulations- , Occupational Health & Safety Act & Regulations',
    },
  },
  {
    id: 'rl_q_service_records',
    shortLabel: 'Service and maintenance records available',
    text: 'Are the service and maintenance records available for this item of plant? (You cannot answer N/A)',
    surveyGroup: 'Information',
    allowNA: false,
    treatment: {
      name: 'Service Records',
      hazards: ['OPERATIONAL MALFUNCTION'],
      prelimRating: { label: 'HIGH', value: 21 },
      residualRating: { label: 'MEDIUM', value: 15 },
      operationCategory: 'MAINTENANCE',
      treatmentText:
        'Service and maintenance records are available for this item of plant. These records must continue to be managed and available at all times as part of your service and maintenance programme. (This programme includes the undertaking of regular inspections of the item of plant with specific reference to all OEM prescribed, scheduled and non scheduled service and maintenance requirements).',
      references: 'Work Health & Safety Act & Regulations- , Occupational Health & Safety Act & Regulations',
    },
  },
  {
    id: 'rl_q_preop_checklist',
    shortLabel: 'Pre-operational safety checklist available',
    text: 'Is a pre-operational safety checklist available for this Roller? (You cannot answer N/A)',
    surveyGroup: 'Information',
    allowNA: false,
    treatment: {
      name: 'Pre-op Checklist Roller',
      hazards: ['INCORRECT OPERATION'],
      prelimRating: { label: 'HIGH', value: 22 },
      residualRating: { label: 'MEDIUM', value: 15 },
      operationCategory: 'OPERATION',
      treatmentText:
        'A pre-operational checklist is available for this Roller. All operators must complete this checklist prior to operating this Roller.',
      references: 'Work Health & Safety Act & Regulations- , Occupational Health & Safety Act & Regulations',
    },
  },
  {
    id: 'rl_q_sop',
    shortLabel: 'Safe Operation Procedures available',
    text: 'Are Safe Operation Procedures available for this Roller? (You cannot answer N/A)',
    surveyGroup: 'Information',
    allowNA: false,
    treatment: {
      name: 'SOP Roller',
      hazards: ['INCORRECT OPERATION'],
      prelimRating: { label: 'HIGH', value: 22 },
      residualRating: { label: 'MEDIUM', value: 15 },
      operationCategory: 'OPERATION',
      treatmentText:
        'Safe Operation Procedures are available for this Roller. The information in the Safe Operation Procedures must be followed at all times whilst operating this Roller.',
      references: 'Work Health & Safety Act & Regulations- , Occupational Health & Safety Act & Regulations',
    },
  },
  {
    id: 'rl_q_operator_qualified',
    shortLabel: 'Operators qualified, trained, and experienced',
    text: 'Are all persons who operate this item of plant qualified, trained and experienced to do so, and where necessary do they hold the relevant certification/license?',
    surveyGroup: 'Information',
    allowNA: false,
    treatment: {
      name: 'Operator Competency',
      hazards: ['INCORRECT OPERATION'],
      prelimRating: { label: 'CRITICAL', value: 24 },
      residualRating: { label: 'MEDIUM', value: 15 },
      operationCategory: 'OPERATION',
      treatmentText:
        'Only persons who are qualified, trained and experienced and/or hold the relevant certification/license can operate this item of plant. If there is not a competent/licensed person available for operation of this item of plant then only persons who are supervised by a competent/licensed person can operate this item of plant.',
      references: 'Work Health & Safety Act & Regulations- , Occupational Health & Safety Act & Regulations',
    },
  },
  {
    id: 'rl_q_swms_loading',
    shortLabel: 'SWMS/SOP for loading and unloading available',
    text: 'Are specific guidelines/SWMS/SOP available for loading and unloading this item of plant to & from the load deck of a truck or trailer?',
    surveyGroup: 'Information',
    allowNA: true,
    treatment: {
      name: 'SWMS Loading/Unloading',
      hazards: ['CRUSHING'],
      prelimRating: { label: 'HIGH', value: 22 },
      residualRating: { label: 'MEDIUM', value: 15 },
      operationCategory: 'DELIVERY',
      treatmentText:
        'Ensure that all operators follow approved SWMS/SOP when loading and unloading this machine to and from a flat top truck or trailer, low loader or tilt tray.',
      references: 'Work Health & Safety Act & Regulations- , Occupational Health & Safety Act & Regulations',
    },
  },
  {
    id: 'rl_q_swms_restraint',
    shortLabel: 'SWMS/SOP for load restraint available',
    text: 'Are specific load restraint guidelines/SWMS/SOP available when restraining this item of plant on to the load deck of a truck or trailer?',
    surveyGroup: 'Information',
    allowNA: true,
    treatment: {
      name: 'SWMS Load Restraint',
      hazards: ['CRUSHING'],
      prelimRating: { label: 'HIGH', value: 22 },
      residualRating: { label: 'MEDIUM', value: 15 },
      operationCategory: 'DELIVERY',
      treatmentText:
        'Ensure that all operators follow the approved SWMS/SOP when restraining this machine for transport.',
      references: 'Work Health & Safety Act & Regulations- , Occupational Health & Safety Act & Regulations',
    },
  },

  // ─── BRAKES ──────────────────────────────────────────────────────────────
  {
    id: 'rl_q_brakes_functional',
    shortLabel: 'Brakes fully functional',
    text: 'Are the brakes fitted to this item of plant fully functional?',
    surveyGroup: 'Brakes',
    allowNA: false,
    treatment: {
      name: 'Brakes',
      hazards: ['CRUSHING', 'COLLISION'],
      prelimRating: { label: 'CRITICAL', value: 25 },
      residualRating: { label: 'MEDIUM', value: 15 },
      operationCategory: 'MAINTENANCE',
      treatmentText:
        'The brakes fitted to this item of plant must be kept serviceable and verified by the operator/owner at all times whilst this item of plant is in operation. The brakes must be regularly inspected and tested. These inspections and tests must be documented as part of your plant safety programme.',
      references: 'AS3450',
    },
  },
  {
    id: 'rl_q_park_brake',
    shortLabel: 'Park (hand) brake fitted and fully functional',
    text: 'Is this item of plant fitted with a fully functional park (hand) brake, which meets the following requirements – 1. Is separate to the service brakes 2. Has a device which maintains the brake in the on position until intentionally disengaged?',
    surveyGroup: 'Brakes',
    allowNA: false,
    treatment: {
      name: 'Park Brake',
      hazards: ['CRUSHING', 'COLLISION'],
      prelimRating: { label: 'CRITICAL', value: 24 },
      residualRating: { label: 'MEDIUM', value: 15 },
      operationCategory: 'DESIGN COMPLIANCE',
      treatmentText:
        'This item of plant is reported/observed as fitted with a fully functional park (hand) brake which meets the following requirements – 1. Is separate to the service brakes 2. Has a device which maintains the brake in the on position until intentionally disengaged. The park brake must be regularly inspected and tested. These inspections and tests must be documented as part of your plant safety programme.',
      references: 'AS3450',
    },
  },

  // ─── CABIN / WORK AREA ───────────────────────────────────────────────────
  {
    id: 'rl_q_cabin_access_steps',
    shortLabel: 'Cabin access/egress — slip-resistant steps, 3 points of contact',
    text: 'Does the cabin/work area access and egress have slip resistant steps that are free from damage, located at the appropriate height to allow safe access and egress without undue bodystressing/strains, with three points of contact available at all times?',
    surveyGroup: 'Cabin/Work Area',
    allowNA: false,
    treatment: {
      name: 'Operator Work Area Access/Egress',
      hazards: ['SLIPPING'],
      prelimRating: { label: 'MEDIUM', value: 12 },
      residualRating: { label: 'LOW', value: 6 },
      operationCategory: 'DESIGN COMPLIANCE',
      treatmentText:
        'Safe access and egress to the cabin/work area(s) must be maintained at all times whilst this item of plant is in operation. It must be non slip, free from damage, located at a height so as to not cause undue body stresses and strains with three points of contact available to personnel at all times.',
      references: 'AS5327',
    },
  },
  {
    id: 'rl_q_emergency_exits_compliance',
    shortLabel: 'Emergency exits — labelled, instructions clear, tools available',
    text: 'Do the emergency exits for this item of plant meet the following requirements - 1. Clearly and legibly labelled 2. Instructions for use are clear and legible and located adjacent the exit 3. Any required tools required for use are available e.g. Emergency hammers? (Answer NA if no emergency exits due to no cabin)',
    surveyGroup: 'Cabin/Work Area',
    allowNA: true,
    naCondition: 'Answer N/A if no emergency exits due to no cabin',
    treatment: {
      name: 'Emergency Exits',
      hazards: ['ENTRAPMENT'],
      prelimRating: { label: 'HIGH', value: 21 },
      residualRating: { label: 'MEDIUM', value: 15 },
      operationCategory: 'DESIGN COMPLIANCE',
      treatmentText:
        'The emergency exits for this item of plant meet the following requirements – 1. Clearly and legibly labelled 2. Instructions for use are clear and legible and located adjacent the exit 3. Any required tools required for use are available e.g. Emergency hammers.',
      references: 'ISO31000',
    },
  },
  {
    id: 'rl_q_operator_seat',
    shortLabel: 'Operator seat — adjustable, secure, no damage',
    text: 'Is the operator seat adjustable, securely mounted and free from damage?',
    surveyGroup: 'Cabin/Work Area',
    allowNA: false,
    treatment: {
      name: 'Operator Seat',
      hazards: ['INCORRECT OPERATION', 'FALLING'],
      prelimRating: { label: 'MEDIUM', value: 12 },
      residualRating: { label: 'LOW', value: 6 },
      operationCategory: 'DESIGN COMPLIANCE',
      treatmentText:
        'The operator seat must be adjustable, securely mounted and free from damage at all times whilst this item of plant is in operation.',
      references: 'AS/NZS4024.1201',
    },
  },
  {
    id: 'rl_q_seat_belt',
    shortLabel: 'Seat belt fitted and functional',
    text: 'Is this item of plant fitted with a fully functional seat belt?',
    surveyGroup: 'Cabin/Work Area',
    allowNA: false,
    treatment: {
      name: 'Seat Belt',
      hazards: ['EJECTION', 'ROLLOVER'],
      prelimRating: { label: 'CRITICAL', value: 24 },
      residualRating: { label: 'MEDIUM', value: 15 },
      operationCategory: 'DESIGN COMPLIANCE',
      treatmentText:
        'This item of plant is reported/observed as fitted with a fully functional seat belt. The seat belt must be worn at all times whilst operating this item of plant.',
      references: 'AS/NZS4024.1201',
    },
  },

  // ─── CONTROLS ────────────────────────────────────────────────────────────
  {
    id: 'rl_q_control_labels',
    shortLabel: 'Control labels — present, legible',
    text: 'Are all control labels present and legible?',
    surveyGroup: 'Controls',
    allowNA: false,
    treatment: {
      name: 'Control Labels',
      hazards: ['INCORRECT OPERATION'],
      prelimRating: { label: 'MEDIUM', value: 12 },
      residualRating: { label: 'LOW', value: 6 },
      operationCategory: 'DESIGN COMPLIANCE',
      treatmentText:
        'All control labels must be present and legible at all times whilst this item of plant is in operation.',
      references: 'AS/NZS4024.1201',
    },
  },
  {
    id: 'rl_q_neutral_start',
    shortLabel: 'Neutral start — machine will not start unless in neutral',
    text: 'Does this item of plant have a neutral start device (machine will not start unless in neutral)?',
    surveyGroup: 'Controls',
    allowNA: false,
    treatment: {
      name: 'Neutral Start',
      hazards: ['CRUSHING', 'COLLISION'],
      prelimRating: { label: 'HIGH', value: 21 },
      residualRating: { label: 'MEDIUM', value: 15 },
      operationCategory: 'DESIGN COMPLIANCE',
      treatmentText:
        'This item of plant is reported/observed as fitted with a neutral start device. The machine will not start unless in neutral.',
      references: 'AS/NZS4024.1201',
    },
  },
  {
    id: 'rl_q_reverse_alarm',
    shortLabel: 'Reverse movement alarm fitted and functional',
    text: 'Is this item of plant fitted with a fully functional reverse movement alarm?',
    surveyGroup: 'Controls',
    allowNA: false,
    treatment: {
      name: 'Reverse Movement Alarm',
      hazards: ['CRUSHING', 'COLLISION'],
      prelimRating: { label: 'HIGH', value: 21 },
      residualRating: { label: 'MEDIUM', value: 15 },
      operationCategory: 'DESIGN COMPLIANCE',
      treatmentText:
        'This item of plant is reported/observed as fitted with a fully functional reverse movement alarm. This alarm must be kept serviceable and verified by the operator/owner at all times.',
      references: 'AS/NZS4024.1201',
    },
  },
  {
    id: 'rl_q_emergency_stop',
    shortLabel: 'Emergency stop/shutdown device fitted and functional',
    text: 'Is this item of plant fitted with a fully functional emergency stop/shutdown device?',
    surveyGroup: 'Controls',
    allowNA: false,
    treatment: {
      name: 'Emergency Stop/Shutdown Device',
      hazards: ['CRUSHING', 'ENTRAPMENT'],
      prelimRating: { label: 'CRITICAL', value: 24 },
      residualRating: { label: 'MEDIUM', value: 15 },
      operationCategory: 'DESIGN COMPLIANCE',
      treatmentText:
        'This item of plant is reported/observed as fitted with a fully functional emergency stop/shutdown device. This device must be kept serviceable and verified by the operator/owner at all times.',
      references: 'AS/NZS4024.1201',
    },
  },

  // ─── OPERATOR PROTECTIVE GUARDS ──────────────────────────────────────────
  {
    id: 'rl_q_rops_compliance',
    shortLabel: 'ROPS fitted and compliant',
    text: 'Is this item of plant fitted with ROPS (Roll Over Protective Structure) that meets the applicable standard?',
    surveyGroup: 'Operator Protective Guards',
    allowNA: false,
    treatment: {
      name: 'Earthmoving ROPS',
      hazards: ['EJECTION', 'ROLLOVER'],
      prelimRating: { label: 'CRITICAL', value: 25 },
      residualRating: { label: 'MEDIUM', value: 15 },
      operationCategory: 'DESIGN COMPLIANCE',
      treatmentText:
        'This item of plant is reported/observed as fitted with ROPS that meets the applicable standard. The ROPS must be kept serviceable and free from damage at all times.',
      references: 'AS/NZS4024.1201, ISO3471',
    },
  },
  {
    id: 'rl_q_fops_compliance',
    shortLabel: 'FOPS fitted and compliant (where required)',
    text: 'Is this item of plant fitted with FOPS (Falling Object Protective Structure) that meets the applicable standard where required? (Answer N/A if FOPS not required for this machine type)',
    surveyGroup: 'Operator Protective Guards',
    allowNA: true,
    naCondition: 'Answer N/A if FOPS not required for this machine type',
    treatment: {
      name: 'FOPS General',
      hazards: ['STRUCK BY FALLING OBJECT'],
      prelimRating: { label: 'HIGH', value: 21 },
      residualRating: { label: 'MEDIUM', value: 15 },
      operationCategory: 'DESIGN COMPLIANCE',
      treatmentText:
        'This item of plant is reported/observed as fitted with FOPS that meets the applicable standard. The FOPS must be kept serviceable and free from damage at all times.',
      references: 'AS/NZS4024.1201, ISO3449',
    },
  },

  // ─── PPE ─────────────────────────────────────────────────────────────────
  {
    id: 'rl_q_hearing_protection_label',
    shortLabel: 'Hearing protection label — operator position',
    text: 'Is there a hearing protection label at the operator position?',
    surveyGroup: 'PPE',
    allowNA: false,
    treatment: {
      name: 'Hearing Protection Label - Operator',
      hazards: ['NOISE'],
      prelimRating: { label: 'MEDIUM', value: 12 },
      residualRating: { label: 'LOW', value: 6 },
      operationCategory: 'OPERATION',
      treatmentText:
        'A hearing protection label is fitted at the operator position. Hearing protection must be worn when operating this item of plant as per the manufacturer\'s instructions.',
      references: 'AS/NZS1269',
    },
  },

  // ─── LIGHTING ──────────────────────────────────────────────────────────────
  {
    id: 'rl_q_machine_lights',
    shortLabel: 'Machine lights — present and functional',
    text: 'Are all required machine lights present and fully functional?',
    surveyGroup: 'Lighting',
    allowNA: false,
    treatment: {
      name: 'Machine Lights',
      hazards: ['POOR VISIBILITY', 'COLLISION'],
      prelimRating: { label: 'MEDIUM', value: 12 },
      residualRating: { label: 'LOW', value: 6 },
      operationCategory: 'DESIGN COMPLIANCE',
      treatmentText:
        'All required machine lights must be present and fully functional at all times whilst this item of plant is in operation.',
      references: 'AS/NZS4024.1201',
    },
  },
  {
    id: 'rl_q_beacon',
    shortLabel: 'Beacon/warning light fitted and functional',
    text: 'Is this item of plant fitted with a fully functional beacon/warning light?',
    surveyGroup: 'Lighting',
    allowNA: false,
    treatment: {
      name: 'Beacon',
      hazards: ['COLLISION', 'STRUCK BY'],
      prelimRating: { label: 'MEDIUM', value: 12 },
      residualRating: { label: 'LOW', value: 6 },
      operationCategory: 'DESIGN COMPLIANCE',
      treatmentText:
        'This item of plant is reported/observed as fitted with a fully functional beacon/warning light. This must be kept serviceable and verified by the operator/owner at all times.',
      references: 'AS/NZS4024.1201',
    },
  },

  // ─── ENGINE ───────────────────────────────────────────────────────────────
  {
    id: 'rl_q_engine_guards',
    shortLabel: 'Engine guards fitted and secure',
    text: 'Are engine guards fitted and secure?',
    surveyGroup: 'Engine',
    allowNA: false,
    treatment: {
      name: 'Engine Guards',
      hazards: ['ENTANGLEMENT', 'BURNS'],
      prelimRating: { label: 'HIGH', value: 21 },
      residualRating: { label: 'MEDIUM', value: 15 },
      operationCategory: 'DESIGN COMPLIANCE',
      treatmentText:
        'Engine guards must be fitted and secure at all times whilst this item of plant is in operation.',
      references: 'AS/NZS4024.1201',
    },
  },
  {
    id: 'rl_q_exhaust',
    shortLabel: 'Exhaust — directed away from operator, no leaks',
    text: 'Is the exhaust system directed away from the operator and free from leaks?',
    surveyGroup: 'Engine',
    allowNA: false,
    treatment: {
      name: 'Exhaust',
      hazards: ['FUMES', 'BURNS'],
      prelimRating: { label: 'HIGH', value: 21 },
      residualRating: { label: 'MEDIUM', value: 15 },
      operationCategory: 'MAINTENANCE',
      treatmentText:
        'The exhaust system must be directed away from the operator and free from leaks at all times whilst this item of plant is in operation.',
      references: 'AS/NZS4024.1201',
    },
  },

  // ─── BATTERY ──────────────────────────────────────────────────────────────
  {
    id: 'rl_q_battery_cover',
    shortLabel: 'Battery cover fitted',
    text: 'Is the battery fitted with a cover?',
    surveyGroup: 'Battery',
    allowNA: false,
    treatment: {
      name: 'Battery Cover',
      hazards: ['ELECTRIC SHOCK', 'BURNS'],
      prelimRating: { label: 'MEDIUM', value: 12 },
      residualRating: { label: 'LOW', value: 6 },
      operationCategory: 'DESIGN COMPLIANCE',
      treatmentText:
        'The battery must be fitted with a cover at all times whilst this item of plant is in operation.',
      references: 'AS/NZS4024.1201',
    },
  },

  // ─── HYDRAULICS ──────────────────────────────────────────────────────────
  {
    id: 'rl_q_hydraulic_hoses',
    shortLabel: 'Hydraulic hoses — no damage, no leaks',
    text: 'Are all hydraulic hoses free from damage and leaks?',
    surveyGroup: 'Hydraulics',
    allowNA: false,
    treatment: {
      name: 'Hydraulic Hoses',
      hazards: ['INJECTION', 'BURNS'],
      prelimRating: { label: 'HIGH', value: 21 },
      residualRating: { label: 'MEDIUM', value: 15 },
      operationCategory: 'MAINTENANCE',
      treatmentText:
        'All hydraulic hoses must be free from damage and leaks at all times whilst this item of plant is in operation. Never use hands to check for leaks.',
      references: 'AS/NZS4024.1201',
    },
  },

  // ─── DRUM & COMPACTION ────────────────────────────────────────────────────
  {
    id: 'rl_q_drum_condition',
    shortLabel: 'Drum — good condition, no damage',
    text: 'Is the compaction drum in good condition and free from significant damage?',
    surveyGroup: 'Drum & Compaction',
    allowNA: false,
    treatment: {
      name: 'Drum Condition',
      hazards: ['CRUSHING', 'STRUCK BY'],
      prelimRating: { label: 'HIGH', value: 21 },
      residualRating: { label: 'MEDIUM', value: 15 },
      operationCategory: 'MAINTENANCE',
      treatmentText:
        'The compaction drum must be kept in good condition and free from significant damage at all times whilst this item of plant is in operation.',
      references: 'AS/NZS4024.1201',
    },
  },
  {
    id: 'rl_q_drum_crush_label',
    shortLabel: 'Drum crush zone label present',
    text: 'Is there a crush zone / pinch point warning label adjacent to the drum?',
    surveyGroup: 'Drum & Compaction',
    allowNA: false,
    treatment: {
      name: 'Drum Crush Zone Label',
      hazards: ['CRUSHING', 'ENTRAPMENT'],
      prelimRating: { label: 'MEDIUM', value: 12 },
      residualRating: { label: 'LOW', value: 6 },
      operationCategory: 'DESIGN COMPLIANCE',
      treatmentText:
        'A crush zone / pinch point warning label must be present adjacent to the drum. Personnel must stay clear of the drum during operation.',
      references: 'AS/NZS4024.1201',
    },
  },

  // ─── PLANT CONDITION ──────────────────────────────────────────────────────
  {
    id: 'rl_q_fluid_leaks',
    shortLabel: 'No major fluid leaks',
    text: 'Is this item of plant free from major fluid leaks (oil, fuel, hydraulic)?',
    surveyGroup: 'Plant Condition',
    allowNA: false,
    treatment: {
      name: 'Major Fluid Leaks',
      hazards: ['FIRE', 'SLIPPING', 'ENVIRONMENTAL'],
      prelimRating: { label: 'HIGH', value: 21 },
      residualRating: { label: 'MEDIUM', value: 15 },
      operationCategory: 'MAINTENANCE',
      treatmentText:
        'This item of plant must be free from major fluid leaks at all times whilst in operation. Any leaks must be repaired before use.',
      references: 'AS/NZS4024.1201',
    },
  },
  {
    id: 'rl_q_structural_integrity',
    shortLabel: 'Structural integrity — no significant damage',
    text: 'Is the structural integrity of this item of plant intact with no significant damage?',
    surveyGroup: 'Plant Condition',
    allowNA: false,
    treatment: {
      name: 'Structural Integrity',
      hazards: ['COLLAPSE', 'CRUSHING'],
      prelimRating: { label: 'CRITICAL', value: 24 },
      residualRating: { label: 'MEDIUM', value: 15 },
      operationCategory: 'MAINTENANCE',
      treatmentText:
        'The structural integrity of this item of plant must be maintained at all times. Any significant damage must be assessed and repaired before use.',
      references: 'AS/NZS4024.1201',
    },
  },
];
