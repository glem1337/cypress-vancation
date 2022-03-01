import React from 'react';
import { connect } from 'react-redux';

import { fetchSelf } from 'state/concepts/users/actions';
import { currentUserSelector } from 'state/concepts/session/selectors';
import authenticate from 'lib/authenticate';
import UserLayoutComponent from './component';

class UserLayout extends React.PureComponent {
  static getInitialProps = (ctx) => {
    // checking auth cookie existance, and access level ('user' here) in auth metadata cookie
    // metadata cookie could be edited, but it would fail fetching or
    // updating data on due to token verification on back-end
    if (!authenticate('user', ctx)) return;

    // selecting user from store or fetching if there is no user (on initial app load)
    const user = currentUserSelector(ctx.store.getState());

    if (!user) {
      ctx.store.dispatch(fetchSelf(ctx.res));
    }
  };

  state = { sidebarVisible: false };

  toggleSidebar = () => {
    this.setState(prevState => ({ sidebarVisible: !prevState.sidebarVisible }));
  }

  render = () => (
    <UserLayoutComponent
      isSidebarVisible={this.state.sidebarVisible}
      onSidebarToggle={this.toggleSidebar}
      {...this.props}
    />
  );
}

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state),
});

export { UserLayout as UserLayoutContainer };
export default connect(mapStateToProps)(UserLayout);
