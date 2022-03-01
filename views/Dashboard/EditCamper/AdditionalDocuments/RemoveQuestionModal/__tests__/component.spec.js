import { shallow } from 'enzyme';

import RemoveQuestionModal from '../component';

describe('RemoveQuestionModal component tests', () => {
  const props = {
    onClose: jest.fn(),
    submitHandler: jest.fn(),
  };

  const component = shallow(<RemoveQuestionModal {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
