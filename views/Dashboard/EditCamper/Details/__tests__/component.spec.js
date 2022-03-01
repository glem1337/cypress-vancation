import { shallow } from 'enzyme';

import Details from '../component';

describe('ListingDetails component tests', () => {
  const props = {
    values: {
      listingName: 'test name',
      listingDescription: 'test description',
    },
    canSaveAndContinue: true,
    handleSubmit: jest.fn(),
    isCamperExist: true,
    leavePagePrepare: jest.fn(),
  };

  const component = shallow(<Details {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when camper does not exist', () => {
    component.setProps({ isCamperExist: false });

    expect(component).toMatchSnapshot();
  });
});
