import type { OperationCategory, Question, RiskLevel } from './types';

/**
 * Truck plant risk assessment.
 *
 * Built from Australian guidance for the trucks civil crews actually run
 * (rigid tippers, truck and dog, semi tippers, water carts, articulated
 * dump trucks, and service trucks):
 * - Model WHS Act and Regulations, and the Safe Work Australia Code of
 *   Practice "Managing the risks of plant in the workplace" (2024),
 *   including vehicle roll-away.
 * - Heavy Vehicle National Law and the NHVR Load Restraint Guide.
 * - WorkSafe Queensland alert "Working near, or on, tip trucks and tipper
 *   trailers" (2024): hoist failure, body props, tipping across a slope,
 *   stuck loads, and exclusion zones.
 * - WorkSafe Victoria and Safe Work Australia overhead-line guidance:
 *   a raised tipper body is a known cause of powerline contact.
 * - Off-highway articulated dump trucks: ROPS (ISO 3471), FOPS (ISO 3449)
 *   and a worn seatbelt. On-road cabs answer N/A to those items.
 */

const WHS =
  'Model Work Health and Safety Act & Regulations; Safe Work Australia Code of Practice: Managing the risks of plant in the workplace (2024)';
const HVNL = 'Heavy Vehicle National Law; NHVR Load Restraint Guide';
const TIP =
  'WorkSafe Queensland: Working near, or on, tip trucks and tipper trailers (2024)';
const LINES =
  'WorkSafe Victoria: Managing the risks of overhead powerlines; Safe Work Australia overhead electric lines guidance';

export const TRUCK_SURVEY_GROUPS = [
  'Information',
  'Licensing',
  'Brakes',
  'Access & cabin',
  'Visibility',
  'Reversing & traffic',
  'Load',
  'Hoist & tipping',
  'Coupling',
  'Hydraulics & power',
  'Condition',
] as const;

function q(opts: {
  id: string;
  shortLabel: string;
  text: string;
  surveyGroup: (typeof TRUCK_SURVEY_GROUPS)[number];
  allowNA?: boolean;
  naCondition?: string;
  name: string;
  hazards: string[];
  prelim: RiskLevel;
  prelimValue: number;
  category: OperationCategory;
  treatmentText: string;
  references: string;
}): Question {
  return {
    id: opts.id,
    shortLabel: opts.shortLabel,
    text: opts.text,
    surveyGroup: opts.surveyGroup,
    allowNA: opts.allowNA ?? false,
    naCondition: opts.naCondition,
    treatment: {
      name: opts.name,
      hazards: opts.hazards,
      prelimRating: { label: opts.prelim, value: opts.prelimValue },
      residualRating: { label: 'MEDIUM', value: 15 },
      operationCategory: opts.category,
      treatmentText: opts.treatmentText,
      references: opts.references,
    },
  };
}

export const TRUCK_QUESTIONS: Question[] = [
  q({
    id: 'tk_q_ops_handbook',
    shortLabel: "Manufacturer's operation handbook available",
    text: "Is the manufacturer's operation handbook available for this truck, including any tipping, coupling and load limits? (You cannot answer N/A)",
    surveyGroup: 'Information',
    name: 'Operation Handbook',
    hazards: ['INCORRECT OPERATION'],
    prelim: 'HIGH',
    prelimValue: 22,
    category: 'OPERATION',
    treatmentText:
      "The manufacturer's operation handbook is available for this truck, including the stated limits for tipping slope, raised-body height, coupling and load. The handbook must stay available to drivers and supervisors. Every driver must be familiar with it before operating. A task-specific SWMS is still required for tipping, coupling and work near people or traffic.",
    references: WHS,
  }),
  q({
    id: 'tk_q_maint_manual',
    shortLabel: "Manufacturer's maintenance manual available",
    text: "Is the manufacturer's maintenance manual available for this truck? (You cannot answer N/A)",
    surveyGroup: 'Information',
    name: 'Maintenance Manual',
    hazards: ['INCORRECT OPERATION'],
    prelim: 'HIGH',
    prelimValue: 22,
    category: 'MAINTENANCE',
    treatmentText:
      "The manufacturer's maintenance manual is available. Maintenance staff must follow it for inspection, servicing, hoist work and any work under a raised body. A JSEA is required before inspection, repair or transport of this truck.",
    references: WHS,
  }),
  q({
    id: 'tk_q_service_records',
    shortLabel: 'Service and maintenance records available',
    text: 'Are the service and maintenance records available for this truck? (You cannot answer N/A)',
    surveyGroup: 'Information',
    name: 'Service Records',
    hazards: ['OPERATIONAL MALFUNCTION'],
    prelim: 'HIGH',
    prelimValue: 21,
    category: 'MAINTENANCE',
    treatmentText:
      'Service and maintenance records are available and must be kept current, including scheduled servicing, brake tests, hoist inspections and any defect repairs. The truck must not be returned to work with an unresolved safety defect.',
    references: WHS,
  }),
  q({
    id: 'tk_q_preop',
    shortLabel: 'Pre-start checklist used',
    text: 'Is there a pre-start checklist for this truck, completed before each shift? (You cannot answer N/A)',
    surveyGroup: 'Information',
    name: 'Pre-start Checklist',
    hazards: ['INCORRECT OPERATION'],
    prelim: 'HIGH',
    prelimValue: 22,
    category: 'OPERATION',
    treatmentText:
      'A pre-start checklist is in use. The driver completes it before the truck is moved. It covers brakes, lights, tyres, leaks, body or tank security, and — where fitted — the hoist, tailgate, coupling and trailer.',
    references: WHS,
  }),
  q({
    id: 'tk_q_sop',
    shortLabel: 'Safe operating procedure for this truck',
    text: 'Is there a safe operating procedure for how this truck is driven, loaded and unloaded on site? (You cannot answer N/A)',
    surveyGroup: 'Information',
    name: 'Safe Operating Procedure',
    hazards: ['INCORRECT OPERATION'],
    prelim: 'HIGH',
    prelimValue: 22,
    category: 'OPERATION',
    treatmentText:
      'A safe operating procedure is available and must be followed. It covers travel on site, reversing, loading, unloading or tipping, and leaving the truck parked and secured.',
    references: WHS,
  }),
  q({
    id: 'tk_q_licence',
    shortLabel: 'Driver holds the right licence and is competent',
    text: 'Does every driver hold the licence this truck requires (LR, MR, HR, HC or MC as applicable) and are they trained and assessed as competent for this configuration, including tipping or liquid carting where that is the job?',
    surveyGroup: 'Licensing',
    name: 'Driver Licence and Competency',
    hazards: ['INCORRECT OPERATION'],
    prelim: 'CRITICAL',
    prelimValue: 24,
    category: 'OPERATION',
    treatmentText:
      'Only drivers who hold the correct heavy-vehicle licence and have been assessed as competent on this configuration may drive it. Tipping, dog-trailer and liquid-cart work need that competency recorded. An unlicensed or unfamiliar driver must not operate this truck.',
    references: `${WHS}; Heavy Vehicle National Law`,
  }),
  q({
    id: 'tk_q_registration',
    shortLabel: 'Registration and roadworthiness current',
    text: 'If this truck travels on a public road, is the registration current and is the truck within its inspection or roadworthy requirements?',
    surveyGroup: 'Licensing',
    allowNA: true,
    naCondition: 'Answer N/A only if this truck never travels on a public road',
    name: 'Registration and Roadworthiness',
    hazards: ['OPERATIONAL MALFUNCTION'],
    prelim: 'HIGH',
    prelimValue: 22,
    category: 'DESIGN COMPLIANCE',
    treatmentText:
      'Registration is current and the truck meets the inspection standard that applies in its state or territory. Defects that affect brakes, steering, lights, coupling or the body are repaired before the truck returns to the road.',
    references: 'Heavy Vehicle National Law; state and territory roadworthiness requirements',
  }),
  q({
    id: 'tk_q_mass',
    shortLabel: 'GVM, GCM and axle masses known and not exceeded',
    text: 'Are the GVM, and the GCM where a trailer is towed, known for this truck, and is the load kept inside those limits and the axle-mass limits?',
    surveyGroup: 'Licensing',
    name: 'Mass Limits',
    hazards: ['OVERLOAD', 'BRAKE FAILURE'],
    prelim: 'CRITICAL',
    prelimValue: 24,
    category: 'OPERATION',
    treatmentText:
      'GVM and, where a trailer is towed, GCM are known and recorded. Loads are planned so the truck and any trailer stay inside the mass and axle limits. Overloaded running is not permitted. On-board scales, where fitted, are used as a check, not as a reason to exceed the limit.',
    references: 'Heavy Vehicle National Law; Heavy Vehicle (Mass, Dimension and Loading) National Regulation',
  }),
  q({
    id: 'tk_q_service_brake',
    shortLabel: 'Service brakes effective',
    text: 'Are the service brakes, including any trailer brakes that travel with this truck, effective and free of leaks, pulling or warning lights?',
    surveyGroup: 'Brakes',
    name: 'Service Brakes',
    hazards: ['BRAKE FAILURE', 'COLLISION'],
    prelim: 'CRITICAL',
    prelimValue: 24,
    category: 'OPERATION',
    treatmentText:
      'Service brakes are effective on the truck and on any trailer that is towed with it. Air leaks, imbalance, warning lights and worn components are repaired before the truck is used. Brake performance is checked in the pre-start and at scheduled services.',
    references: WHS,
  }),
  q({
    id: 'tk_q_park_brake',
    shortLabel: 'Park brake holds the truck and is tested',
    text: 'Does the park brake hold the truck (and trailer, if coupled) stationary, and is it applied whenever the driver leaves the seat?',
    surveyGroup: 'Brakes',
    name: 'Park Brake and Roll-away',
    hazards: ['ROLL-AWAY', 'CRUSH'],
    prelim: 'CRITICAL',
    prelimValue: 24,
    category: 'OPERATION',
    treatmentText:
      'The park brake holds the combination. The driver applies it before leaving the seat, including while loading, tipping and coupling. Wheel chocks are used on a slope and during maintenance. A truck that will not hold is removed from service.',
    references: `${WHS}; Safe Work Australia guidance on vehicle roll-away and safe immobilisation`,
  }),
  q({
    id: 'tk_q_access',
    shortLabel: 'Steps and handholds intact',
    text: 'Are the steps, platforms and handholds intact, secure and free of oil or mud so the driver can get in and out without climbing on the body, wheels or fuel tank?',
    surveyGroup: 'Access & cabin',
    name: 'Access and Egress',
    hazards: ['FALL FROM TRUCK'],
    prelim: 'HIGH',
    prelimValue: 21,
    category: 'DESIGN COMPLIANCE',
    treatmentText:
      'Steps and handholds are intact and kept clean. Drivers use three points of contact. Climbing on the body, drawbar or wheels is not the way in or out. Damaged steps are repaired before the truck returns to work.',
    references: WHS,
  }),
  q({
    id: 'tk_q_seatbelt',
    shortLabel: 'Seatbelt fitted, worn, and seat in good order',
    text: 'Is the driver seat secure and is a working seatbelt fitted and worn whenever the truck is moving?',
    surveyGroup: 'Access & cabin',
    name: 'Seat and Seatbelt',
    hazards: ['OPERATOR EJECTED', 'CRUSH'],
    prelim: 'CRITICAL',
    prelimValue: 24,
    category: 'OPERATION',
    treatmentText:
      'The seat is secure and the seatbelt is worn whenever the truck is moving, including on site and in an articulated dump truck. A damaged seatbelt or seat is repaired before the truck is driven.',
    references: `${WHS}; ISO 3471 for off-highway ROPS plant`,
  }),
  q({
    id: 'tk_q_controls',
    shortLabel: 'Driving and body controls labelled and working',
    text: 'Are the driving controls and, where fitted, the PTO and hoist controls labelled, within reach, and working as the manufacturer intended?',
    surveyGroup: 'Access & cabin',
    name: 'Controls',
    hazards: ['INCORRECT OPERATION'],
    prelim: 'HIGH',
    prelimValue: 22,
    category: 'OPERATION',
    treatmentText:
      'Driving controls and any PTO or hoist controls are labelled and working. A control that does not return, hold or release as designed is repaired before the truck is used to tip or travel.',
    references: WHS,
  }),
  q({
    id: 'tk_q_horn',
    shortLabel: 'Horn works',
    text: 'Does the horn work?',
    surveyGroup: 'Access & cabin',
    name: 'Horn',
    hazards: ['COLLISION'],
    prelim: 'HIGH',
    prelimValue: 18,
    category: 'OPERATION',
    treatmentText:
      'The horn works and is used to warn people before the truck moves where they may be close. A failed horn is repaired before the truck works near people.',
    references: WHS,
  }),
  q({
    id: 'tk_q_mirrors',
    shortLabel: 'Mirrors and windows give a clear view',
    text: 'Are the mirrors fitted, adjusted and intact, and are the windscreen and windows clean with working wipers and washers?',
    surveyGroup: 'Visibility',
    name: 'Mirrors and Windows',
    hazards: ['COLLISION', 'POOR VISIBILITY'],
    prelim: 'HIGH',
    prelimValue: 22,
    category: 'OPERATION',
    treatmentText:
      'Mirrors are adjusted for this driver and kept intact. The windscreen, wipers and washers give a clear view. Cracked glass that blocks the view, or a missing mirror, is repaired before the truck is driven.',
    references: WHS,
  }),
  q({
    id: 'tk_q_lights',
    shortLabel: 'Lights, indicators and beacon work',
    text: 'Do the headlights, tail lights, brake lights, indicators, reversing lights and, where required on site, the amber beacon all work?',
    surveyGroup: 'Visibility',
    name: 'Lights and Beacon',
    hazards: ['COLLISION', 'POOR VISIBILITY'],
    prelim: 'HIGH',
    prelimValue: 21,
    category: 'OPERATION',
    treatmentText:
      'Road lights and indicators work. On site the amber beacon is used where the site rule or the SWMS requires it, including night works and work near traffic. A failed brake light or indicator is repaired before the truck travels.',
    references: WHS,
  }),
  q({
    id: 'tk_q_reverse_aid',
    shortLabel: 'Reversing alarm or camera works',
    text: 'Is a reversing alarm, reversing camera, or both, fitted and working?',
    surveyGroup: 'Reversing & traffic',
    name: 'Reversing Alarm or Camera',
    hazards: ['COLLISION', 'CRUSH'],
    prelim: 'CRITICAL',
    prelimValue: 24,
    category: 'DESIGN COMPLIANCE',
    treatmentText:
      'A reversing alarm, camera, or both, works and is checked at pre-start. The driver does not rely on the alarm alone where people are on foot. A failed alarm or camera is repaired before the truck reverses near people or plant.',
    references: WHS,
  }),
  q({
    id: 'tk_q_spotter',
    shortLabel: 'Reversing and tipping near people is controlled',
    text: 'Is there a site rule that this truck is reversed or tipped only with a spotter, or inside an exclusion zone that keeps people out of the path and the tip area?',
    surveyGroup: 'Reversing & traffic',
    name: 'Spotter and Exclusion Zone',
    hazards: ['COLLISION', 'CRUSH'],
    prelim: 'CRITICAL',
    prelimValue: 24,
    category: 'OPERATION',
    treatmentText:
      'People are kept out of the reversing path and the tip area. Where the driver cannot see the path, a spotter directs the truck and stands where the driver can see them, clear of the truck and the trailer. The spotter does not stand between the truck and a fixed object.',
    references: `${WHS}; ${TIP}`,
  }),
  q({
    id: 'tk_q_uhf',
    shortLabel: 'Radio or agreed contact with the crew',
    text: 'Can the driver talk to the crew, spotter or supervisor on the site radio or another agreed channel before entering the work area?',
    surveyGroup: 'Reversing & traffic',
    allowNA: true,
    naCondition: 'Answer N/A only if this truck is not working with other plant or people',
    name: 'Site Communication',
    hazards: ['COLLISION'],
    prelim: 'HIGH',
    prelimValue: 18,
    category: 'OPERATION',
    treatmentText:
      'The driver has working radio contact, or another agreed method, before entering a shared work area. Call-up is made before reversing, tipping or crossing a haul road used by other plant.',
    references: WHS,
  }),
  q({
    id: 'tk_q_load_restraint',
    shortLabel: 'Load restraint is rated and used',
    text: 'Is the load restrained for the road and for site travel, using rated gates, tarps, chains or other equipment suited to the load, so it cannot shift or fall?',
    surveyGroup: 'Load',
    allowNA: true,
    naCondition: 'Answer N/A for an empty run or a water cart with no separate load to restrain',
    name: 'Load Restraint',
    hazards: ['LOAD SHIFT', 'FALLING MATERIAL'],
    prelim: 'CRITICAL',
    prelimValue: 24,
    category: 'OPERATION',
    treatmentText:
      'Loads are restrained so they cannot shift or fall in braking, cornering or on site. Gates, tarps and lashings are rated, undamaged and used as the load requires. Loose material is not carried on a public road with an open, unsecured body.',
    references: HVNL,
  }),
  q({
    id: 'tk_q_tailgate',
    shortLabel: 'Tailgate, locks and sides secure',
    text: 'Are the tailgate, side locks and body sides secure, and do they stay closed until the driver is ready to discharge?',
    surveyGroup: 'Load',
    allowNA: true,
    naCondition: 'Answer N/A if this truck has no tipping body or tailgate',
    name: 'Tailgate and Body Locks',
    hazards: ['FALLING MATERIAL', 'CRUSH'],
    prelim: 'HIGH',
    prelimValue: 22,
    category: 'OPERATION',
    treatmentText:
      'Tailgate and side locks are checked closed before travel and opened only when the truck is positioned to discharge. People stand clear of the tailgate. A lock or hinge that will not hold is repaired before the truck is loaded.',
    references: `${WHS}; ${TIP}`,
  }),
  q({
    id: 'tk_q_liquid',
    shortLabel: 'Liquid surge controlled on a water cart',
    text: 'If this is a water cart or other tank, are baffles in place and is the tank filled and driven so liquid surge does not make the truck unstable?',
    surveyGroup: 'Load',
    allowNA: true,
    naCondition: 'Answer N/A if this truck does not carry liquid',
    name: 'Liquid Surge',
    hazards: ['ROLLOVER', 'LOAD SHIFT'],
    prelim: 'HIGH',
    prelimValue: 22,
    category: 'OPERATION',
    treatmentText:
      'The tank has baffles and is operated within the manufacturer fill limits. Part-full running on a slope or a tight turn is avoided. Leaking valves and hatches are repaired before the cart is used.',
    references: WHS,
  }),
  q({
    id: 'tk_q_hoist',
    shortLabel: 'Hoist, pins and body free of cracks and leaks',
    text: 'Are the hoist, hinge pins, body mounts and hydraulic rams free of cracks, bent pins and oil leaks?',
    surveyGroup: 'Hoist & tipping',
    allowNA: true,
    naCondition: 'Answer N/A if this truck has no tipping body',
    name: 'Hoist and Body',
    hazards: ['HOIST FAILURE', 'CRUSH'],
    prelim: 'CRITICAL',
    prelimValue: 24,
    category: 'MAINTENANCE',
    treatmentText:
      'The hoist, pins, hinges and body mounts are free of cracks, damage and leaks. A leaking ram, bent pin or cracked body is repaired before the body is raised. The hoist is only used as the manufacturer describes.',
    references: TIP,
  }),
  q({
    id: 'tk_q_body_prop',
    shortLabel: 'Body prop used before anyone goes under a raised body',
    text: 'Is a manufacturer body prop or safety bar fitted, and is it in place before anyone works under or on a raised body?',
    surveyGroup: 'Hoist & tipping',
    allowNA: true,
    naCondition: 'Answer N/A if this truck has no tipping body',
    name: 'Body Prop',
    hazards: ['CRUSH', 'HOIST FAILURE'],
    prelim: 'CRITICAL',
    prelimValue: 24,
    category: 'MAINTENANCE',
    treatmentText:
      'Nobody works under a raised body unless the manufacturer body prop or an equivalent rated support is in place and the truck is isolated. Hydraulics alone are not a support. The prop is inspected with the hoist.',
    references: TIP,
  }),
  q({
    id: 'tk_q_tip_ground',
    shortLabel: 'Tipping only on firm ground, in line with the slope',
    text: 'Is tipping limited to firm, stable ground, with the body raised in line with the slope and not across it, and inside the manufacturer slope limit?',
    surveyGroup: 'Hoist & tipping',
    allowNA: true,
    naCondition: 'Answer N/A if this truck has no tipping body',
    name: 'Tipping Ground and Slope',
    hazards: ['ROLLOVER'],
    prelim: 'CRITICAL',
    prelimValue: 24,
    category: 'OPERATION',
    treatmentText:
      'The tip area is firm and as level as the site allows. The body is raised in line with the fall of the ground, not across it, and inside the slope the manufacturer allows. Soft, rutted or filled ground is not used. People and plant stay outside the tip exclusion zone. Wind on a raised empty body is treated as a rollover risk.',
    references: TIP,
  }),
  q({
    id: 'tk_q_powerlines',
    shortLabel: 'Raised-body height kept clear of overhead lines',
    text: 'Is the raised height of the body known, and are tip and dump areas kept clear of overhead powerlines by at least the approach distance that applies?',
    surveyGroup: 'Hoist & tipping',
    allowNA: true,
    naCondition: 'Answer N/A if this truck has no body or tray that is raised',
    name: 'Overhead Powerlines',
    hazards: ['ELECTROCUTION', 'OVERHEAD STRIKE'],
    prelim: 'CRITICAL',
    prelimValue: 24,
    category: 'OPERATION',
    treatmentText:
      'The raised height of the body is known and is used when the tip area is planned. Tipping is not done where the raised body can reach an overhead line or enter the approach distance. A spotter is used where lines are nearby. If a body does contact a line, the driver stays in the cab until the supply authority says it is safe to leave, unless the truck is on fire.',
    references: LINES,
  }),
  q({
    id: 'tk_q_stuck_load',
    shortLabel: 'Stuck or bridged loads are freed from outside the body',
    text: 'Is there a procedure for a stuck or bridged load that keeps people out of the body while it is raised?',
    surveyGroup: 'Hoist & tipping',
    allowNA: true,
    naCondition: 'Answer N/A if this truck has no tipping body',
    name: 'Stuck Load',
    hazards: ['CRUSH', 'FALLING MATERIAL'],
    prelim: 'CRITICAL',
    prelimValue: 24,
    category: 'OPERATION',
    treatmentText:
      'A stuck or bridged load is freed from outside the body. Nobody climbs into a raised body. The body is lowered and supported before anyone enters it. The driver does not jolt the truck to shake a hung load free while people are nearby.',
    references: TIP,
  }),
  q({
    id: 'tk_q_coupling',
    shortLabel: 'Coupling, chains and air lines checked',
    text: 'If a dog, pig or semi-trailer is towed, are the turntable or pin coupling, safety chains or kingpin lock, air lines, electrics and trailer lights checked before travel?',
    surveyGroup: 'Coupling',
    allowNA: true,
    naCondition: 'Answer N/A if this truck does not tow a trailer',
    name: 'Coupling',
    hazards: ['TRAILER SEPARATION', 'CRUSH'],
    prelim: 'CRITICAL',
    prelimValue: 24,
    category: 'OPERATION',
    treatmentText:
      'The coupling, lock, safety chains, air lines and trailer lights are checked before the combination moves. Coupling and uncoupling is done on firm ground with the park brake applied. Nobody stands between the truck and the trailer while either can move.',
    references: `${WHS}; Heavy Vehicle National Law`,
  }),
  q({
    id: 'tk_q_trailer_brake',
    shortLabel: 'Trailer brakes and breakaway work',
    text: 'Do the trailer service brakes and the breakaway protection work, and are they tested as part of the pre-start when a trailer is coupled?',
    surveyGroup: 'Coupling',
    allowNA: true,
    naCondition: 'Answer N/A if this truck does not tow a trailer',
    name: 'Trailer Brakes',
    hazards: ['RUNAWAY TRAILER', 'BRAKE FAILURE'],
    prelim: 'CRITICAL',
    prelimValue: 24,
    category: 'OPERATION',
    treatmentText:
      'Trailer service brakes and breakaway protection are tested before the combination is taken on the road or onto a grade. A trailer that does not brake is not towed.',
    references: 'Heavy Vehicle National Law',
  }),
  q({
    id: 'tk_q_artic_lock',
    shortLabel: 'Articulation lock used during maintenance',
    text: 'If this is an articulated dump truck, is the articulation lock fitted and used before anyone works near the articulation joint?',
    surveyGroup: 'Coupling',
    allowNA: true,
    naCondition: 'Answer N/A if this is not an articulated dump truck',
    name: 'Articulation Lock',
    hazards: ['CRUSH'],
    prelim: 'CRITICAL',
    prelimValue: 24,
    category: 'MAINTENANCE',
    treatmentText:
      'The articulation lock is fitted and pinned in place before inspection or repair near the joint. The lock is removed only when the truck is ready to be driven and people are clear.',
    references: WHS,
  }),
  q({
    id: 'tk_q_hydraulics',
    shortLabel: 'Hydraulic hoses and rams free of damage',
    text: 'Are hydraulic hoses, fittings and rams free of leaks, rubs, cracks and bulges?',
    surveyGroup: 'Hydraulics & power',
    allowNA: true,
    naCondition: 'Answer N/A if this truck has no hydraulic hoist or steering ram to inspect',
    name: 'Hydraulics',
    hazards: ['HOIST FAILURE', 'FLUID INJECTION'],
    prelim: 'HIGH',
    prelimValue: 22,
    category: 'MAINTENANCE',
    treatmentText:
      'Hoses and rams are free of leaks and damage. A leaking or bulging hose is replaced before the hoist or steering is used. Hands are kept clear of leaks under pressure.',
    references: `${WHS}; ${TIP}`,
  }),
  q({
    id: 'tk_q_isolation',
    shortLabel: 'Engine stop and battery isolation work',
    text: 'Can the engine be shut down from the driving position, and is the battery secure with a working isolation switch where one is fitted?',
    surveyGroup: 'Hydraulics & power',
    name: 'Shutdown and Isolation',
    hazards: ['UNCONTROLLED MOVEMENT', 'FIRE'],
    prelim: 'HIGH',
    prelimValue: 21,
    category: 'MAINTENANCE',
    treatmentText:
      'The engine can be shut down from the driving position. Where an isolation switch is fitted it is used during maintenance and when the truck is left. The battery is secure and the terminals are covered.',
    references: WHS,
  }),
  q({
    id: 'tk_q_fuel',
    shortLabel: 'Fuel system secure and extinguisher in date',
    text: 'Is the fuel system free of leaks, and is a charged fire extinguisher fitted and in date?',
    surveyGroup: 'Hydraulics & power',
    name: 'Fuel and Fire Extinguisher',
    hazards: ['FIRE'],
    prelim: 'HIGH',
    prelimValue: 21,
    category: 'DESIGN COMPLIANCE',
    treatmentText:
      'The fuel tank, lines and caps are secure and not leaking. A charged extinguisher in date is on the truck and the driver knows where it is. Refuelling is done with the engine off.',
    references: WHS,
  }),
  q({
    id: 'tk_q_chassis',
    shortLabel: 'Chassis, mounts and tyres serviceable',
    text: 'Are the chassis, body or tank mounts, wheel nuts and tyres free of major cracks, damage and illegal wear?',
    surveyGroup: 'Condition',
    name: 'Chassis, Mounts and Tyres',
    hazards: ['STRUCTURAL FAILURE', 'LOSS OF CONTROL'],
    prelim: 'HIGH',
    prelimValue: 22,
    category: 'MAINTENANCE',
    treatmentText:
      'The chassis, mounts and wheel assemblies are serviceable. Cracked mounts, loose wheel nuts and tyres below the wear or damage limit are repaired before the truck is loaded or driven.',
    references: WHS,
  }),
  q({
    id: 'tk_q_rops',
    shortLabel: 'Off-highway ROPS and FOPS in place',
    text: 'If this is an off-highway articulated dump truck, is the ROPS and FOPS structure in place, unmodified, and is the seatbelt worn with it?',
    surveyGroup: 'Condition',
    allowNA: true,
    naCondition: 'Answer N/A for an on-road cab truck',
    name: 'ROPS and FOPS',
    hazards: ['ROLLOVER', 'FALLING OBJECT'],
    prelim: 'CRITICAL',
    prelimValue: 24,
    category: 'DESIGN COMPLIANCE',
    treatmentText:
      'The ROPS and FOPS structure is the manufacturer structure, not modified by unapproved welding or drilling, and the seatbelt is worn. A damaged structure is assessed by a competent person before the truck returns to work.',
    references: 'ISO 3471 ROPS; ISO 3449 FOPS; model WHS Regulations for plant',
  }),
];
