import { useDispatch } from 'react-redux';
import * as R from 'ramda';
import { v4 as uuid } from 'uuid';

import { hideModal } from 'state/modal/actions';

function useContainer(props) {
  const dispatch = useDispatch();

  // Cleaning
  const cleaningFee = R.path(
    [
      'camperPricingAndFees',
      'tripFeesStructure',
      'table',
      'cleaning',
    ],
    props,
  );

  // Mileage
  const milesPerDay = R.path(
    [
      'camperPricingAndFees',
      'tripFeesStructure',
      'table',
      'mileageTripFee',
      'table',
      'availableDays',
    ],
    props,
  );

  const milesOverage = R.path(
    [
      'camperPricingAndFees',
      'tripFeesStructure',
      'table',
      'mileageTripFee',
      'table',
      'overagePrice',
    ],
    props,
  );

  // Generator
  const generatorHours = R.path(
    [
      'camperPricingAndFees',
      'tripFeesStructure',
      'table',
      'generatorTripFee',
      'table',
      'availableHours',
    ],
    props,
  );

  const generatorOverage = R.path(
    [
      'camperPricingAndFees',
      'tripFeesStructure',
      'table',
      'generatorTripFee',
      'table',
      'overagePrice',
    ],
    props,
  );

  // Service fee
  const serviceFee = R.path(
    [
      'camperPricingAndFees',
      'serviceFeePrice',
    ],
    props,
  );

  // Total
  const estTotal = R.path(
    [
      'camperPricingAndFees',
      'feesProcessingPrice',
    ],
    props,
  );

  // Custom fees
  const customFees = R.compose(
    R.map(item => ({
      id: uuid(),
      name: R.path(['table', 'name'], item),
      price: R.compose(
        value => `$${Number(value).toFixed(2)}`,
        parseFloat,
        R.path(['table', 'price']),
      )(item),
    })),
    R.defaultTo([]),
    R.path(['camperPricingAndFees', 'tripFeesStructure', 'table', 'customFees']),
  )(props);

  /**
   * Close modal.
   */
  const closeModal = () => {
    dispatch(hideModal());
  };

  return {
    closeModal,
    cleaningFee: `$${Number(cleaningFee).toFixed(2)}`,
    mileage: {
      isUnlimited: milesOverage === 0 && milesPerDay === 0,
      milesPerDay,
      milesOverage: `$${Number(milesOverage).toFixed(2)}`,
    },
    generator: {
      isUnlimited: generatorOverage === 0 && generatorHours === 0,
      generatorHours,
      generatorOverage: `$${Number(generatorOverage).toFixed(2)}`,
    },
    serviceFee: `$${Number(serviceFee).toFixed(2)}`,
    estTotal: `$${Number(estTotal).toFixed(2)}`,
    customFees,
  };
}

export default useContainer;
