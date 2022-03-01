import { shallow } from 'enzyme';

import { CAMPER_STATUS } from 'constants/camper';

import RemoveModal from '../component';

describe('CamperStatusModal component tests', () => {
  const props = {
    onClose: jest.fn(),
    handleSubmit: jest.fn(),
    isLoading: false,
    status: CAMPER_STATUS.PUBLISHED,
  };

  const component = shallow(<RemoveModal {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('when status === removed', () => {
    component.setProps({
      status: CAMPER_STATUS.REMOVED,
    });

    expect(component).toMatchSnapshot();
  });
});
