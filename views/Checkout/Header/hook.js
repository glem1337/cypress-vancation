import { CHECKOUT_STEPS } from 'constants/checkout';
import { useSelector } from 'react-redux';

import isPresent from 'utils/isPresent';

import { currentUserSelector } from 'state/concepts/session/selectors';

function useContainer() {
  const currentUser = useSelector(currentUserSelector);

  const skipFirstStep = isPresent(currentUser?.dateOfBirth);

  return skipFirstStep ? CHECKOUT_STEPS.slice(1) : CHECKOUT_STEPS;
}

export default useContainer;
