import { shallow } from 'enzyme';

import intl from 'utils/testHelpers/fakeIntl';

import BtnGradientComponent from '../component';

const mockedHookData = {
  containerRef: {},
};
jest.mock('utils/hooks/useButtonGradient', () => jest.fn(() => mockedHookData));

describe('BtnGradient Component', () => {
  const props = {
    intl,
    text: 'Label',
    className: 'test classname',
  };

  const component = shallow(<BtnGradientComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when text is object', () => {
    component.setProps({ text: 'shared.ok' });

    expect(component).toMatchSnapshot();
  });
});
