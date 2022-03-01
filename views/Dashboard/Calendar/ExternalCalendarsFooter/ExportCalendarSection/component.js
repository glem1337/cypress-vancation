import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Button from 'views/shared/Button';

const ExportCalendarSection = ({ onExport, isLoading }) => (
  <>
    <div className="mb-24">
      <p className="mb-24">
        <FormattedMessage id="calendar.export.title" />
      </p>
      <Button
        disabled={isLoading}
        loading={isLoading}
        onClick={onExport}
        text={{ id: 'calendar.export.btn' }}
        type="secondary"
      />
    </div>
    <div>
      <p className="mb-24">
        <FormattedMessage id="calendar.export.description" />
      </p>
    </div>
  </>
);

ExportCalendarSection.defaultProps = {
  isLoading: false,
};

ExportCalendarSection.propTypes = {
  onExport: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default ExportCalendarSection;
