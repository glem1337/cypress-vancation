import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popover } from 'antd';
import { FormattedMessage } from 'react-intl';

import discardPopoverContent from 'utils/calendar/discardPopoverContent';

const BackButton = ({
  isPopoverVisible,
  discardReject,
  discardConfirm,
  discardPrepare,
}) => (
  <Popover
    visible={isPopoverVisible}
    content={discardPopoverContent({
      discardReject,
      discardConfirm,
    })}
    trigger="click"
    getPopupContainer={() => document.querySelector('.calendar-listing__side')}
  >
    <Button
      className="ant-btn-link ant-btn-flat pl-0 pr-0"
      onClick={discardPrepare}
    >
      <i className="icon icon-left-edge" />
      <span>
        <FormattedMessage id="shared.back" />
      </span>
    </Button>
  </Popover>
);

BackButton.propTypes = {
  isPopoverVisible: PropTypes.bool.isRequired,
  discardReject: PropTypes.func.isRequired,
  discardConfirm: PropTypes.func.isRequired,
  discardPrepare: PropTypes.func.isRequired,
};

export default BackButton;
