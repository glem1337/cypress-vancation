import { Button } from 'antd';
import MainBtnGradient from 'views/stubs/shared/buttons/MainBtnGradient';
import PropTypes from 'prop-types';
import { pathOr } from 'ramda';
import { FormattedMessage } from 'react-intl';
import AlertEmail from './AlertEmail';

const AccountComponent = ({
  currentUser,
  showAlertNewPassword,
}) => {
  const email = pathOr('', ['email'], currentUser);
  const emailVerified = pathOr(false, ['emailVerified'], currentUser);

  return (
    <>
      <div className="mb-24 text-headline">
        <FormattedMessage id="settingAccount.title" />
      </div>
      <div className="main-account-card">
        <div className="text-subheader mb-8">
          <FormattedMessage id="settingAccount.email" />
        </div>
        <p>
          <FormattedMessage id="settingAccount.currentEmail" />
          <span className="in-black font-600">{email}</span>
        </p>
        {
          !emailVerified && (
            <AlertEmail>
              <div className="mb-8">
                <FormattedMessage id="settingAccount.emailIsNotConfirmed" />
              </div>
              <Button
                className="border-none"
                size="small"
              >
                <FormattedMessage id="settingAccount.ResendEmail" />
              </Button>
            </AlertEmail>
          )
        }
        {
          showAlertNewPassword && (
            <AlertEmail>
              <div className="mb-8">
                <FormattedMessage id="settingAccount.newEmailAddress" />
                { /* TODO - there will be a dynamic email from state */}
                <span className="in-black">rodney_harmon@gmail.com</span>
                <FormattedMessage id="settingAccount.yourOldAddress" />
                <span className="in-black">{email}</span>
                <FormattedMessage id="settingAccount.confirmTheChanges" />
              </div>
              <Button
                className="border-none"
                size="small"
              >
                <FormattedMessage id="settingAccount.ResendEmail" />
              </Button>
            </AlertEmail>
          )
        }
        <MainBtnGradient
          size="large"
          text="Change email"
          className="min-w-160 mt-24"
        />
      </div>
      <div className="main-account-card">
        <div className="text-subheader mb-8">
          <FormattedMessage id="settingAccount.password" />
        </div>
        <p className="mb-24">
          <FormattedMessage id="settingAccount.changeThePassword" />
        </p>
        <div>
          <MainBtnGradient
            size="large"
            text="Change password"
            className="min-w-160 mr-16 mb-16 mb-md-0"
          />
          <Button
            type="secondary"
            size="large"
            className="min-w-160"
          >
            <FormattedMessage id="settingAccount.restorePassword" />
          </Button>
        </div>
      </div>
      {/* TODO - deactivate account (For now, it must be hidden) :start */}
      {/* <div className="main-account-card"> */}
      {/*  <div className="text-subheader mb-8"> */}
      {/*    <FormattedMessage id="settingAccount.deactivateAccount" /> */}
      {/*  </div> */}
      {/*  <p className="mb-24"> */}
      {/*    <FormattedMessage id="settingAccount.whenDeactivatedYourAccount" /> */}
      {/*  </p> */}
      {/*  <Button */}
      {/*    className="min-w-160" */}
      {/*    type="delete" */}
      {/*    size="large" */}
      {/*  > */}
      {/*    <FormattedMessage id="settingAccount.deactivateAccount" /> */}
      {/*  </Button> */}
      {/* </div> */}
      {/* TODO - deactivate account :end */}
    </>
  );
};

AccountComponent.defaultProps = {
  currentUser: null,
};

AccountComponent.propTypes = {
  showAlertNewPassword: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    user: PropTypes.shape({
      lastName: PropTypes.string,
      firstName: PropTypes.string,
      avatarUrl: PropTypes.string,
      emailVerified: PropTypes.bool,
    }),
  }),
};

export default AccountComponent;
