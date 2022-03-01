import { shallow } from 'enzyme';

import Limits from '../component';

describe('Limits component tests', () => {
  const props = {
    isMileageLimited: true,
    availableMiles: 1,
    overageMiles: 2,
    hasGenerator: true,
    isGeneratorLimited: true,
    availableGeneratorHours: 3,
    overageGenerator: 4,
  };

  const component = shallow(<Limits {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
