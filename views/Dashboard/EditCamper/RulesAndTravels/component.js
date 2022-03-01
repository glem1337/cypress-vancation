import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
 Col, Divider, Form, Row, Skeleton,
} from 'antd';

import {
  CUSTOM_RESTRICTION_KEYS,
  ROADS_CONFIG,
  RULES_CONFIG,
  TRAVELS_CONFIG,
} from 'constants/dashboardRulesAndTravels';

import EditCamperLayout from 'views/layouts/EditCamper';
import CustomRules from './CustomRules';
import Rules from './Rules';

const RulesAndTravels = ({
  isCamperExist,
  isLoading,
  isValid,
  handleSubmit,
  onAddCustomRule,
  onRemoveCustomRule,
  leavePagePrepare,
  values: {
    customRestrictionRules,
    customTravelRestrictions,
    customRestrictionRoads,
  },
}) => (
  <EditCamperLayout
    hasFooter
    canSave={isValid && !isLoading}
    onSave={handleSubmit}
    isLoading={isLoading}
    leavePageMethod={leavePagePrepare}
  >
    <div className="container">
      <Form layout="vertical">
        <Row>
          <Col span={24}>
            <h1 className="text-headline mb-8">
              <FormattedMessage id="dashboard.editCamper.rulesAndTravels.rules.title" />
            </h1>
            <p className="mb-24 text-color-gray">
              <FormattedMessage id="dashboard.editCamper.rulesAndTravels.rules.description" />
            </p>
          </Col>
          {isCamperExist ? (
            <>
              <Col span={24}>
                <Rules config={RULES_CONFIG} />
              </Col>
              <Divider />
              <Col span={24}>
                <CustomRules
                  keyProp={CUSTOM_RESTRICTION_KEYS.RULES}
                  items={customRestrictionRules}
                  onAdd={onAddCustomRule}
                  onRemove={onRemoveCustomRule}
                  title={{
                    id: 'dashboard.editCamper.rulesAndTravels.customRules.title',
                  }}
                  label={{
                    id: 'dashboard.editCamper.rulesAndTravels.customRules.label',
                  }}
                  btnText={{
                    id: 'dashboard.editCamper.rulesAndTravels.customRules.btn',
                  }}
                />
              </Col>
              <Divider />
              <Col span={24}>
                <Rules config={TRAVELS_CONFIG}>
                  <h1 className="text-headline mb-8">
                    <FormattedMessage id="dashboard.editCamper.rulesAndTravels.travels.title" />
                  </h1>
                  <p className="mb-24 text-color-gray">
                    <FormattedMessage id="dashboard.editCamper.rulesAndTravels.travels.description" />
                  </p>
                  <div className="mb-24 text-subtitle">
                    <FormattedMessage id="shared.location" />
                  </div>
                </Rules>
              </Col>
              <Divider />
              <Col span={24}>
                <CustomRules
                  keyProp={CUSTOM_RESTRICTION_KEYS.TRAVELS}
                  items={customTravelRestrictions}
                  onAdd={onAddCustomRule}
                  onRemove={onRemoveCustomRule}
                  title={{
                    id: 'dashboard.editCamper.rulesAndTravels.customTravels.title',
                  }}
                  label={{
                    id: 'dashboard.editCamper.rulesAndTravels.customTravels.label',
                  }}
                  btnText={{
                    id: 'dashboard.editCamper.rulesAndTravels.customTravels.btn',
                  }}
                />
              </Col>
              <Divider />
              <Col span={24}>
                <Rules config={ROADS_CONFIG}>
                  <div className="mb-24 text-subtitle">
                    <FormattedMessage id="dashboard.editCamper.rulesAndTravels.roads.title" />
                  </div>
                </Rules>
              </Col>
              <Divider />
              <Col span={24}>
                <CustomRules
                  keyProp={CUSTOM_RESTRICTION_KEYS.ROADS}
                  items={customRestrictionRoads}
                  onAdd={onAddCustomRule}
                  onRemove={onRemoveCustomRule}
                  title={{
                    id: 'dashboard.editCamper.rulesAndTravels.customRoads.title',
                  }}
                  label={{
                    id: 'dashboard.editCamper.rulesAndTravels.customRoads.label',
                  }}
                  btnText={{
                    id: 'dashboard.editCamper.rulesAndTravels.customRoads.btn',
                  }}
                />
              </Col>
            </>
          ) : (
            <Skeleton active />
          )}
        </Row>
      </Form>
    </div>
  </EditCamperLayout>
);

RulesAndTravels.defaultProps = {
  isLoading: false,
};

RulesAndTravels.propTypes = {
  isLoading: PropTypes.bool,
  isValid: PropTypes.bool.isRequired,
  isCamperExist: PropTypes.bool.isRequired,
  onAddCustomRule: PropTypes.func.isRequired,
  onRemoveCustomRule: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape().isRequired,
  leavePagePrepare: PropTypes.func.isRequired,
};

export default RulesAndTravels;
