/* eslint-disable react/prop-types */
import { Button } from 'antd';
import LeftSidebar from './components/LeftSidebar';
import LeftSidebarMobile from './components/LeftSidebarMobile';
import MainBtnGradient from '../shared/buttons/MainBtnGradient';

const LayoutEditDeparture = ({ children }) => (
  <div className="main-wrap">
    <LeftSidebar />
    <LeftSidebarMobile />
    <div className="main-listing main-listing--edit-agree container mt-8">
      <div className="main-listing-container">
        {children}
      </div>
      <div className="main-listing__footer">
        <div className="main-listing__footer-container">
          <Button
            type="text"
            className="ml-auto"
            size="large"
          >
            Discard
          </Button>
          <MainBtnGradient
            className="min-w-140 ml-16"
            text="Save"
            size="large"
          />
        </div>
      </div>
    </div>
  </div>
);

export default LayoutEditDeparture;
