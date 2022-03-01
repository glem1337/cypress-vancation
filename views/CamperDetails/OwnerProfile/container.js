import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { connect } from 'react-redux';

import ROUTES from 'constants/routes';
import {
  MAX_DESCRIPTION_VISIBLE_SYMBOLS,
  RATING_BOUNDARIES,
} from 'constants/camperDetails/owner';

import withIntersectionObserver from 'utils/hocs/withIntersectionObserver';
import redirect from 'utils/redirect';

import { showModal as showModalAction } from 'state/modal/actions';

import { loadingSelector } from 'state/data/selectors';

import { isUserLoggedInSelector } from 'state/concepts/session/selectors';

import { fetchCamperOwner } from 'state/concepts/camper/actions';
import { fetchCamperOwnerEndpoint } from 'state/concepts/camper/endpoints';
import {
  camperSelector,
  isCamperExistSelector,
} from 'state/concepts/camper/selectors';

import OwnerProfileComponent from './component';
import getUserFullName from '../../../utils/getUserFullName';

class OwnerProfile extends React.Component {
  static defaultProps = {
    isVisible: undefined,
    camper: null,
  };

  static propTypes = {
    isVisible: PropTypes.bool,
    fetchOwner: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    camperId: PropTypes.string.isRequired,
    isCamperExist: PropTypes.bool.isRequired,
    isUserLoggedIn: PropTypes.bool.isRequired,
    camper: PropTypes.shape(),
  };

  constructor(props) {
    super(props);

    this.state = {
      initialized: false,
      allDescriptionVisible: false,
    };
  }

  componentDidUpdate() {
    const { isVisible, fetchOwner, camperId, isCamperExist } = this.props;
    const { initialized } = this.state;

    if (isVisible && !initialized && isCamperExist) {
      fetchOwner(camperId);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        initialized: true,
      });
    }
  }

  toggleDescription = () => {
    this.setState((prevState) => ({
      allDescriptionVisible: !prevState.allDescriptionVisible,
    }));
  };

  get description() {
    const { camper } = this.props;
    const { allDescriptionVisible } = this.state;

    const description = R.pathOr('', ['owner', 'description'], camper);

    if (
      allDescriptionVisible
      || description.length <= MAX_DESCRIPTION_VISIBLE_SYMBOLS
    ) {
      return description;
    }

    return `${description.substring(0, MAX_DESCRIPTION_VISIBLE_SYMBOLS)}...`;
  }

  onAskQuestionClickHandler = () => {
    const { isUserLoggedIn, showModal, camperId } = this.props;
    const { businessTitle } = this.owner;

    const placeholder = businessTitle || this.fullName.join(' ');

    if (isUserLoggedIn) {
      showModal({
        modalType: 'ASK_QUESTION_MODAL',
        modalProps: {
          camperId,
          placeholder,
        },
      });

      return;
    }

    redirect(ROUTES.LOGIN.PATH);
  };

  get owner() {
    const { camper } = this.props;

    return R.pathOr({}, ['owner'], camper);
  }

  get fullName() {
    return getUserFullName(['account', 'user'], this.owner);
  }

  get ratingProps() {
    const { averageRating } = this.owner;

    return {
      isHigh: averageRating >= RATING_BOUNDARIES.HIGH,
      isNormal:
        averageRating >= RATING_BOUNDARIES.NORMAL.START
        && averageRating <= RATING_BOUNDARIES.NORMAL.END,
      isMiddle:
        averageRating >= RATING_BOUNDARIES.MIDDLE.START
        && averageRating <= RATING_BOUNDARIES.MIDDLE.END,
      isLow: averageRating <= RATING_BOUNDARIES.LOW,
    };
  }

  render() {
    return (
      <OwnerProfileComponent
        {...this.state}
        {...this.props}
        toggleDescription={this.toggleDescription}
        description={this.description}
        onAskQuestion={this.onAskQuestionClickHandler}
        owner={this.owner}
        fullName={this.fullName}
        ratingProps={this.ratingProps}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isUserLoggedIn: isUserLoggedInSelector(state),
  camper: camperSelector(state, ownProps?.camperId),
  isCamperExist: isCamperExistSelector(state, ownProps?.camperId),
  isLoading: loadingSelector(
    state,
    fetchCamperOwnerEndpoint(ownProps?.camperId).endpoint,
  ),
});

const mapDispatchToProps = {
  fetchOwner: fetchCamperOwner,
  showModal: showModalAction,
};

export { OwnerProfile as OwnerProfileContainer };
export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withIntersectionObserver(
    {
      isVisible: 0.0,
    },
    { rootMargin: '70% 0px' },
  ),
)(OwnerProfile);
