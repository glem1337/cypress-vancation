const isSubmitDisabled = (
  { isSubmitting, dirty, isValid },
  { allowPristine } = { allowPristine: false },
) => isSubmitting || (!allowPristine && !dirty) || !isValid;

export default isSubmitDisabled;
