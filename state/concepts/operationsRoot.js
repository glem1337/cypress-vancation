import { usersOperations } from './users';
import { sessionOperations } from './session';
import { camperOperations } from './camper';
import { mapboxOperations } from './mapbox';
import { camperRentalOperations } from './campervan-rental';
import { calendarOperations } from './calendar';
import { healthAndSafetyOperations } from './health-and-safety';
import { searchDestinationsOperations } from './search-destinations';
import { homeOperations } from './home';
import { travelAccessoriesOperations } from './travel-accessories';
import { bookingOperations } from './booking';
import { ownerOperations } from './owner';

export default [
  ...usersOperations,
  ...sessionOperations,
  ...camperOperations,
  ...mapboxOperations,
  ...camperRentalOperations,
  ...calendarOperations,
  ...healthAndSafetyOperations,
  ...searchDestinationsOperations,
  ...homeOperations,
  ...travelAccessoriesOperations,
  ...bookingOperations,
  ...ownerOperations,
];
