import yup from 'lib/yupLocalised';
import {
  FINISH_RANGE_LENGTH_CAMPER,
  MAX_SEAT_SLEEP_PLACE,
  MIN_SEAT_SLEEP_PLACE,
  START_RANGE_LENGTH_CAMPER,
} from './camper';

export const SPECIFICATIONS_VALIDATION_SCHEMA = {
  vehicleTypeName: yup.string().required({
    id: 'validations.cantBeBlank',
    values: { pref: 'Vehicle type' },
  }),
  name: yup
    .string()
    .required({ id: 'validations.cantBeBlank', values: { pref: 'Make' } }),
  modelNaming: yup
    .string()
    .required({ id: 'validations.cantBeBlank', values: { pref: 'Model' } }),
  year: yup
    .string()
    .required({ id: 'validations.cantBeBlank', values: { pref: 'Year' } }),
  length: yup
    .number()
    .required({
      id: 'validations.cantBeBlank',
      values: { pref: 'Length' },
    })
    .min(START_RANGE_LENGTH_CAMPER, { id: 'addNewCamper.specifications.validations.length.min', values: { value: START_RANGE_LENGTH_CAMPER } })
    .max(FINISH_RANGE_LENGTH_CAMPER, { id: 'addNewCamper.specifications.validations.length.max', values: { value: FINISH_RANGE_LENGTH_CAMPER } }),
  insideHeight: yup.string().required({
    id: 'validations.cantBeBlank',
    values: { pref: 'Inside height' },
  }),
  seats: yup
    .number()
    .required({ id: 'validations.cantBeBlank', values: { pref: 'Seats' } })
    .min(MIN_SEAT_SLEEP_PLACE, { id: 'addNewCamper.specifications.validations.seats.min', values: { value: MIN_SEAT_SLEEP_PLACE } })
    .max(MAX_SEAT_SLEEP_PLACE, { id: 'addNewCamper.specifications.validations.seats.max', values: { value: MAX_SEAT_SLEEP_PLACE } }),
  sleeps: yup
    .number()
    .required({ id: 'validations.cantBeBlank', values: { pref: 'Sleeps' } })
    .min(MIN_SEAT_SLEEP_PLACE, { id: 'addNewCamper.specifications.validations.sleeps.min', values: { value: MIN_SEAT_SLEEP_PLACE } })
    .max(MAX_SEAT_SLEEP_PLACE, { id: 'addNewCamper.specifications.validations.sleeps.max', values: { value: MAX_SEAT_SLEEP_PLACE } }),
  camperLocation: yup.object().geocoder({
    id: 'validations.cantBeBlank',
    values: { pref: 'Camper location' },
  }),
  stateRegistred: yup.string().required({
    id: 'validations.cantBeBlank',
    values: { pref: 'State registered' },
  }),
  transmission: yup.string().required({
    id: 'validations.cantBeBlank',
    values: { pref: 'Transmission' },
  }),
  mileage: yup.string().required({
    id: 'validations.cantBeBlank',
    values: { pref: 'Current mileage (estimate)' },
  }),
  fuelType: yup.string().required({
    id: 'validations.cantBeBlank',
    values: { pref: 'Fuel type' },
  }),
  whoBuiltCamper: yup.string(),
  drivetrain: yup.string().required({
    id: 'validations.cantBeBlank',
    values: { pref: 'Drivetrain' },
  }),
};

export const WATER_FORM_VALIDATION = {
  MIN: 0,
  MAX: 60,
};
