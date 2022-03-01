import { shallow } from 'enzyme';

import ActualCashValueSection from '../component';

describe('ActualCashValueSection component tests', () => {
  const props = {
    actualCashValue: 10,
  };

  const component = shallow(<ActualCashValueSection {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when actualCashValue does not exist', () => {
    component.setProps({ actualCashValue: undefined });

    expect(component).toMatchSnapshot();
  });
});
