import React from 'react';
import { shallow } from 'enzyme';

import ImportCalendarSection from '../component';

describe('ExportCalendarSection component tests', () => {
  const props = {
    onShowImportModal: jest.fn(),
    camperId: 'camperId',
  };

  const component = shallow(<ImportCalendarSection {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
