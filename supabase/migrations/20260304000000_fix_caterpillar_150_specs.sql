-- Fix Caterpillar 150/150M specs — replace with official Cat 150 data
-- Source: Cat 150/150 AWD Motor Graders Specifications (official PDF), operator manual
-- Previous data may have been from 12M (wrong size class)

-- Update 150M if it exists (user lookups often use "150M")
update grader_specs
set
  name = 'Caterpillar 150',
  search_keys = array['150', '150m', 'caterpillar 150', 'cat 150', 'caterpillar 150m', 'cat 150m'],
  specs = jsonb_build_object(
    'noise_mfr_dba', '71 dB(A) Operator, 107 dB(A) Outside',
    'blade_height_mm', '610',
    'blade_length_mm', '4267',
    'blade_lift_mm', '480',
    'blade_thickness_mm', '22',
    'blade_tilt', '40 deg / 5 deg',
    'body_type', 'Articulated',
    'articulation_deg', '20 deg',
    'fuel_capacity_l', '394',
    'hydraulic_oil_capacity_l', '64',
    'front_axle_oscillation', '32 deg',
    'height_cab_mm', '3251',
    'length_mm', '10109',
    'operating_weight_kg', '19935',
    'shoulder_reach', '1790 / 1978',
    'turn_circle_mm', '7800',
    'drive', '6x4',
    'engine_make_model', 'Cat C9.3',
    'engine_displacement', '9.3 L',
    'engine_cylinders', '6',
    'engine_power', '200 hp (149 kW) base, 252 hp (188 kW) VHP Plus',
    'engine_torque', '1247 Nm (920 lb-ft)',
    'hydraulic_flow', '210 L/min',
    'hydraulic_pressure', '241',
    'plant_class', 'MOTOR GRADER',
    'rops_compliance', 'ISO 3471',
    'fops_compliance', 'ISO 3449',
    'max_speed', '46.6 km/h',
    'speeds_fr', '8 forwards / 6 reverse',
    'transmission', 'APECS Direct Drive Powershift',
    'tyre_size', '14.0R24'
  ),
  source = 'Caterpillar 150/150 AWD Motor Graders Specifications (official)'
where make = 'Caterpillar' and model = '150M';

-- Update 150 if it exists
update grader_specs
set
  name = 'Caterpillar 150',
  search_keys = array['150', '150m', 'caterpillar 150', 'cat 150', 'caterpillar 150m', 'cat 150m'],
  specs = jsonb_build_object(
    'noise_mfr_dba', '71 dB(A) Operator, 107 dB(A) Outside',
    'blade_height_mm', '610',
    'blade_length_mm', '3700',
    'blade_lift_mm', '480',
    'blade_thickness_mm', '22',
    'blade_tilt', '40 deg / 5 deg',
    'body_type', 'Articulated',
    'articulation_deg', '20 deg',
    'fuel_capacity_l', '394',
    'hydraulic_oil_capacity_l', '64',
    'front_axle_oscillation', '32 deg',
    'height_cab_mm', '3251',
    'length_mm', '10109',
    'operating_weight_kg', '19935',
    'shoulder_reach', '1790 / 1978',
    'turn_circle_mm', '7800',
    'drive', '6x4',
    'engine_make_model', 'Cat C9.3',
    'engine_displacement', '9.3 L',
    'engine_cylinders', '6',
    'engine_power', '200 hp (149 kW) base, 252 hp (188 kW) VHP Plus',
    'engine_torque', '1247 Nm (920 lb-ft)',
    'hydraulic_flow', '210 L/min',
    'hydraulic_pressure', '241',
    'plant_class', 'MOTOR GRADER',
    'rops_compliance', 'ISO 3471',
    'fops_compliance', 'ISO 3449',
    'max_speed', '46.6 km/h',
    'speeds_fr', '8 forwards / 6 reverse',
    'transmission', 'APECS Direct Drive Powershift',
    'tyre_size', '14.0R24'
  ),
  source = 'Caterpillar 150/150 AWD Motor Graders Specifications (official)'
where make = 'Caterpillar' and model = '150';

-- Insert 150 if neither exists (e.g. user looked up "150M" and it created wrong record, or 150 never seeded)
insert into grader_specs (make, model, name, search_keys, specs, source)
values (
  'Caterpillar',
  '150',
  'Caterpillar 150',
  array['150', '150m', 'caterpillar 150', 'cat 150', 'caterpillar 150m', 'cat 150m'],
  jsonb_build_object(
    'noise_mfr_dba', '71 dB(A) Operator, 107 dB(A) Outside',
    'blade_height_mm', '610',
    'blade_length_mm', '3700',
    'blade_lift_mm', '480',
    'blade_thickness_mm', '22',
    'blade_tilt', '40 deg / 5 deg',
    'body_type', 'Articulated',
    'articulation_deg', '20 deg',
    'fuel_capacity_l', '394',
    'hydraulic_oil_capacity_l', '64',
    'front_axle_oscillation', '32 deg',
    'height_cab_mm', '3251',
    'length_mm', '10109',
    'operating_weight_kg', '19935',
    'shoulder_reach', '1790 / 1978',
    'turn_circle_mm', '7800',
    'drive', '6x4',
    'engine_make_model', 'Cat C9.3',
    'engine_displacement', '9.3 L',
    'engine_cylinders', '6',
    'engine_power', '200 hp (149 kW) base, 252 hp (188 kW) VHP Plus',
    'engine_torque', '1247 Nm (920 lb-ft)',
    'hydraulic_flow', '210 L/min',
    'hydraulic_pressure', '241',
    'plant_class', 'MOTOR GRADER',
    'rops_compliance', 'ISO 3471',
    'fops_compliance', 'ISO 3449',
    'max_speed', '46.6 km/h',
    'speeds_fr', '8 forwards / 6 reverse',
    'transmission', 'APECS Direct Drive Powershift',
    'tyre_size', '14.0R24'
  ),
  'Caterpillar 150/150 AWD Motor Graders Specifications (official)'
)
on conflict (make, model) do update set
  name = excluded.name,
  search_keys = excluded.search_keys,
  specs = excluded.specs,
  source = excluded.source;
