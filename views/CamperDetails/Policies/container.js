import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as R from 'ramda';

import {
  CANCELLATION_POLICY_DESCRIPTION_BY_VALUE,
  POLICIES_FORM_VALUES,
} from 'constants/camper';

import withIntersectionObserver from 'utils/hocs/withIntersectionObserver';

import { loadingSelector } from 'state/data/selectors';
import { fetchCamperPoliciesEndpoint } from 'state/concepts/camper/endpoints';
import { fetchCamperPolicies } from 'state/concepts/camper/actions';
import {
  camperSelector,
  isCamperExistSelector,
} from 'state/concepts/camper/selectors';

import PoliciesComponent from './component';

class Policies extends React.Component {
  static defaultProps = {
    isVisible: undefined,
    camper: null,
  };

  static propTypes = {
    isVisible: PropTypes.bool,
    fetchPolicies: PropTypes.func.isRequired,
    camperId: PropTypes.string.isRequired,
    isCamperExist: PropTypes.bool.isRequired,
    camper: PropTypes.shape(),
  };

  constructor(props) {
    super(props);

    this.state = {
      initialized: false,
    };
  }

  componentDidUpdate() {
    const { isVisible, fetchPolicies, camperId, isCamperExist } = this.props;
    const { initialized } = this.state;

    if (isVisible && !initialized && isCamperExist) {
      fetchPolicies(camperId);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        initialized: true,
      });
    }
  }

  get cancellationPolicy() {
    const { camper } = this.props;

    const key = R.pathOr(
      POLICIES_FORM_VALUES.EASY_GOING,
      ['camperRule', 'cancellationPolicy'],
      camper,
    );

    return CANCELLATION_POLICY_DESCRIPTION_BY_VALUE[key];
  }

  render() {
    return (
      <PoliciesComponent
        {...this.state}
        {...this.props}
        cancellationPolicy={this.cancellationPolicy}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isLoading: loadingSelector(
    state,
    fetchCamperPoliciesEndpoint(ownProps?.camperId).endpoint,
  ),
  camper: camperSelector(state, ownProps?.camperId),
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
});

const mapDispatchToProps = {
  fetchPolicies: fetchCamperPolicies,
};

export { Policies as PoliciesContainer };
export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withIntersectionObserver(
    {
      isVisible: 0.0,
    },
    { rootMargin: '70% 0px' },
  ),
)(Policies);
