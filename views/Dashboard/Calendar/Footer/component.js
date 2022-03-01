import React from 'react';
import { Button, Popover } from 'antd';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import BtnGradient from 'views/shared/BtnGradient';
import discardPopoverContent from 'utils/calendar/discardPopoverContent';
import savePopoverContent from 'utils/calendar/savePopoverContent';

const FooterComponent = ({
  discardPrepare,
  discardConfirm,
  discardReject,
  submit,
  submitBtnText,
  isLoading,
  isDiscardPopoverVisible,
  isSavePopoverVisible,
  withSavePopover,
  withSavePopoverWarning,
  saveReject,
  savePrepare,
}) => (
  <div className="calendar-listing__side-slideout__footer">
    <Popover
      visible={isDiscardPopoverVisible}
      content={discardPopoverContent({
        discardReject,
        discardConfirm,
      })}
      trigger="click"
      getPopupContainer={() => document.querySelector('.calendar-listing__side')}
    >
      <Button
        type="text"
        size="large"
        onClick={discardPrepare}
      >
        <FormattedMessage id="shared.discard" />
      </Button>
    </Popover>
    {withSavePopover && (
      <Popover
        visible={isSavePopoverVisible}
        content={savePopoverContent({
          saveReject,
          saveConfirm: submit,
          withWarning: withSavePopoverWarning,
        })}
        trigger="click"
        getPopupContainer={() => document.querySelector('.calendar-listing__side')}
      >
        <BtnGradient
          className="min-w-140 ml-16"
          text={<FormattedMessage {...submitBtnText} />}
          size="large"
          onClick={savePrepare}
          disabled={isLoading}
          isLoading={isLoading}
        />
      </Popover>
    )}
    {!withSavePopover && (
      <BtnGradient
        className="min-w-140 ml-16"
        text={<FormattedMessage {...submitBtnText} />}
        size="large"
        onClick={submit}
        disabled={isLoading}
        isLoading={isLoading}
      />
    )}
  </div>
);

FooterComponent.propTypes = {
  discardPrepare: PropTypes.func,
  discardConfirm: PropTypes.func,
  discardReject: PropTypes.func,
  submit: PropTypes.func,
  submitBtnText: PropTypes.shape(),
  isLoading: PropTypes.bool,
  canSubmit: PropTypes.bool,
  isDiscardPopoverVisible: PropTypes.bool,
  isSavePopoverVisible: PropTypes.bool,
  withSavePopover: PropTypes.bool,
  withSavePopoverWarning: PropTypes.bool,
  savePrepare: PropTypes.func,
  saveReject: PropTypes.func,
};

FooterComponent.defaultProps = {
  discardPrepare: undefined,
  discardConfirm: undefined,
  discardReject: undefined,
  submit: undefined,
  submitBtnText: { id: 'shared.ok' },
  isLoading: false,
  canSubmit: true,
  isDiscardPopoverVisible: false,
  isSavePopoverVisible: false,
  withSavePopover: false,
  withSavePopoverWarning: false,
  savePrepare: undefined,
  saveReject: undefined,
};

export default FooterComponent;
