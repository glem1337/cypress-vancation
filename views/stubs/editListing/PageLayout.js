/* eslint-disable react/prop-types */
import { Button } from 'antd';
import classNames from 'classnames';

import Header from 'views/stubs/layout/headers/headerOwnerDashboard/Header';
import LeftSidebar from './components/LeftSidebar';
import LeftSidebarMobile from './components/LeftSidebarMobile';
import MainBtnGradient from '../shared/buttons/MainBtnGradient';

const PageLayout = ({ children, hasFooter }) => (
  <>
    <Header />
    <div className="edit-list-wrap">
      <LeftSidebar />
      <LeftSidebarMobile />
      <div
        className={classNames(
          'edit-list-wrap__inner',
          hasFooter && 'edit-list-wrap__inner--has-footer',
        )}
      >
        {children}
      </div>
      {hasFooter && (
        <div className="main-listing__footer">
          <div className="main-listing__footer-container">
            <Button type="text" size="large" className="mr-16 ml-auto">
              Discard
            </Button>
            <MainBtnGradient size="large" text="Save" className="min-w-140" />
          </div>
        </div>
      )}
    </div>
  </>
);

export default PageLayout;
