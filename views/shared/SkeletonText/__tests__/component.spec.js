import { shallow } from 'enzyme';

import SkeletonText from '../component';

describe('SkeletonText component tests', () => {
  const props = {
    rows: 1,
  };

  const component = shallow(<SkeletonText {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
