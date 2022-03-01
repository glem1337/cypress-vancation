import { Button } from 'antd';
import MainBtnGradient from '../../../../shared/buttons/MainBtnGradient';

const SlideOutFooter = () => (
  <div className="calendar-listing__side-slideout__footer">
    <Button type="text" size="large">
      Discard
    </Button>
    <MainBtnGradient className="min-w-140 ml-16" text="Save" size="large" />
  </div>
);

export default SlideOutFooter;
