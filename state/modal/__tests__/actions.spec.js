import * as actions from 'state/modal/actions';

it('showModal', () => {
  const modalType = 'CREATE_STORE';
  const modalProps = { customProp: 'customProp' };
  const expectedAction = { type: 'SHOW_MODAL', modalType, modalProps };

  expect(actions.showModal({ modalType, modalProps })).toEqual(expectedAction);
});

it('hideModal', () => {
  const expectedAction = { type: 'HIDE_MODAL' };

  expect(actions.hideModal()).toEqual(expectedAction);
});
