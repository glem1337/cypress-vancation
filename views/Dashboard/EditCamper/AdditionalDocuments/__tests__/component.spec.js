import { shallow } from 'enzyme';

import AdditionalDocuments from '../component';

describe('AdditionalDocuments component tests', () => {
  const props = {
    handleSubmit: jest.fn(),
    onRemoveDocuments: jest.fn(),
    validateDocuments: jest.fn(),
    onAddQuestion: jest.fn(),
    onRemoveQuestion: jest.fn(),
    leavePagePrepare: jest.fn(),
    values: {
      documents: [],
      questions: [],
    },
    isValid: true,
    isLoading: true,
    isCamperExist: true,
  };

  const component = shallow(<AdditionalDocuments {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when camper does not exist', () => {
    component.setProps({ isCamperExist: false });

    expect(component).toMatchSnapshot();
  });
});
