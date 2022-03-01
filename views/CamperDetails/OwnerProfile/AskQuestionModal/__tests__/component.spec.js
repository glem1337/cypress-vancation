import { shallow } from 'enzyme';

import AskQuestionModal from '../component';

describe('AskQuestionModal component tests', () => {
  const props = {
    onClose: jest.fn(),
    handleSubmit: jest.fn(),
    blockedPeriods: {
      '2021-09-24': true,
    },
    onActiveStartDateChange: jest.fn(),
    isFormValid: true,
    isLoading: true,
    values: {
      description: 'description',
    },
    placeholder: 'Title placeholder',
  };

  const component = shallow(<AskQuestionModal {...props} />);

  describe('matches snapshot', () => {
    it('default', () => {
      expect(component).toMatchSnapshot();
    });

    it('when form invalid', () => {
      component.setProps({
        isFormValid: false,
      });

      expect(component).toMatchSnapshot();
    });
  });
});
