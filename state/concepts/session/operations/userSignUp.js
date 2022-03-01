import { createLogic } from 'redux-logic';
import assignFormErrors from 'utils/form/assignFormErrors';
import { USER_SIGNUP } from 'state/concepts/session/types';
import { userRegistrationRoute } from 'lib/apiRoutes';
import { userCreateSession } from 'state/concepts/session/actions';

const userSignUpOperation = createLogic({
  type: USER_SIGNUP,
  latest: true,

  async process({ action, httpClient }, dispatch, done) {
    const { values, form } = action;

    try {
      const params = {
        email: values.email,
        password: values.password,
        phone_number: values.phoneNumber,
        user: {
          first_name: values.firstName,
          last_name: values.lastName,
        },
      };

      const { data } = await httpClient.post(userRegistrationRoute, params);

      dispatch(userCreateSession(data, false, action.values.redirectRoute));
    } catch (error) {
      assignFormErrors(form, error);
    }

    form.setSubmitting(false);
    done();
  },
});

export default userSignUpOperation;
