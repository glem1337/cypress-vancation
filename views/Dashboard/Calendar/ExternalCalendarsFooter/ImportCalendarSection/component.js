import PropTypes from 'prop-types';

import Button from 'views/shared/Button';
import ImportList from './ImportList';

const ImportCalendarSection = ({ onShowImportModal, camperId }) => (
  <>
    <ImportList camperId={camperId} />
    <Button
      onClick={onShowImportModal}
      text={{ id: 'calendar.import.btn' }}
      type="secondary"
    />
  </>
);

ImportCalendarSection.propTypes = {
  onShowImportModal: PropTypes.func.isRequired,
  camperId: PropTypes.string.isRequired,
};

export default ImportCalendarSection;
