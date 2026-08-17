export const STATUSES = {
  CampaignStatus: {
    DRAFT: { label: 'Draft', labelUr: 'مسودہ' },
    PUBLISHED: { label: 'Published', labelUr: 'شائع شدہ' },
    CLOSED: { label: 'Closed', labelUr: 'بند' },
    ARCHIVED: { label: 'Archived', labelUr: 'آرکائیو' },
  },
  SlotStatus: {
    PENDING: { label: 'Pending', labelUr: 'زیر التواء' },
    ACCEPTED: { label: 'Accepted', labelUr: 'مقبول' },
    REJECTED: { label: 'Rejected', labelUr: 'مسترد' },
    COMPLETED: { label: 'Completed', labelUr: 'مکمل' },
  },
  PlanStatus: {
    DRAFT: { label: 'Draft', labelUr: 'مسودہ' },
    SUBMITTED: { label: 'Submitted', labelUr: 'جمع کرایا' },
    APPROVED: { label: 'Approved', labelUr: 'منظور شدہ' },
    REVISION_REQUESTED: { label: 'Revision Requested', labelUr: 'ترمیم درکار ہے' },
  },
  DraftStatus: {
    UPLOADED: { label: 'Uploaded', labelUr: 'اپ لوڈ کیا گیا' },
    APPROVED: { label: 'Approved', labelUr: 'منظور شدہ' },
    REVISION_REQUESTED: { label: 'Revision Requested', labelUr: 'ترمیم درکار ہے' },
  },
  VerificationStatus: {
    PENDING: { label: 'Pending', labelUr: 'زیر التواء' },
    VERIFIED: { label: 'Verified', labelUr: 'تصدیق شدہ' },
    REJECTED: { label: 'Rejected', labelUr: 'مسترد' },
  },
  KycStatus: {
    PENDING: { label: 'Pending', labelUr: 'زیر التواء' },
    APPROVED: { label: 'Approved', labelUr: 'منظور شدہ' },
    REJECTED: { label: 'Rejected', labelUr: 'مسترد' },
  },
  WithdrawalStatus: {
    PENDING: { label: 'Pending', labelUr: 'زیر التواء' },
    PROCESSING: { label: 'Processing', labelUr: 'کارروائی جاری' },
    COMPLETED: { label: 'Completed', labelUr: 'مکمل' },
    REJECTED: { label: 'Rejected', labelUr: 'مسترد' },
  },
  TransactionStatus: {
    PENDING: { label: 'Pending', labelUr: 'زیر التواء' },
    COMPLETED: { label: 'Completed', labelUr: 'مکمل' },
    FAILED: { label: 'Failed', labelUr: 'ناکام' },
  },
} as const;
