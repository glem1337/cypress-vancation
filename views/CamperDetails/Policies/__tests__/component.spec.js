import { shallow } from 'enzyme';

import Policies from '../component';

describe('Policies component tests', () => {
  const props = {
    isCamperExist: true,
    initialized: true,
    onRef: jest.fn(),
    isLoading: false,
    cancellationPolicy: {
      title: {
        id: 'title.id',
      },
      description: {
        id: 'description.id',
      },
    },
  };

  const component = shallow(<Policies {...props} />);

  describe('matches snapshots', () => {
    it('default', () => {
      expect(component).toMatchSnapshot();
    });

    it('when doesnt initialized', () => {
      component.setProps({
        initialized: false,
        isCamperExist: true,
        isLoading: false,
      });

      expect(component).toMatchSnapshot();
    });

    it('when camper doesnt exist', () => {
      component.setProps({ isCamperExist: false });

      expect(component).toMatchSnapshot();
    });

    it('when loading', () => {
      component.setProps({ isLoading: true });

      expect(component).toMatchSnapshot();
    });
  });
});
