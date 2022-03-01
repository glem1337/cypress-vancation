import { compose } from 'ramda';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import yup from 'lib/yupLocalised';

import { handleSubmitWithProps } from 'utils/form/handleSubmit';

import { createCamperCalendarImport } from 'state/concepts/camper/actions';
import { createCamperCalendarImportEndpoint } from 'state/concepts/camper/endpoints';
import { loadingSelector } from 'state/data/selectors';

import ImportModalComponent from 'views/shared/ImportModal';

const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state, createCamperCalendarImportEndpoint.endpoint),
});

const mapDispatchToProps = {
  onSubmit: createCamperCalendarImport,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    mapPropsToValues: () => ({
      name: '',
      link: '',
    }),
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      link: yup.string().required().isICALFormat().url(),
    }),
    handleSubmit: handleSubmitWithProps(['camperId']),
  }),
)(ImportModalComponent);
