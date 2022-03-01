import { shallow } from 'enzyme';
import GeneralFormComponent from '../component';

describe('GeneralFormComponent', () => {
  const props = {
    camperLength: [{ value: 10, label: '10`' }, { value: 10, label: '10`' }],
    years: [{ value: 1970, label: '1970`' }, { value: 1971, label: '1971`' }],
    handlerMake: jest.fn(),
    vehicleTypes: [{ value: 'types_1', label: 'types_1' }, { value: 'types_2', label: 'types_2' }],
    vehicleMake: [{ value: 'make_1', label: 'make_1' }, { value: 'make2', label: 'make_2' }],
    vehicleModel: [{ value: 'model_1', label: 'model_1' }, { value: 'model_2', label: 'model_2' }],
    builtCamper: [{ value: 'built_1', label: 'built_1' }, { value: 'built_2', label: 'built_2' }],
    isSubmitting: false,
  };

  const component = shallow(<GeneralFormComponent {...props} />);

  it('snapshot default props', () => {
    expect(component).toMatchSnapshot();
  });
});
