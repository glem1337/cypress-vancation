import { shallow } from 'enzyme';

import NearbyLocations from '../component';

describe('NearbyLocations component tests', () => {
  const props = {
    initialized: true,
    onRef: jest.fn(),
    isCamperExist: true,
    isLoading: false,
    locations: [
      {
        id: '1',
        stateSlug: 'stateSlug',
        landingSlug: 'landingSlug',
        landingName: 'landingName',
      },
    ],
  };

  const component = shallow(<NearbyLocations {...props} />);

  describe('matches snapshot', () => {
    it('default', () => {
      expect(component).toMatchSnapshot();
    });

    it('when locations aren`t present', () => {
      component.setProps({
        locations: [],
      });

      expect(component).toMatchSnapshot();
    });

    it('when loading', () => {
      component.setProps({
        isLoading: true,
      });

      expect(component).toMatchSnapshot();
    });
  });
});
