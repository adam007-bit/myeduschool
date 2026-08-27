// Tenant-safe client-side helpers. Server-side authentication and database rules
// must enforce the same schoolId boundaries; never trust a client-provided schoolId.

export function createSchoolDraft(form) {
  const normalizedCode = form.code.trim().toUpperCase().replace(/[^A-Z0-9-]/g, '');
  return {
    schoolId: `school_${crypto.randomUUID()}`,
    name: form.name.trim(),
    code: normalizedCode,
    motto: form.motto.trim(),
    type: form.type,
    address: form.address.trim(),
    state: form.state,
    district: form.district.trim(),
    phone: form.phone.trim(),
    email: form.email.trim().toLowerCase(),
    logoUrl: '',
    subscription: {
      planId: form.planId,
      status: 'TRIAL',
      trialDays: 14,
    },
  };
}

export function validateSchoolRegistration(form) {
  const errors = {};
  if (!form.name?.trim()) errors.name = 'School name is required.';
  if (!form.code?.trim()) errors.code = 'School code is required.';
  if (!form.motto?.trim()) errors.motto = 'School motto is required.';
  if (!form.state) errors.state = 'State is required.';
  if (!form.adminName?.trim()) errors.adminName = 'Administrator name is required.';
  if (!form.adminEmail?.trim()) errors.adminEmail = 'Administrator email is required.';
  if (!form.password || form.password.length < 8) errors.password = 'Password must contain at least 8 characters.';
  return errors;
}
