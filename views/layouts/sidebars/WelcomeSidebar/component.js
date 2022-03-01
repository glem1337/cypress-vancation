import { FormattedMessage } from 'react-intl';

import Logo from 'views/shared/Logo';

import {
  FACEBOOK,
  INSTAGRAM,
  PINTEREST,
} from 'constants/social-links';

const WelcomeSidebarComponent = () => (
  <div className="auth-left">
    <div className="auth-left__logo">
      <Logo
        bigLogoClassName="d-xxs-block"
        smallLogoClassName="d-none"
        isLink
        isWhite
      />
    </div>
    <div className="auth-left__txt-wrap">
      <div className="auth-left-title">
        <FormattedMessage id="sidebar.welcome.whereJourneyBegins" />
      </div>
      <p className="auth-left-txt">
        <FormattedMessage id="sidebar.welcome.startYourAdventure" />
      </p>
    </div>
    <div className="mt-auto">
      <p className="auth-left__bottom-txt">
        <FormattedMessage id="sidebar.welcome.currentlyAcceptingFollowers" />
      </p>
      <div className="auth-left__bottom-icon-wrap">
        <a
          href={FACEBOOK}
          className="mr-12 ml-12"
          rel="noreferrer"
          target="_blank"
        >
          <i className="icon icon-facebook" />
        </a>
        <a
          href={INSTAGRAM}
          className="mr-12 ml-12"
          rel="noreferrer"
          target="_blank"
        >
          <i className="icon icon-instagram" />
        </a>
        <a
          href={PINTEREST}
          className="mr-12 ml-12"
          rel="noreferrer"
          target="_blank"
        >
          <i className="icon icon-pinterest" />
        </a>
      </div>
    </div>
  </div>
);

export default WelcomeSidebarComponent;
