import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { CAMPER_STATUS } from 'constants/camper';
import Dropdown from 'views/shared/Dropdown';

const ActionsDropdown = ({
  status,
  onPublish,
  onUnpublish,
  onPreview,
  onRemove,
}) => (
  <Dropdown
    icon={<i className="icon icon-overflow in-gray-500 c-pointer" />}
    placement="bottomRight"
    overlayClassName="min-w-180"
  >
    <div className="main-dropdown-wrap">
      <div className="main-dropdown__body">
        {status === CAMPER_STATUS.UNPUBLISHED && (
          <div
            role="button"
            onClick={onPublish}
            className="main-dropdown__item in-black c-pointer"
          >
            <i className="icon icon-publish in-gray-500 mr-8" />
            <FormattedMessage id="shared.publish" />
          </div>
        )}
        {status === CAMPER_STATUS.PUBLISHED && (
          <div
            role="button"
            onClick={onUnpublish}
            className="main-dropdown__item in-black c-pointer"
          >
            <i className="icon icon-unpublish in-gray-500 mr-8" />
            <FormattedMessage id="shared.unpublish" />
          </div>
        )}
        {status === CAMPER_STATUS.PUBLISHED && (
          <div
            role="button"
            onClick={onPreview}
            className="main-dropdown__item in-black c-pointer"
          >
            <i className="icon icon-eye in-gray-500 mr-8" />
            <FormattedMessage id="shared.preview" />
          </div>
        )}
        <div
          role="button"
          onClick={onRemove}
          className="main-dropdown__item in-black c-pointer"
        >
          <i className="icon icon-delete in-gray-500 mr-8" />
          <FormattedMessage id="shared.remove" />
        </div>
      </div>
    </div>
  </Dropdown>
);

ActionsDropdown.propTypes = {
  status: PropTypes.string.isRequired,
  onPublish: PropTypes.func.isRequired,
  onUnpublish: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default ActionsDropdown;
