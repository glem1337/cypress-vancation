import React from 'react';
import { shallow } from 'enzyme';

import ExportCalendarSection from '../component';

describe('ExportCalendarSection component tests', () => {
  const props = {
    onExport: jest.fn(),
    camperId: 'camperId',
  };

  const component = shallow(<ExportCalendarSection {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
