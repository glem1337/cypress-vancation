import React from 'react';
import { compose } from 'ramda';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { MAX_EMAIL_LENGTH } from 'constants';
import yup from 'lib/yupLocalised';
import { handleSubmit } from 'utils/form/handleSubmit';
import isSubmitDisabled from 'utils/form/isSubmitDisabled';
import { subscribeDiscountEndpoint } from 'state/concepts/users/endpoints';
import { subscribeDiscountAction } from 'state/concepts/users/actions';
import { loadingSelector } from 'state/data/selectors';
import DiscountCodesComponent from './component';

class DiscountCodes extends React.PureComponent {
  render = () => (
    <DiscountCodesComponent
      {...this.props}
      isFormValid={!isSubmitDisabled(this.props)}
    />
  );
}

DiscountCodesComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onSubmit: subscribeDiscountAction,
};

const mapStateToProps = state => ({
  isLoading: loadingSelector(state, subscribeDiscountEndpoint.endpoint),
});

export { DiscountCodes as DiscountCodesContainer };
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    mapPropsToValues: () => ({ email: '' }),
    handleSubmit,
    validationSchema: yup.object().shape({
      email: yup.string()
        .email()
        .max(MAX_EMAIL_LENGTH, { id: 'validations.emailMustBeEqualOrLessThan', values: { max: MAX_EMAIL_LENGTH } })
        .required({ id: 'validations.emailIsRequired' }),
    }),
  }),
)(DiscountCodes);
