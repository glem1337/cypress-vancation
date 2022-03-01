/* eslint-disable react/prop-types */
import { Button } from 'antd';
import Sidebar from './components/Sidebar';
import Progress from '../shared/Progress';
import BackBtn from '../shared/buttons/BackBtn';

const LayoutKeyExchange = ({ children, withBackBtn }) => (
  <div className="main-wrap">
    <Sidebar />
    <div className="main-listing main-listing--key container">
      <div className="main-listing-container">
        <div className="mb-16 mb-md-24">
          <Progress />
        </div>
        {children}
      </div>
      <div className="main-listing__footer">
        <div className="main-listing__footer-container">
          {withBackBtn && <BackBtn text="Back" />}
          <Button
            outline
            className="min-w-140 ml-auto"
            size="large"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default LayoutKeyExchange;
