import { Button } from 'antd';

import { FormattedMessage } from 'react-intl';
import BtnGradient from 'views/shared/BtnGradient';

const unBlockDatesPopoverContent = ({
  unBlockReject,
  unBlockConfirm,
}) => (
  <div>
    <div className="d-flex align-items-center">
      <i className="icon icon-alert font-18 in-yellow-1000 mr-4" />
      <span className="text-caption">
        <FormattedMessage id="calendar.unblockDates.question" />
      </span>
    </div>
    <div className="d-flex justify-content-flex-end mt-16">
      <Button
        className="mr-8"
        type="text"
        size="small"
        onClick={unBlockReject}
      >
        <FormattedMessage id="shared.no" />
      </Button>
      <BtnGradient
        text={<FormattedMessage id="shared.yes" />}
        size="small"
        onClick={unBlockConfirm}
      />
    </div>
  </div>
);

export default unBlockDatesPopoverContent;
