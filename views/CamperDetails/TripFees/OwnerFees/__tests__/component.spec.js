import { shallow } from 'enzyme';

import { CUSTOM_FEES_FREQUENCY_TYPES } from 'constants/camperDetails';

import OwnerFees from '../component';

describe('OwnerFees component tests', () => {
  const props = {
    cleaningFee: 1,
    dumpingFee: 2,
    fuelFee: 3,
    lateDropOff: 4,
    customFees: [
      {
        id: 'id',
        name: 'name',
        price: 20,
        frequency: CUSTOM_FEES_FREQUENCY_TYPES.PER_DAY,
      },
    ],
  };

  const component = shallow(<OwnerFees {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
