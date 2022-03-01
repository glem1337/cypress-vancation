import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { hideModal } from 'state/modal/actions';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import ModalRootWrapped, { ModalRootContainer } from '../container';

jest.mock('state/modal/actions', () => ({
  hideModal: jest.fn(),
}));

describe('ModalRoot container', () => {
  const store = configureStore()({
    modal: {
      modalType: 'MY_MODAL',
      modalProps: {
        customProp: 'customProp',
      },
    },
  });
  store.dispatch = jest.fn();

  const wrapper = shallow(<ModalRootWrapped store={store} history={{}} />);
  const container = diveTo(wrapper, ModalRootContainer);

  it('renders ModalRoot component', () => {
    expect(container).toMatchSnapshot();
  });

  it('onClose()', () => {
    container.props().onClose();
    expect(hideModal).toHaveBeenCalledTimes(1);
  });
});
