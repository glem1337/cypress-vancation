import { FormattedMessage } from 'react-intl';
import Link from 'next/link';

const UserSidebarComponent = () => (
  <nav className="main-nav">
    <ul className="main-nav__list">
      <li className="main-nav__item">
        <Link href="#">
          <a className="main-nav__item-link">
            <i className="main-nav__item-link-icon icon icon-calendar-o" />
            <span className="main-nav__item-link-name">
              <FormattedMessage id="sidebar.example" />
            </span>
          </a>
        </Link>
      </li>
      <li className="main-nav__item">
        <Link href="#">
          <a className="main-nav__item-link">
            <i className="main-nav__item-link-icon icon icon-group-o" />
            <span className="main-nav__item-link-name">
              <FormattedMessage id="sidebar.example" />
            </span>
          </a>
        </Link>
      </li>
    </ul>
  </nav>
);

export default UserSidebarComponent;
