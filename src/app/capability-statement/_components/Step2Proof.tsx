'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  step2Schema,
  type Step2Data,
  projectSizeOptions,
  plantEquipmentOptions,
  complianceOptions,
  audienceOptions,
} from '@/lib/capability-statement/schema';
import FormField from './FormField';

interface Step2ProofProps {
  defaultValues?: Partial<Step2Data>;
  onSubmit: (data: Step2Data) => void;
}

const defaultProject = { name: '', client: '', location: '', duration: '', scope: '', challenges: '', value: '', outcome: '' };
const defaultPersonnel = { name: '', role: '', yearsExperience: '' };

function toArray(val: unknown): string[] {
  if (Array.isArray(val)) return val;
  if (typeof val === 'string' && val.trim()) return [val.trim()];
  return [];
}

export default function Step2Proof({ defaultValues, onSubmit }: Step2ProofProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      projects: [defaultProject, defaultProject],
      averageProjectSize: undefined,
      keyPersonnel: [defaultPersonnel],
      plantEquipment: [],
      plantEquipmentOther: [],
      compliance: [],
      complianceOther: [],
      audience: undefined,
      ...defaultValues,
      plantEquipmentOther: toArray(defaultValues?.plantEquipmentOther),
      complianceOther: toArray(defaultValues?.complianceOther),
    },
  });

  const projectsFieldArray = useFieldArray({ control, name: 'projects' });
  const personnelFieldArray = useFieldArray({ control, name: 'keyPersonnel' });
  const plantOtherFieldArray = useFieldArray({ control, name: 'plantEquipmentOther' });
  const complianceOtherFieldArray = useFieldArray({ control, name: 'complianceOther' });

  const plantEquipment = watch('plantEquipment') || [];
  const hasPlantOther = plantEquipment.includes('other');
  const compliance = watch('compliance') || [];
  const hasComplianceOther = compliance.includes('other');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Portfolio & experience</h2>
      <p className="text-sm text-gray-600">Showcase your projects, team, and capabilities.</p>

      {/* Featured projects */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Featured projects (2–4)</label>
          {projectsFieldArray.fields.length < 4 && (
            <button
              type="button"
              onClick={() => projectsFieldArray.append(defaultProject)}
              className="text-sm font-medium text-[#FF8C32] hover:text-[#E67E22]"
            >
              + Add project
            </button>
          )}
        </div>
        {projectsFieldArray.fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border border-gray-200 bg-gray-50/50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Project {index + 1}</span>
              {projectsFieldArray.fields.length > 2 && (
                <button
                  type="button"
                  onClick={() => projectsFieldArray.remove(index)}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <FormField
                label="Project name"
                {...register(`projects.${index}.name`)}
                placeholder="e.g. Main Road Upgrade"
                error={errors.projects?.[index]?.name?.message}
              />
              <FormField
                label="Client (optional)"
                {...register(`projects.${index}.client`)}
                placeholder="e.g. VicRoads"
              />
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <FormField
                label="Location (optional)"
                {...register(`projects.${index}.location`)}
                placeholder="e.g. Sydney, NSW"
              />
              <FormField
                label="Duration (optional)"
                {...register(`projects.${index}.duration`)}
                placeholder="e.g. 6 months"
              />
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700">
                Project scope <span className="font-normal text-gray-500">(describe what was done, methodology, scale)</span>
              </label>
              <textarea
                {...register(`projects.${index}.scope`)}
                suppressHydrationWarning
                rows={3}
                placeholder="e.g. Bulk earthworks including site clearing, cut and fill operations, drainage installation and subgrade preparation across a 12ha site..."
                className={`mt-1.5 block w-full rounded-lg border px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-[#FF8C32] focus:outline-none focus:ring-1 focus:ring-[#FF8C32] sm:text-sm ${errors.projects?.[index]?.scope ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.projects?.[index]?.scope && (
                <p className="mt-1 text-sm text-red-600">{errors.projects?.[index]?.scope?.message}</p>
              )}
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700">
                Key challenges (optional) <span className="font-normal text-gray-500">(obstacles faced and how you overcame them)</span>
              </label>
              <textarea
                {...register(`projects.${index}.challenges`)}
                suppressHydrationWarning
                rows={2}
                placeholder="e.g. Tight site access, live traffic management, high water table..."
                className="mt-1.5 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-[#FF8C32] focus:outline-none focus:ring-1 focus:ring-[#FF8C32] sm:text-sm"
              />
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <FormField
                label="Contract value (optional)"
                {...register(`projects.${index}.value`)}
                placeholder="e.g. $2.4M"
              />
              <FormField
                label="Outcome (optional)"
                {...register(`projects.${index}.outcome`)}
                placeholder="e.g. Delivered 2 weeks ahead of program"
              />
            </div>
          </div>
        ))}
        {errors.projects?.message && <p className="text-sm text-red-600">{errors.projects.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">Average project size</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {projectSizeOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 has-[:checked]:border-[#FF8C32] has-[:checked]:ring-1 has-[:checked]:ring-[#FF8C32]"
            >
              <input type="radio" value={opt.value} {...register('averageProjectSize')} className="sr-only" />
              <span className="text-sm text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
        {errors.averageProjectSize && <p className="text-sm text-red-600">{errors.averageProjectSize.message}</p>}
      </div>

      {/* Key personnel */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Key personnel (1–3)</label>
          {personnelFieldArray.fields.length < 3 && (
            <button
              type="button"
              onClick={() => personnelFieldArray.append(defaultPersonnel)}
              className="text-sm font-medium text-[#FF8C32] hover:text-[#E67E22]"
            >
              + Add person
            </button>
          )}
        </div>
        {personnelFieldArray.fields.map((field, index) => (
          <div key={field.id} className="rounded-lg border border-gray-200 bg-gray-50/50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Person {index + 1}</span>
              {personnelFieldArray.fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => personnelFieldArray.remove(index)}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <FormField
                label="Name"
                {...register(`keyPersonnel.${index}.name`)}
                placeholder="John Smith"
                error={errors.keyPersonnel?.[index]?.name?.message}
              />
              <FormField
                label="Role"
                {...register(`keyPersonnel.${index}.role`)}
                placeholder="e.g. Director"
                error={errors.keyPersonnel?.[index]?.role?.message}
              />
              <FormField
                label="Years experience"
                {...register(`keyPersonnel.${index}.yearsExperience`)}
                placeholder="e.g. 15"
                error={errors.keyPersonnel?.[index]?.yearsExperience?.message}
              />
            </div>
          </div>
        ))}
        {errors.keyPersonnel?.message && <p className="text-sm text-red-600">{errors.keyPersonnel.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">Plant & equipment</label>
        <p className="text-xs text-gray-500">Select all that apply</p>
        <div className="flex flex-wrap gap-2">
          {plantEquipmentOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 has-[:checked]:border-[#FF8C32] has-[:checked]:bg-orange-50 has-[:checked]:ring-1 has-[:checked]:ring-[#FF8C32]"
            >
              <input type="checkbox" value={opt.value} {...register('plantEquipment')} className="rounded border-gray-300" />
              <span className="text-sm text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
        {hasPlantOther && (
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Other plant/equipment</label>
              <button
                type="button"
                onClick={() => plantOtherFieldArray.append('')}
                className="text-sm font-medium text-[#FF8C32] hover:text-[#E67E22]"
              >
                + Add
              </button>
            </div>
            {plantOtherFieldArray.fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`plantEquipmentOther.${index}`)}
                  suppressHydrationWarning
                  placeholder="e.g. Stabiliser"
                  className="block flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-[#FF8C32] focus:outline-none focus:ring-1 focus:ring-[#FF8C32] sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => plantOtherFieldArray.remove(index)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        {errors.plantEquipment && <p className="text-sm text-red-600">{errors.plantEquipment.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">Compliance & certifications</label>
        <p className="text-xs text-gray-500">Select all that apply</p>
        <div className="flex flex-wrap gap-2">
          {complianceOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 has-[:checked]:border-[#FF8C32] has-[:checked]:bg-orange-50 has-[:checked]:ring-1 has-[:checked]:ring-[#FF8C32]"
            >
              <input type="checkbox" value={opt.value} {...register('compliance')} className="rounded border-gray-300" />
              <span className="text-sm text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
        {hasComplianceOther && (
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Other / prequals</label>
              <button
                type="button"
                onClick={() => complianceOtherFieldArray.append('')}
                className="text-sm font-medium text-[#FF8C32] hover:text-[#E67E22]"
              >
                + Add
              </button>
            </div>
            {complianceOtherFieldArray.fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`complianceOther.${index}`)}
                  suppressHydrationWarning
                  placeholder="e.g. ICN, CCF"
                  className="block flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-[#FF8C32] focus:outline-none focus:ring-1 focus:ring-[#FF8C32] sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => complianceOtherFieldArray.remove(index)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        {errors.compliance && <p className="text-sm text-red-600">{errors.compliance.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">Primary audience for this document</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {audienceOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 has-[:checked]:border-[#FF8C32] has-[:checked]:ring-1 has-[:checked]:ring-[#FF8C32]"
            >
              <input type="radio" value={opt.value} {...register('audience')} className="sr-only" />
              <span className="text-sm text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
        {errors.audience && <p className="text-sm text-red-600">{errors.audience.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] px-6 py-3 font-semibold text-white shadow-md transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FF8C32] focus:ring-offset-2"
      >
        Continue to Upload & Generate
      </button>
    </form>
  );
}
