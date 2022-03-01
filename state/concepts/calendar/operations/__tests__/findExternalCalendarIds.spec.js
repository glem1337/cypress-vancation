import { setExternalCalendarIds } from 'state/concepts/calendar/actions';
import findExternalCalendarIds from '../findExternalCalendarIds';

jest.mock('utils/showErrorNotifications', () => jest.fn());

jest.mock('state/concepts/calendar/selectors.js', () => ({
  externalCalendarIdsSelector: jest.fn(() => []),
}));

describe('findExternalCalendarIds', () => {
  it('has valid attributes', () => {
    expect(findExternalCalendarIds).toMatchSnapshot();
  });

  it('when response has externalCalendar', () => {
    const dispatch = jest.fn();

    const action = {
      response: {
        externalCalendar: {
          id: {
            data: 1,
          },
        },
      },
    };

    findExternalCalendarIds.process({ action, getState: jest.fn() }, dispatch, jest.fn());

    expect(dispatch).toHaveBeenCalledWith(setExternalCalendarIds(['id']));
  });

  it('when response has not externalCalendar', () => {
    const dispatch = jest.fn();

    const action = {
      response: {},
    };

    findExternalCalendarIds.process({ action, getState: jest.fn() }, dispatch, jest.fn());

    expect(dispatch).not.toHaveBeenCalledWith();
  });
});
