import { shallow } from 'enzyme';

import InputHelpComponent from '../component';

describe('InputHelp component matches snapshot', () => {
  it('with plain text message', () => {
    const props = {
      type: 'danger',
      text: 'Fake text',
      intl: {
        locale: 'en',
        formatMessage: jest.fn(),
      },
    };

    const wrapper = shallow(<InputHelpComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with intl object text message', () => {
    const props = {
      type: 'danger',
      text: { id: 'fake.text' },
      intl: {
        locale: 'en',
        messages: { 'fake.text': 'Fake text' },
        formatMessage: jest.fn(),
      },
    };

    const wrapper = shallow(<InputHelpComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with danger type', () => {
    const props = {
      type: 'danger',
      text: 'foo',
      intl: {
        locale: 'en',
        formatMessage: jest.fn(),
      },
    };

    const wrapper = shallow(<InputHelpComponent {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
