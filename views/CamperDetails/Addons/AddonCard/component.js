import React from 'react';
import { Button, Tag } from 'antd';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { MAX_DESCRIPTION_VISIBLE_SYMBOLS } from 'constants/camperDetails/addons';

const AddonCard = ({
  iconUrl,
  price,
  name,
  priceUnit,
  description,
  visibleDescription,
  allDescriptionVisible,
  toggleDescription,
}) => (
  <div
    className={classNames('van-details__adds-card', {
      'h-auto': allDescriptionVisible,
    })}
  >
    <div className="d-flex align-items-center justify-content-between mb-20">
      {iconUrl && <img src={iconUrl} alt="" />}
      <Tag color="default">{`$${price} ${priceUnit}`}</Tag>
    </div>
    <p className="text-subtitle font-700 mb-8">{name}</p>
    <p>{visibleDescription}</p>
    {description.length > MAX_DESCRIPTION_VISIBLE_SYMBOLS && (
      <Button onClick={toggleDescription} type="simple-text">
        <FormattedMessage
          id={allDescriptionVisible ? 'shared.hide' : 'shared.readMore'}
        />
      </Button>
    )}
  </div>
);

AddonCard.defaultProps = {
  iconUrl: undefined,
};

AddonCard.propTypes = {
  iconUrl: PropTypes.string,
  price: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  priceUnit: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  visibleDescription: PropTypes.string.isRequired,
  allDescriptionVisible: PropTypes.bool.isRequired,
  toggleDescription: PropTypes.func.isRequired,
};

export default AddonCard;
