import { shallow } from 'enzyme';

import SkeletonTitle from '../component';

describe('SkeletonTitle component tests', () => {
  const props = {
    className: 'test class name',
    width: 19,
  };

  const component = shallow(<SkeletonTitle {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
