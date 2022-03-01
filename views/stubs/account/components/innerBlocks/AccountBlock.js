import { Alert, Button, notification } from 'antd';
import MainBtnGradient from '../../../shared/buttons/MainBtnGradient';

const openNotificationWithIcon = type => {
  notification[type]({
    message: 'Your email has been changed',
    duration: 0,
    className: 'notification--success',
    icon: <i className="icon icon-checked in-green-1000" />,
    getContainer: () => document.getElementById('main-account-wrap'),
  });
};

const AccountBlock = () => (
  <>
    <div className="mb-24 text-headline">
      Account
    </div>
    <div className="main-account-card">
      <div className="text-subheader mb-8">
        Email
      </div>
      <p>
        Your current email:
        <span className="in-black font-600">rodney.harmon@gmail.com</span>
      </p>
      <Alert
        className="mt-16 mb-0"
        type="warning"
        showIcon
        icon={<i className="icon icon-alert" />}
        message={(
          <>
            <div className="mb-8">
              We sent an email to confirm your new email address:
              <span className="in-black">rodney_harmon@gmail.com</span>
              . We will continue to use your old address:
              <span className="in-black">rodney_harmon@gmail.com</span>
              , until you confirm the changes.
            </div>
            <Button
              className="border-none"
              size="small"
            >
              Resend email
            </Button>
          </>
        )}
      />
      <MainBtnGradient
        size="large"
        text="Change email"
        className="min-w-160 mt-24"
        onClick={() => openNotificationWithIcon('success')}
      />
    </div>
    <div className="main-account-card">
      <div className="text-subheader mb-8">
        Password
      </div>
      <p className="mb-24">
        Change the password you use to login to rodney.harmon@gmail.com.
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
          Restore password
        </Button>
      </div>
    </div>
    <div className="main-account-card">
      <div className="text-subheader mb-8">
        Deactivate account
      </div>
      {/* If block without alert, than p has mb-=24 instead mb-16 */}
      <p className="mb-24">
        When deactivated your account is no longer visible on the platform.
        You can activate your account at any time.
      </p>
      <Button
        className="min-w-160"
        type="delete"
        size="large"
      >
        Deactivate account
      </Button>
    </div>
  </>
);

export default AccountBlock;
