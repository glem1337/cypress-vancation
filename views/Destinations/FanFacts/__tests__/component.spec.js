import React from 'react';
import { shallow } from 'enzyme';

import FanFacts from '../component';
import useContainer from '../hook';

const mockedHookData = {
  areCampersExist: false,
  description: 'test description',
  facts: [{ id: 1, text: 'test fun fact' }],
};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('FanFacts component tests', () => {
  let component = shallow(<FanFacts />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches with incorrect data', () => {
    useContainer.mockReturnValueOnce({
      areCampersExist: true,
      description: null,
      facts: null,
    });

    component = shallow(<FanFacts />);

    expect(component).toMatchSnapshot();
  });
});
