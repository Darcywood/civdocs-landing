/** Australian mobiles and landlines: 04, 02, 03, 07, 08, with or without a +61 prefix. */
export function isAustralianPhone(raw: string | undefined | null): boolean {
  if (!raw) return false;
  const digits = raw.replace(/\D/g, '');
  const local = digits.startsWith('61') && digits.length === 11 ? `0${digits.slice(2)}` : digits;
  return /^0[23478]\d{8}$/.test(local);
}
