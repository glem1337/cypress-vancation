import yup from 'lib/yupLocalised';

export const CAMPER_AMENITY_OPTION_TYPES = {
  TOGGLER: 'toggler',
  CHECKBOX: 'checkbox',
};

export const CAMPER_AMENITIES_INCLUSIONS = [
  'amenities',
  'amenities.sub_amenities',
  'amenities.configuration_amenity',
  'amenities.configuration_amenity.configuration_sub_amenities',
  'amenities.amenity_options',
  'amenities.configuration_amenity.configuration_amenity_options',
  'amenities.amenity_options.sub_amenities',
  'amenities.custom_amenities',
  'amenities.configuration_amenity.configuration_amenity_options.configuration_sub_amenities',
];

export const FETCH_CAMPER_AMENITIES_INCLUSIONS = [
  'configuration_sub_amenities',
  'configuration_amenity_options.configuration_sub_amenities',
];

export const CAMPER_AMENITIES_CONFIG = {
  ACCOMMODATION_TITLE: 'Accomodation',
  MIN_QUANTITY: 1,
  MAX_CUSTOM_ACCOMMODATIONS: 10,
  MAX_CUSTOM_ACCOMMODATION_QUANTITY: 5,
  MIN_CUSTOM_ACCOMMODATION_NAME_LENGTH: 2,
  MAX_CUSTOM_ACCOMMODATION_NAME_LENGTH: 50,
};

export const AMENITIES_VALIDATION_SCHEMA = yup.array().of(
  yup.object().shape({
    configurationCustomAmenities: yup.array().of(
      yup.object().shape({
        name: yup
          .string()
          .min(CAMPER_AMENITIES_CONFIG.MIN_CUSTOM_ACCOMMODATION_NAME_LENGTH, {
            id: 'validations.min',
            values: {
              pref: 'Name',
              value:
                CAMPER_AMENITIES_CONFIG.MIN_CUSTOM_ACCOMMODATION_NAME_LENGTH,
            },
          })
          .max(CAMPER_AMENITIES_CONFIG.MAX_CUSTOM_ACCOMMODATION_NAME_LENGTH, {
            id: 'validations.max',
            values: {
              pref: 'Name',
              value:
                CAMPER_AMENITIES_CONFIG.MAX_CUSTOM_ACCOMMODATION_NAME_LENGTH,
            },
          })
          .required({
            id: 'validations.cantBeBlank',
            values: { pref: 'Name' },
          }),
      }),
    ),
  }),
);
