import { shallow } from 'enzyme';

import TripFees from '../component';

describe('TripFees component tests', () => {
  const props = {
    isCamperExist: true,
    isMileageLimited: true,
    availableMiles: 1,
    overageMiles: 2,
    hasGenerator: true,
    isGeneratorLimited: true,
    availableGeneratorHours: 3,
    overageGenerator: 4,
    cleaningFee: 5,
    dumpingFee: 6,
    fuelFee: 7,
    lateDropOff: 8,
    customFees: [
      {
        id: '1',
      },
    ],
    ownerFeesIsPresent: true,
  };

  const component = shallow(<TripFees {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when camper doesn`t exist', () => {
    component.setProps({
      isCamperExist: false,
    });

    expect(component).toMatchSnapshot();
  });
});
