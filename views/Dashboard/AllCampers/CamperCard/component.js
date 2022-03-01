import { Tag } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { TAG_BY_STATUS } from 'constants/dashboardAllCampers';
import { INSURANCE_STATUS } from 'constants/camperInsurance';

import ActionsDropdown from './ActionsDropdown';

const CamperCard = ({
  publicId,
  status,
  img,
  insurance,
  rating,
  title,
  description,
  place,
  onEdit,
  onPublish,
  onUnpublish,
  onPreview,
  onRemove,
}) => (
  <div className="master-view-card">
    <div className="master-view-card__header">
      <div className="d-flex align-items-center flex-wrap">
        <p className="mr-16 text-color-gray">
          <FormattedMessage id="shared.id" />
          :
          {publicId}
        </p>
        <div className="d-flex align-items-center mr-16">
          <span className="mr-4 in-black">
            <FormattedMessage id="shared.status" />
            :
          </span>
          <Tag color={TAG_BY_STATUS[status].COLOR} className="mr-0 ml-0">
            <FormattedMessage {...TAG_BY_STATUS[status].TITLE} />
          </Tag>
        </div>
        <div className="d-flex align-items-center mt-16 mt-md-0">
          {insurance === INSURANCE_STATUS.APPROVED && (
            <>
              <span className="mr-8 in-black">
                <FormattedMessage id="shared.insurance" />
                :
              </span>
              <p className="in-black">
                <i className="icon icon-checked mr-8 in-green-1000" />
                <FormattedMessage id="addNewCamper.insurance.package.status.approved" />
              </p>
            </>
          )}
        </div>
      </div>
      <div className="mr-8 ml-auto">
        <ActionsDropdown
          onPreview={onPreview}
          onPublish={onPublish}
          onUnpublish={onUnpublish}
          onRemove={onRemove}
          status={status}
        />
      </div>
    </div>
    <div className="d-flex align-items-center overflow-hidden mr-auto">
      <div
        role="button"
        onClick={onEdit}
        className="master-view-card__img c-pointer"
      >
        {img && <img src={img} alt="" />}
      </div>
      <div className="master-view-card__info">
        <div
          role="button"
          onClick={onEdit}
          className="master-view-card__info-title c-pointer"
          title={title}
        >
          {title}
        </div>
        <div
          role="button"
          onClick={onEdit}
          className="master-view-card__info-txt c-pointer text-truncate"
          title={place}
        >
          {place}
        </div>
        <div
          role="button"
          onClick={onEdit}
          className="master-view-card__info-txt c-pointer text-truncate"
          title={description}
        >
          {description}
        </div>
        <div className="master-view-card__info-percent">
          <span className="master-view-card__info-percent-numb">
            <img src="/images/listing/Like-Green.svg" alt="" />
            {rating}
            %
          </span>
          <span className="master-view-card__info-percent-count">(26)</span>
        </div>
      </div>
    </div>
    <div className="master-view-card__id">
      <p>{publicId}</p>
    </div>
    <div className="master-view-card__status">
      <Tag color={TAG_BY_STATUS[status].COLOR} className="mr-0 ml-0">
        <FormattedMessage {...TAG_BY_STATUS[status].TITLE} />
      </Tag>
    </div>
    <div className="master-view-card__insurance">
      {insurance === INSURANCE_STATUS.APPROVED && (
        <p className="in-black">
          <i className="icon icon-checked mr-8 in-green-1000" />
          <FormattedMessage id="addNewCamper.insurance.package.status.approved" />
        </p>
      )}
    </div>
    <div className="master-view-card__options">
      <ActionsDropdown
        onPreview={onPreview}
        onPublish={onPublish}
        onUnpublish={onUnpublish}
        onRemove={onRemove}
        status={status}
      />
    </div>
  </div>
);

CamperCard.defaultProps = {
  insurance: null,
  img: null,
};

CamperCard.propTypes = {
  publicId: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onPublish: PropTypes.func.isRequired,
  onUnpublish: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  img: PropTypes.string,
  insurance: PropTypes.string,
};

export default CamperCard;
