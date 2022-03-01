import { createLogic } from 'redux-logic';
import assignFormErrors from 'utils/form/assignFormErrors';
import { USER_LOGIN } from 'state/concepts/session/types';
import { userSessionRoute } from 'lib/apiRoutes';
import { userCreateSession } from 'state/concepts/session/actions';

const userLoginOperation = createLogic({
  type: USER_LOGIN,
  latest: true,

  async process({ action: { values, form, redirectRoute }, httpClient }, dispatch, done) {
    try {
      const params = {
        email: values.email,
        password: values.password,
      };

      const { data } = await httpClient.post(userSessionRoute, params);

      dispatch(userCreateSession(data, false, redirectRoute));
    } catch (error) {
      assignFormErrors(form, error);
    }

    form.setSubmitting(false);
    done();
  },
});

export default userLoginOperation;
