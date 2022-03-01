import React from 'react';
import { shallow } from 'enzyme';

import { CALENDAR_EVENT_TYPE } from 'constants/calendar';

import Event from '../component';

describe('Event component tests', () => {
  const props = {
    event: {
      resource: {
        type: 'available',
      },
    },
  };

  const component = shallow(<Event {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot with another event type', () => {
    component.setProps({
      event: {
        resource: {
          type: CALENDAR_EVENT_TYPE.BLOCKED,
        },
      },
    });

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot for external event', () => {
    component.setProps({
      event: {
        resource: {
          type: CALENDAR_EVENT_TYPE.EXTERNAL,
          calendarName: 'test',
        },
      },
    });

    expect(component).toMatchSnapshot();
  });
});
