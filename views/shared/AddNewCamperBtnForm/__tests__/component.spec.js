import { shallow } from 'enzyme';
import AddNewCamperBtnFormComponent from '../component';

describe('AddNewCamperBtnForm component tests', () => {
  const props = {
    withBackBtn: false,
    onBackClick: jest.fn(),
    onSaveClick: jest.fn(),
    canSave: true,
    isSubmitting: false,
  };

  const component = shallow(<AddNewCamperBtnFormComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when withBackBtn === true', () => {
    component.setProps({ withBackBtn: true });

    expect(component).toMatchSnapshot();
  });
});
