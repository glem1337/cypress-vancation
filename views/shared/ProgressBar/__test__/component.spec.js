import { shallow } from 'enzyme';
import ProgressBarComponent from '../component';

describe('ProgressBar Component', () => {
  const props = {
    content: 'test content',
    percent: 100,
  };

  it('snapshot with props', () => {
    const component = shallow(<ProgressBarComponent {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('snapshot default props', () => {
    const component = shallow(<ProgressBarComponent />);

    expect(component).toMatchSnapshot();
  });
});
