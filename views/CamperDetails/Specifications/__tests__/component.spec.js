import { shallow } from 'enzyme';

import { DETAILS_CONFIG } from 'constants/camperDetails';

import Specifications from '../component';

describe('Specifications component tests', () => {
  const props = {
    isCamperExist: true,
    allDescriptionVisible: true,
    allDetailsVisible: true,
    toggleDescription: jest.fn(),
    toggleDetails: jest.fn(),
    description: 'description',
    detailsConfig: [DETAILS_CONFIG[0], DETAILS_CONFIG[2]],
    camper: {
      publicId: '123',
      description: 'description',
      specificationDetail: {
        whoBuiltCamper: 'Sybil Turner',
        sleeps: 12,
        insideHeight: 'hight_top',
      },
    },
  };

  const component = shallow(<Specifications {...props} />);

  describe('matches snapshot', () => {
    it('default', () => {
      expect(component).toMatchSnapshot();
    });

    it('when camper doesnt exist', () => {
      component.setProps({ isCamperExist: false });

      expect(component).toMatchSnapshot();
    });
  });
});
