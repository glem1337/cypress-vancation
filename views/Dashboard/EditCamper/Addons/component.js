import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
 Col, Row, Form, Divider, Skeleton,
} from 'antd';

import EditCamperLayout from 'views/layouts/EditCamper';
import SuggestedAddons from './SuggestedAddons';
import CustomAddons from './CustomAddons';

const Addons = ({
  isCamperExist,
  isValid,
  isLoading,
  handleSubmit,
  onAddCustomAddon,
  onRemoveCustomAddon,
  leavePagePrepare,
  values: { addons, customAddons },
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
          <Col lg={16}>
            <h1 className="text-headline mb-8">
              <FormattedMessage id="shared.addons" />
            </h1>
            <p className="mb-24 text-color-gray">
              <FormattedMessage id="dashboard.editCamper.addons.description" />
            </p>
            <div className="mb-24 text-subheader font-700">
              <FormattedMessage id="dashboard.editCamper.addons.suggested.title" />
            </div>
          </Col>
          {isCamperExist ? (
            <>
              <Col span={24}>
                <Row>
                  <SuggestedAddons items={addons} />
                </Row>
              </Col>
              <Divider />
              <Col span={24}>
                <CustomAddons
                  items={customAddons}
                  onAdd={onAddCustomAddon}
                  onRemove={onRemoveCustomAddon}
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

Addons.defaultProps = {
  isLoading: false,
};

Addons.propTypes = {
  isValid: PropTypes.bool.isRequired,
  isCamperExist: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  onAddCustomAddon: PropTypes.func.isRequired,
  onRemoveCustomAddon: PropTypes.func.isRequired,
  values: PropTypes.shape().isRequired,
  leavePagePrepare: PropTypes.func.isRequired,
};

export default Addons;
