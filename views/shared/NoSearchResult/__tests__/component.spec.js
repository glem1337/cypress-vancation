import { shallow } from 'enzyme';

import NoSearchResult from '../component';

describe('NoSearchResult component', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<NoSearchResult />);

    expect(wrapper).toMatchSnapshot();
  });
});
