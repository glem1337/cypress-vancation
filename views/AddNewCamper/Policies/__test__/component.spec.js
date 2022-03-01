import { shallow } from 'enzyme';

import intl from 'utils/testHelpers/fakeIntl';

import PoliciesComponent from '../component';

describe('Policies component tests', () => {
  const props = {
    onBackButtonClick: jest.fn(),
    intl,
    isSubmitting: false,
    handleSubmit: jest.fn(),
    isCamperExist: true,
    camperCompleteness: 324,
  };

  const component = shallow(<PoliciesComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when camper does not exist', () => {
    component.setProps({ isCamperExist: false });

    expect(component).toMatchSnapshot();
  });
});
