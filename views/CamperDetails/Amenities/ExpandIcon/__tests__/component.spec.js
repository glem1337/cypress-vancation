import { shallow } from 'enzyme';

import ExpandIcon from '../component';

describe('ExpandIcon component tests', () => {
  const props = {
    isActive: false,
  };

  const component = shallow(<ExpandIcon {...props} />);

  describe('matches snapshot', () => {
    it('default', () => {
      expect(component).toMatchSnapshot();
    });

    it('when isActive === true', () => {
      component.setProps({ isActive: true });

      expect(component).toMatchSnapshot();
    });
  });
});
