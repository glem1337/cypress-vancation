import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';

import { CAMPER_STATUS } from 'constants/camper';

import { updateCamperStatus } from 'state/concepts/camper/actions';

import CamperStatusModal, { CamperStatusModalContainer } from '../container';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

describe('CamperStatusModal container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    camperId: 'camperId',
    status: CAMPER_STATUS.PUBLISHED,
    onSubmit: jest.fn(),
    onClose: jest.fn(),
  };

  const wrapper = shallow(<CamperStatusModal {...props} />);
  const container = diveTo(wrapper, CamperStatusModalContainer);
  const instance = container.instance();

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('test `handleSubmit` instance method', () => {
    instance.handleSubmit();

    expect(store.dispatch).toHaveBeenCalledWith(
      updateCamperStatus({ status: props.status, camperId: props.camperId }),
    );
  });
});
