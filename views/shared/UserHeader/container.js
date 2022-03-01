import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { userSignOut } from 'state/concepts/session/actions';
import { isUserLoggedInSelector, currentUserSelector } from 'state/concepts/session/selectors';
import { isHeaderExpandedSelector } from 'state/concepts/header/selectors';
import { ownerProfileSelector } from 'state/concepts/owner/selectors';
import { fetchOwnerProfile as fetchOwnerProfileAction } from 'state/concepts/owner/actions';

import UserHeaderComponent from './component';

class UserHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accountDropdownVisible: false,
      mobileMenuVisible: false,
      areItemsGrouped: props.groupItems,
    };
  }

  componentDidMount() {
    const { fetchOwnerProfile, isUserLoggedIn } = this.props;

    if (isUserLoggedIn) {
      fetchOwnerProfile();
    }
  }

  toggleAccountDropdown = (visible) => this.setState({ accountDropdownVisible: visible });

  handleMobileMenuOpen = () => this.setState({ mobileMenuVisible: true });

  handleMobileMenuClose = () => this.setState({ mobileMenuVisible: false });

  handlerSignOut = () => this.props.userSignOut();

  setMenuGroupVisibility = (isVisible) => {
    this.setState({ areItemsGrouped: isVisible });
  }

  render = () => (
    <UserHeaderComponent
      {...this.props}
      {...this.state}
      isAccountDropdownVisible={this.state.accountDropdownVisible}
      isMobileMenuVisible={this.state.mobileMenuVisible}
      onAccountDropdownToggle={this.toggleAccountDropdown}
      onMobileMenuOpen={this.handleMobileMenuOpen}
      onMobileMenuClose={this.handleMobileMenuClose}
      handlerSignOut={this.handlerSignOut}
    />
  );
}

UserHeader.propTypes = {
  userSignOut: PropTypes.func.isRequired,
  fetchOwnerProfile: PropTypes.func.isRequired,
  currentUser: PropTypes.shape(),
  isUserLoggedIn: PropTypes.bool.isRequired,
  groupItems: PropTypes.bool,
};

UserHeader.defaultProps = {
  currentUser: null,
  groupItems: false,
};

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state),
  isUserLoggedIn: isUserLoggedInSelector(state),
  isMobileHeaderExpanded: isHeaderExpandedSelector(state),
  ownerProfile: ownerProfileSelector(state),
});

const mapDispatchToProps = {
  userSignOut,
  fetchOwnerProfile: fetchOwnerProfileAction,
};

export { UserHeader as UserHeaderContainer };
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(UserHeader);
