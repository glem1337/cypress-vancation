import Header from 'views/stubs/layout/headers/mainHeader/Header';
import AccountTabs from './components/AccountTabs';
import AccountBlock from './components/innerBlocks/AccountBlock';
import ProfileBlock from './components/innerBlocks/ProfileBlock';

const AccountPage = () => (
  <>
    <Header />
    <div className="main-account-wrap" id="main-account-wrap">
      <AccountTabs>
        <div
          label="Profile Information"
          iconClass="icon-profile"
        >
          <div className="main-account__inner-with-footer">
            <ProfileBlock />
          </div>
        </div>
        <div
          label="Account"
          iconClass="icon-account"
        >
          <div>
            <AccountBlock />
          </div>
        </div>
        <div
          label="Notifications Settings"
          iconClass="icon-notifications-settings"
        >
          <div>
            c
          </div>
        </div>
        <div
          label="Payment Settings"
          iconClass="icon-wallet"
        >
          <div>
            d
          </div>
        </div>
      </AccountTabs>
    </div>
  </>
);

export default AccountPage;
