import path from 'node:path';

// ========================================= IMAGES FOLDERS

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), "temp");
export const UPLOAD_DIR = path.join(process.cwd(), "uploads");

// ========================================= TEMPLATES PATHS

// export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
export const TEMPLATES_DIR = path.resolve('src', 'templates');

// ======================================== SMTP

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

// ============================ SORTING
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

// ========================== FILTRATION

export const keysOfContact = [
  'name',
  'phoneNumber',
  'email',
  '_id',
  'createdAt',
  'updatedAt',
];

// ============================= CONTACT TYPES

export const contactTypes = ['work', 'home', 'personal'];

// ============================= NUMBERS

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
