import { omit, pick, pathOr } from 'ramda';
import formatJsonApiErrors from 'utils/formatJsonApiErrors';

const assignFormErrors = (form, error, statusKeys = ['base']) => {
  const errors = pathOr(null, ['response', 'data', 'errors'], error);
  const formattedErrors = formatJsonApiErrors(errors);

  form.setStatus(pick(statusKeys, formattedErrors));
  form.setErrors(omit(statusKeys, formattedErrors));
};

export default assignFormErrors;
