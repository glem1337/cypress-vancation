import { shallow } from 'enzyme';

import InsuranceList from '../component';

describe('InsuranceList component tests', () => {
  const component = shallow(<InsuranceList />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
