import { shallow } from 'enzyme';

import { CAMPER_STATUS } from 'constants/camper';

import ActionsDropdown from '../component';

describe('ActionsDropdown component tests', () => {
  const props = {
    status: CAMPER_STATUS.PUBLISHED,
    onEdit: jest.fn(),
    onPreview: jest.fn(),
    onRemove: jest.fn(),
    onPublish: jest.fn(),
    onUnpublish: jest.fn(),
  };

  const component = shallow(<ActionsDropdown {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('when camper status === unpublished', () => {
    component.setProps({
      status: CAMPER_STATUS.UNPUBLISHED,
    });

    expect(component).toMatchSnapshot();
  });
});
