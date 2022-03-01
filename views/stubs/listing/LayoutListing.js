/* eslint-disable react/prop-types */
import Sidebar from './components/Sidebar';
import Progress from '../shared/Progress';
import BackBtn from '../shared/buttons/BackBtn';
import MainBtnGradient from '../shared/buttons/MainBtnGradient';
import StickyHelpButton from '../shared/buttons/StickyHelpButton';

const LayoutListing = ({ children, withBackBtn }) => (
  <div className="main-wrap">
    <Sidebar />
    <div className="main-listing container">
      <div className="main-listing-container">
        <div className="mb-16 mb-md-24">
          <Progress />
        </div>
        {children}
      </div>
      <div className="main-listing__footer">
        <div className="main-listing__footer-container">
          {withBackBtn && <BackBtn text="Back" />}
          <MainBtnGradient
            size="large"
            text="Save and Continue"
            outline
            className="min-w-160 ml-auto"
          />
        </div>
      </div>
    </div>
    <StickyHelpButton className="main-help-btn-fixed--listing" />
  </div>
);

export default LayoutListing;
