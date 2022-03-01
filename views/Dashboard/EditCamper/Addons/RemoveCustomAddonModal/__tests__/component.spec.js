import { shallow } from 'enzyme';

import RemoveCustomAddonModal from '../component';

describe('RemoveCustomAddonModal component tests', () => {
  const props = {
    onClose: jest.fn(),
    submitHandler: jest.fn(),
  };

  const component = shallow(<RemoveCustomAddonModal {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
