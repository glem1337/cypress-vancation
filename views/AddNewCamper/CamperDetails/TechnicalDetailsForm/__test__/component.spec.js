import { shallow } from 'enzyme';
import TechnicalDetailsFormComponent from '../component';

describe('TechnicalDetailsFormComponent', () => {
  const props = {
    isSubmitting: false,
    estimateEarningState: false,
  };

  const component = shallow(<TechnicalDetailsFormComponent {...props} />);

  it('snapshot default props', () => {
    expect(component).toMatchSnapshot();
  });

  it('snapshot isSubmitting = true', () => {
    component.setProps({ isSubmitting: true });

    expect(component).toMatchSnapshot();
  });

  it('estimateEarningState = true', () => {
    component.setProps({ estimateEarningState: true });

    const lastField = component.find('.main-input--last');

    expect(lastField.isEmptyRender()).not.toBe(true);
  });
});
