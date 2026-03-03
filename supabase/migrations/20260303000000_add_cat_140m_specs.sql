-- Add missing Caterpillar 140M specs (from Ritchie Bros / manufacturer data)
-- blade height, length, thickness, front axle oscillation, shoulder reach, drive, hydraulic pressure

update grader_specs
set specs = specs || jsonb_build_object(
  'blade_height_mm', '610',
  'blade_length_mm', '3658',
  'blade_thickness_mm', '23',
  'front_axle_oscillation', '32 deg',
  'shoulder_reach', '1791 / 1979',
  'drive', '6x4',
  'hydraulic_pressure', '241'
)
where make = 'Caterpillar' and model = '140M';
