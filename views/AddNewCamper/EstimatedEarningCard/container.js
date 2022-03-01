import React from 'react';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'ramda';

import {
  estimateEarningDataSelector,
  camperSelector,
  estimateEarningStateSelector,
} from 'state/concepts/camper/selectors';
import { clearEstimateEarningData, setEstimateEarningState } from 'state/concepts/camper/actions';
import EstimatedEarningCardComponent from './component';

class EstimatedEarningCard extends React.PureComponent {
  handlerClose = () => {
    this.props.setEstimateState(false);
  }

  get content() {
    const { estimateEarningData, camper } = this.props;

    if (estimateEarningData) {
      return estimateEarningData;
    }
    if (camper) {
      return {
        estimatedEarning: camper.estimatedEarning,
        iconUrl: camper.vehicleTypeIconUrl,
        name: camper.vehicleTypeName,
      };
    }
    return null;
  }

  componentDidMount() {
    const { clearEstimateData, estimateEarningData } = this.props;

    if (estimateEarningData) {
      clearEstimateData();
    }
  }

  render =() => (
    <EstimatedEarningCardComponent
      {...this.props}
      isVisible={this.props.estimateEarningState}
      handlerClose={this.handlerClose}
      content={this.content}
    />
  );
}

EstimatedEarningCard.defaultProps = {
  estimateEarningData: null,
  camper: null,
  isSlim: false,
};

EstimatedEarningCard.propTypes = {
  router: PropTypes.shape({
    query: PropTypes.shape().isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  estimateEarningData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    estimatedEarning: PropTypes.number.isRequired,
    iconUrl: PropTypes.string,
  }),
  estimateEarningState: PropTypes.bool.isRequired,
  camper: PropTypes.shape({
    estimatedEarning: PropTypes.number.isRequired,
    vehicleTypeIconUrl: PropTypes.string,
    vehicleTypeName: PropTypes.string,
  }),
  isSlim: PropTypes.bool,
  setEstimateState: PropTypes.func.isRequired,
  clearEstimateData: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  camper: camperSelector(state, ownProps?.router.query.camper_id),
  estimateEarningData: estimateEarningDataSelector(state),
  estimateEarningState: estimateEarningStateSelector(state),
});

const mapDispatchToProps = {
  setEstimateState: setEstimateEarningState,
  clearEstimateData: clearEstimateEarningData,
};

export { EstimatedEarningCard as EstimatedEarningCardContainer };
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(EstimatedEarningCard);
