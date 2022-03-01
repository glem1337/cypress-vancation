import { shallow } from 'enzyme';

import Addons from '../component';

describe('Addons component tests', () => {
  const props = {
    values: {
      addons: [],
      customAddons: [],
    },
    isValid: true,
    isLoading: true,
    isCamperExist: true,
    handleSubmit: jest.fn(),
    onRemoveCustomAddon: jest.fn(),
    onAddCustomAddon: jest.fn(),
    leavePagePrepare: jest.fn(),
  };

  const component = shallow(<Addons {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when camper does not exist', () => {
    component.setProps({ isCamperExist: false });

    expect(component).toMatchSnapshot();
  });
});
