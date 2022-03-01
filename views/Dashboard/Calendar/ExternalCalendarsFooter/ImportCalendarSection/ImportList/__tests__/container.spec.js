import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import { showModal } from 'state/modal/actions';

import ImportList, { ImportListContainer } from '../container';

jest.mock('state/concepts/camper/selectors', () => ({
  camperExternalCalendarsSelector: jest.fn(() => [
    { name: 'name', link: 'link', id: 'id' },
  ]),
}));

describe('ImportList container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();
  const calendar = { name: 'name', link: 'link', id: 'id' };

  const props = {
    store,
    showModal: jest.fn(),
    camperId: 'camperId',
  };

  const wrapper = shallow(<ImportList {...props} />);
  const container = diveTo(wrapper, ImportListContainer);
  const instance = container.instance();

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `showRemoveModal` instance method', () => {
    instance.showRemoveModal(calendar.id)();

    expect(store.dispatch).toHaveBeenCalledWith(
      showModal({
        modalType: 'CALENDAR_IMPORT_REMOVE_MODAL',
        modalProps: {
          calendarId: calendar.id,
          camperId: props.camperId,
        },
      }),
    );
  });

  it('checks `showEditModal` instance method', () => {
    instance.showEditModal(calendar)();

    expect(store.dispatch).toHaveBeenCalledWith(
      showModal({
        modalType: 'CALENDAR_IMPORT_EDIT_MODAL',
        modalProps: {
          calendarId: calendar.id,
          camperId: props.camperId,
          name: calendar.name,
          link: calendar.link,
        },
      }),
    );
  });
});
