import { shallow } from 'enzyme';

import RemoveDocumentModal from '../component';

describe('RemoveDocumentModal component tests', () => {
  const props = {
    onClose: jest.fn(),
    submitHandler: jest.fn(),
  };

  const component = shallow(<RemoveDocumentModal {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
