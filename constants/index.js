export const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
export const APP_HOST = process.env.NEXT_PUBLIC_APP_HOST;
export const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;
export const SUPPORT_PHONE = process.env.NEXT_PUBLIC_SUPPORT_PHONE;
export const APP_PHONE = process.env.NEXT_PUBLIC_APP_PHONE;
export const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_KEY;

export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 72;
export const MAX_FIRST_NAME_LENGTH = 255;
export const MAX_LAST_NAME_LENGTH = 255;
export const MAX_EMAIL_LENGTH = 255;

export const ALERT_KINDS = {
  success: 'success',
  error: 'error',
  warning: 'warning',
};

export const SOCIAL_LIST = {
  FACEBOOK: {
    NAME: 'facebook',
    APP_KEY: process.env.NEXT_PUBLIC_FACEBOOK_KEY,
  },
  GOOGLE: {
    NAME: 'google',
    APP_KEY: process.env.NEXT_PUBLIC_GOOGLE_KEY,
  },
};

export const USERS_STATUS = {
  USER: 'USER',
  GUSTS: 'GUSTS',
};

export const IS_DEV = process.env.NODE_ENV !== 'production';

export const REFRESH_ROUTE = `${API_HOST}/api/v1/accounts/session/refresh`;

export const NEW_YORK_STATE = { value: 'New York', label: 'New York' };
export const STATE = [
  { value: 'Alabama', label: 'Alabama' },
  { value: 'Alaska', label: 'Alaska' },
  { value: 'Arizona', label: 'Arizona' },
  { value: 'Arkansas', label: 'Arkansas' },
  { value: 'California', label: 'California' },
  { value: 'Colorado', label: 'Colorado' },
  { value: 'Connecticut', label: 'Connecticut' },
  { value: 'Delaware', label: 'Delaware' },
  { value: 'Florida', label: 'Florida' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Hawaii', label: 'Hawaii' },
  { value: 'Idaho', label: 'Idaho' },
  { value: 'Illinois', label: 'Illinois' },
  { value: 'Indiana', label: 'Indiana' },
  { value: 'Iowa', label: 'Iowa' },
  { value: 'Kansas', label: 'Kansas' },
  { value: 'Kentucky', label: 'Kentucky' },
  { value: 'Louisiana', label: 'Louisiana' },
  { value: 'Maine', label: 'Maine' },
  { value: 'Maryland', label: 'Maryland' },
  { value: 'Massachusetts', label: 'Massachusetts' },
  { value: 'Michigan', label: 'Michigan' },
  { value: 'Minnesota', label: 'Minnesota' },
  { value: 'Mississippi', label: 'Mississippi' },
  { value: 'Missouri', label: 'Missouri' },
  { value: 'Montana', label: 'Montana' },
  { value: 'Nebraska', label: 'Nebraska' },
  { value: 'Nevada', label: 'Nevada' },
  { value: 'New Hampshire', label: 'New Hampshire' },
  { value: 'New Jersey', label: 'New Jersey' },
  { value: 'New Mexico', label: 'New Mexico' },
  { value: 'New York', label: 'New York' },
  { value: 'North Carolina', label: 'North Carolina' },
  { value: 'North Dakota', label: 'North Dakota' },
  { value: 'Ohio', label: 'Ohio' },
  { value: 'Oklahoma', label: 'Oklahoma' },
  { value: 'Oregon', label: 'Oregon' },
  { value: 'Pennsylvania', label: 'Pennsylvania' },
  { value: 'Rhode Island', label: 'Rhode Island' },
  { value: 'South Carolina', label: 'South Carolina' },
  { value: 'South Dakota', label: 'South Dakota' },
  { value: 'Tennessee', label: 'Tennessee' },
  { value: 'Texas', label: 'Texas' },
  { value: 'Utah', label: 'Utah' },
  { value: 'Vermont', label: 'Vermont' },
  { value: 'Virginia', label: 'Virginia' },
  { value: 'Washington', label: 'Washington' },
  { value: 'West Virginia', label: 'West Virginia' },
  { value: 'Wisconsin', label: 'Wisconsin' },
  { value: 'Wyoming', label: 'Wyoming' },
];

export const MOBILE_DEVICE_WIDTH = 768;
