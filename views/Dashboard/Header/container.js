import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userSignOut } from 'state/concepts/session/actions';
import { currentUserSelector } from 'state/concepts/session/selectors';
import { isMobileMenuVisibleSelector } from 'state/concepts/dashboard/selectors';
import {
  setMobileMenuVisibility as setMobileMenuVisibilityAction,
} from 'state/concepts/dashboard/actions';
import { ownerCampersPaginationSelector } from 'state/concepts/camper/selectors';

import HeaderComponent from './component';

class Header extends React.Component {
  setMobileMenuVisibility = (isVisible) => () => {
    this.props.setMobileMenuVisibility(isVisible);

    if (isVisible) {
      document.body.classList.add('scroll-hidden');
    } else {
      document.body.classList.remove('scroll-hidden');
    }
  };

  componentWillUnmount() {
    this.setMobileMenuVisibility(false)();
  }

  componentDidUpdate(prevProps) {
    const { isMobileMenuVisible } = this.props;

    if (prevProps.isMobileMenuVisible !== isMobileMenuVisible) {
      this.setMobileMenuVisibility(isMobileMenuVisible)();
    }
  }

  render() {
    return (
      <HeaderComponent
        {...this.props}
        setMobileMenuVisibility={this.setMobileMenuVisibility}
      />
    );
  }
}

Header.propTypes = {
  isMobileMenuVisible: PropTypes.bool.isRequired,
  setMobileMenuVisibility: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentUser: currentUserSelector(state),
  isMobileMenuVisible: isMobileMenuVisibleSelector(state),
  ownerCampersPagination: ownerCampersPaginationSelector(state),
});

const mapDispatchToProps = {
  signOut: userSignOut,
  setMobileMenuVisibility: setMobileMenuVisibilityAction,
};

export { Header as HeaderContainer };
export default connect(mapStateToProps, mapDispatchToProps)(Header);
