import { shallow } from 'enzyme';

import intl from 'utils/testHelpers/fakeIntl';

import { POLICIES_FORM_VALUES } from 'constants/camper';

import PoliciesComponent from '../component';

describe('Policies component tests', () => {
  const props = {
    intl,
    camperPolicy: {
      deposit: 3000,
    },
    submitHandler: jest.fn(),
    requestNoticeChangeHandler: jest.fn(),
    onReviewSelectHandler: jest.fn(),
    leavePagePrepare: jest.fn(),
    isCamperExist: true,
    isValid: true,
    values: {
      requestNotice: false,
      bookingApprovalPolicy: POLICIES_FORM_VALUES.INSTANT_BOOK,
    },
  };

  const component = shallow(<PoliciesComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when camper does not exist', () => {
    component.setProps({ isCamperExist: false });

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when bookingApprovalPolicy !== instant_book', () => {
    component.setProps({
      values: {
        bookingApprovalPolicy: POLICIES_FORM_VALUES.REVIEW,
      },
    });

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when requestNotice is checked', () => {
    component.setProps({
      values: {
        bookingApprovalPolicy: POLICIES_FORM_VALUES.REVIEW,
        requestNotice: true,
      },
    });

    expect(component).toMatchSnapshot();
  });
});
