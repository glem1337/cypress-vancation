import React from 'react';
import { shallow } from 'enzyme';

import SearchSection from '../container';

describe('SearchSection container tests', () => {
  const props = {
    isStartInputVisible: true,
    isChooseDestinationVisible: true,
    onStartInputFocus: jest.fn(),
    destinationsInputRef: {},
  };

  const container = shallow(<SearchSection {...props} />);

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
