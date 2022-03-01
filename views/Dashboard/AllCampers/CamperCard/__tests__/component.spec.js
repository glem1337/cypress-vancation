import { shallow } from 'enzyme';

import { INSURANCE_STATUS } from 'constants/camperInsurance';
import { CAMPER_STATUS } from 'constants/camper';

import CamperCard from '../component';

describe('CamperCard component tests', () => {
  const props = {
    id: 'camperId',
    img: 'img',
    insurance: INSURANCE_STATUS.PENDING,
    publicId: 'publicId',
    status: CAMPER_STATUS.PUBLISHED,
    title: 'title',
    place: 'place',
    description: 'description',
    rating: 100,
    onEdit: jest.fn(),
    onPreview: jest.fn(),
    onRemove: jest.fn(),
    onPublish: jest.fn(),
    onUnpublish: jest.fn(),
  };

  const component = shallow(<CamperCard {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('when insurance status === approved', () => {
    component.setProps({
      insurance: INSURANCE_STATUS.APPROVED,
    });

    expect(component).toMatchSnapshot();
  });
});
