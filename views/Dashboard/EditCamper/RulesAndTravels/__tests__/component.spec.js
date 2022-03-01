import { shallow } from 'enzyme';

import RulesAndTravels from '../component';

describe('RulesAndTravels component tests', () => {
  const props = {
    isLoading: false,
    isValid: true,
    isCamperExist: true,
    handleSubmit: jest.fn(),
    onAddCustomRule: jest.fn(),
    onRemoveCustomRule: jest.fn(),
    values: {
      customRestrictionRules: [],
      customTravelRestrictions: [],
      customRestrictionRoads: [],
    },
    leavePagePrepare: jest.fn(),
  };

  const component = shallow(<RulesAndTravels {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('when camper isn`t exist', () => {
    component.setProps({
      isCamperExist: false,
    });

    expect(component).toMatchSnapshot();
  });
});
