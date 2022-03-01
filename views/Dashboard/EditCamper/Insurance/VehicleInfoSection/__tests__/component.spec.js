import { shallow } from 'enzyme';

import VehicleInfoSection from '../component';

describe('VehicleInfoSection component tests', () => {
  const props = {
    isLoading: true,
  };

  const component = shallow(<VehicleInfoSection {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
