'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema, type Step1Data, yearsOperatingOptions, businessTypeOptions, coreServicesOptions, typicalClientsOptions } from '@/lib/capability-statement/schema';
import FormField from './FormField';

interface Step1BasicsProps {
  defaultValues?: Partial<Step1Data>;
  onSubmit: (data: Step1Data) => void;
}

export default function Step1Basics({ defaultValues, onSubmit }: Step1BasicsProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      businessName: '',
      locationRegions: '',
      yearsOperating: undefined,
      businessType: undefined,
      coreServices: [],
      typicalClients: [],
      phone: '',
      abn: '',
      website: '',
      contactEmail: '',
      missionStatement: '',
      ...defaultValues,
    },
  });

  const coreServices = watch('coreServices') || [];
  const hasCoreServicesOther = coreServices.includes('other');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Business basics</h2>
      <p className="text-sm text-gray-600">Tell us about your company.</p>

      <FormField
        label="Business name"
        {...register('businessName')}
        placeholder="e.g. Smith Civil Pty Ltd"
        error={errors.businessName?.message}
      />

      <FormField
        label="Location / regions you operate in"
        {...register('locationRegions')}
        placeholder="e.g. Victoria, NSW, Queensland"
        error={errors.locationRegions?.message}
      />

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">Years in operation</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {yearsOperatingOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 has-[:checked]:border-[#FF8C32] has-[:checked]:ring-1 has-[:checked]:ring-[#FF8C32]"
            >
              <input type="radio" value={opt.value} {...register('yearsOperating')} className="sr-only" />
              <span className="text-sm text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
        {errors.yearsOperating && <p className="text-sm text-red-600">{errors.yearsOperating.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">Business type</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {businessTypeOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 has-[:checked]:border-[#FF8C32] has-[:checked]:ring-1 has-[:checked]:ring-[#FF8C32]"
            >
              <input type="radio" value={opt.value} {...register('businessType')} className="sr-only" />
              <span className="text-sm text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
        {errors.businessType && <p className="text-sm text-red-600">{errors.businessType.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">Core services</label>
        <p className="text-xs text-gray-500">Select all that apply</p>
        <div className="flex flex-wrap gap-2">
          {coreServicesOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 has-[:checked]:border-[#FF8C32] has-[:checked]:bg-orange-50 has-[:checked]:ring-1 has-[:checked]:ring-[#FF8C32]"
            >
              <input type="checkbox" value={opt.value} {...register('coreServices')} className="rounded border-gray-300" />
              <span className="text-sm text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
        {hasCoreServicesOther && (
          <FormField
            label="Other services (please specify)"
            {...register('coreServicesOther')}
            placeholder="e.g. Landscaping, Asphalt"
            className="mt-2"
          />
        )}
        {errors.coreServices && <p className="text-sm text-red-600">{errors.coreServices.message}</p>}
      </div>

      <FormField
        label="Mission statement (optional)"
        {...register('missionStatement')}
        placeholder="e.g. Delivering safe, quality civil works across regional Victoria"
        error={errors.missionStatement?.message}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Phone (optional)"
          {...register('phone')}
          placeholder="e.g. 0412 345 678"
          error={errors.phone?.message}
        />
        <FormField
          label="ABN (optional)"
          {...register('abn')}
          placeholder="e.g. 12 345 678 901"
          error={errors.abn?.message}
        />
        <FormField
          label="Website (optional)"
          {...register('website')}
          placeholder="e.g. www.smithcivil.com.au"
          error={errors.website?.message}
        />
        <FormField
          label="Contact email (optional)"
          type="email"
          {...register('contactEmail')}
          placeholder="e.g. info@smithcivil.com.au"
          error={errors.contactEmail?.message}
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700">Typical clients</label>
        <p className="text-xs text-gray-500">Select all that apply</p>
        <div className="flex flex-wrap gap-2">
          {typicalClientsOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 has-[:checked]:border-[#FF8C32] has-[:checked]:bg-orange-50 has-[:checked]:ring-1 has-[:checked]:ring-[#FF8C32]"
            >
              <input type="checkbox" value={opt.value} {...register('typicalClients')} className="rounded border-gray-300" />
              <span className="text-sm text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
        {errors.typicalClients && <p className="text-sm text-red-600">{errors.typicalClients.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] px-6 py-3 font-semibold text-white shadow-md transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FF8C32] focus:ring-offset-2"
      >
        Continue to Portfolio
      </button>
    </form>
  );
}
