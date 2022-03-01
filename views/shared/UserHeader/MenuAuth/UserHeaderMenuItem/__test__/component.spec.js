import { shallow } from 'enzyme';
import ROUTES from 'constants/routes';
import UserHeaderMenuItemComponent from '../component';

describe('UserHeaderMenuItemComponent', () => {
  const defaultProps = {
    active: 'account',
    targetBlankItems: [ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.KEY],
    keyPage: ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.KEY,
    path: ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.PATH,
    contentId: 'test_contentId',
    itMenu: false,
  };

  it('UserDropdownComponent default props snapshot', () => {
    const component = shallow(<UserHeaderMenuItemComponent {...defaultProps} />);

    expect(component).toMatchSnapshot();
  });

  it('UserDropdownComponent targetBlankItems empty array snapshot', () => {
    const props = {
      ...defaultProps,
      targetBlankItems: [],
    };

    const component = shallow(<UserHeaderMenuItemComponent {...props} />);

    expect(component).toMatchSnapshot();
  });
});
