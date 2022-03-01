import React from 'react';
import { withFormik } from 'formik';
import { injectIntl } from 'react-intl';
import { compose } from 'ramda';
import { connect } from 'react-redux';

import ROUTES from 'constants/routes';
import yup from 'lib/yupLocalised';
import {
  MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, MAX_FIRST_NAME_LENGTH, MAX_LAST_NAME_LENGTH,
  MAX_EMAIL_LENGTH,
} from 'constants';
import { handleSubmit } from 'utils/form/handleSubmit';
import attachLayout from 'views/layouts/attachLayout';
import AddNewCamperLayout from 'views/layouts/AddNewCamper';
import isSubmitDisabled from 'utils/form/isSubmitDisabled';
import { userSignUp as userSignUpAction } from 'state/concepts/session/actions';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import PersonalInformationComponent from './component';

// eslint-disable-next-line react/prefer-stateless-function
class PersonalInformation extends React.Component {
  render() {
    return (
      <PersonalInformationComponent
        {...this.props}
        isFormValid={!isSubmitDisabled(this.props)}
      />
    );
  }
}

const mapDispatchToProps = {
  onSubmit: userSignUpAction,
};

export { PersonalInformation as PersonalInformationContainer };
export default compose(
  attachLayout(AddNewCamperLayout),
  connect(null, mapDispatchToProps),
  withFormik({
    mapPropsToValues: () => ({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      phoneNumber: '',
      redirectRoute: createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.PATH, 'id'),
    }),
    handleSubmit,
    validationSchema: yup.object().shape({
      email: yup.string()
        .email()
        .max(MAX_EMAIL_LENGTH, { id: 'validations.emailMustBeEqualOrLessThan', values: { max: MAX_EMAIL_LENGTH } })
        .required({ id: 'validations.emailIsRequired' }),
      firstName: yup.string()
        .max(MAX_FIRST_NAME_LENGTH, { id: 'validations.firstNameMustBeEqualOrLessThan', values: { max: MAX_FIRST_NAME_LENGTH } })
        .required({ id: 'validations.firstNameIsRequired' }),
      lastName: yup.string()
        .max(MAX_LAST_NAME_LENGTH, { id: 'validations.lastNameMustBeEqualOrLessThan', values: { max: MAX_LAST_NAME_LENGTH } })
        .required({ id: 'validations.lastNameIsRequired' }),
      password: yup.string()
        .min(MIN_PASSWORD_LENGTH, { id: 'validations.useMinPasswordLength', values: { min: MIN_PASSWORD_LENGTH } })
        .max(MAX_PASSWORD_LENGTH, { id: 'validations.passwordMustBeEqualOrLess', values: { max: MAX_PASSWORD_LENGTH } })
        .required({ id: 'validations.passwordIsRequired' }),
      phoneNumber: yup.string()
        .required({ id: 'validations.phoneNumberIsRequired' }),
    }),
  }),
  injectIntl,
)(PersonalInformation);
