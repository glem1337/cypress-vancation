import { Button, Col, Row, Tag } from 'antd';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { MAX_DESCRIPTION_VISIBLE_SYMBOLS } from 'constants/camperDetails';

import isPresent from 'utils/isPresent';

import TooltipIcon from 'views/shared/TooltipIcon';
import FormattedOrRawMessage from 'views/shared/FormattedOrRawMessage';
import SkeletonText from 'views/shared/SkeletonText';
import LOCATORS from 'constants/locators';

const Specifications = ({
  camper,
  allDescriptionVisible,
  allDetailsVisible,
  toggleDescription,
  toggleDetails,
  description,
  detailsConfig,
  isCamperExist,
}) => {
  if (!isCamperExist || !isPresent(camper.specificationDetail)) {
    return (
      <>
        <div className="skeleton__title w-100" />
        <SkeletonText rows={4} />
      </>
    );
  }

  const { whoBuiltCamper, ...details } = camper.specificationDetail;

  return (
    <>
      <div id="details-overview" className="van-details__info">
        <div className="text-headline mr-16">
          <FormattedMessage id="shared.camperInfo" />
        </div>
        <div className="van-details__info-tag-wrap">
          <Tag className="mr-8" color="default">
            <span className="font-14">
              <span className="in-black">
                <FormattedMessage id="shared.builtBy" />
                :
              </span>
              &nbsp;
              <span className="in-blue-1000 font-600">{whoBuiltCamper}</span>
            </span>
          </Tag>
        </div>
        <p className="van-details__info-numb">
          <FormattedMessage id="shared.rental" />
          {' '}
          #
          {camper.publicId}
        </p>
      </div>
      {isPresent(camper.description) && (
        <div className="mb-24">
          <p className="text-subheader font-400 text-color-gray">
            {description}
          </p>
          {camper.description.length > MAX_DESCRIPTION_VISIBLE_SYMBOLS && (
            <Button
              onClick={toggleDescription}
              size="small"
              className="mt-4 text-subheader font-400 text-color-gray h-auto p-0"
              type="simple-text"
            >
              <span>
                <FormattedMessage
                  id={allDescriptionVisible ? 'shared.hide' : 'shared.readMore'}
                />
              </span>
            </Button>
          )}
        </div>
      )}
      <div className="mb-24 mb-md-40">
        <p className="text-subheader mb-16 font-700">
          <FormattedMessage id="shared.details" />
        </p>
        <Row data-targetId="camper-info-list" gutter={24}>
          {detailsConfig.map((item) => {
            let config = {
              icon: `/images/${item.icon}.svg`,
              value: details[item.id] || 0,
            };

            if (isPresent(item.config)) {
              config = {
                ...item.config[details[item.id]],
              };
            }

            return (
              <Col key={item.id} md={8} xl={6}>
                <div className="van-details__details-card">
                  <div className="van-details__details-card-img">
                    <img src={config.icon} alt="" />
                  </div>
                  <div className="mr-auto">
                    <p>
                      <FormattedMessage {...item.title} />
                    </p>
                    <p
                      className={classNames(
                        'text-subheader font-700',
                        item.classes && item.classes,
                      )}
                    >
                      <FormattedOrRawMessage message={config.value} />
                      {item.dimensions && (
                        <>
                          {' '}
                          <FormattedMessage {...item.dimensions} />
                        </>
                      )}
                    </p>
                  </div>
                  {item.tooltip && (
                    <TooltipIcon
                      phrase={<FormattedMessage {...item.tooltip} />}
                    />
                  )}
                </div>
              </Col>
            );
          })}
        </Row>
        <button
          onClick={toggleDetails}
          type="button"
          className="in-blue-1000 main-link font-600"
          data-targetId={LOCATORS.CAMPER_DETAILS.CAMPER_INFO.BUTTON}
        >
          <FormattedMessage
            id={allDetailsVisible ? 'shared.hide' : 'shared.showAll'}
          />
        </button>
      </div>
    </>
  );
};

Specifications.defaultProps = {
  camper: null,
};

Specifications.propTypes = {
  camper: PropTypes.shape(),
  isCamperExist: PropTypes.bool.isRequired,
  allDescriptionVisible: PropTypes.bool.isRequired,
  allDetailsVisible: PropTypes.bool.isRequired,
  toggleDescription: PropTypes.func.isRequired,
  toggleDetails: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  detailsConfig: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Specifications;
