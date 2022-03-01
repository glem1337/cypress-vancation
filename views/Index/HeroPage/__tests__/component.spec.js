import { shallow } from 'enzyme';

import intl from 'utils/testHelpers/fakeIntl';

import HeroPage from '../component';

const mockedHookData = {
  intl,
  chooseDestinationRef: {},
};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('HeroPage component', () => {
  const props = {
    isChooseDestinationVisible: true,
  };

  const component = shallow(<HeroPage {...props} />);

  it('snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('when isChooseDestinationVisible equals false', () => {
    component.setProps({ estimateEarningState: true });

    const lastField = component.find('ChooseDestinationWidget');

    expect(lastField.isEmptyRender()).toBe(true);
  });
});
