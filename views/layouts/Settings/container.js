import React from 'react';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import authenticate from 'lib/authenticate';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { currentUserSelector } from 'state/concepts/session/selectors';
import { fetchSelf } from 'state/concepts/users/actions';
import { USERS_STATUS } from 'constants';
import SettingLayoutComponent from './component';

// eslint-disable-next-line react/prefer-stateless-function
class Setting extends React.PureComponent {
  static getInitialProps = (ctx) => {
    if (!authenticate(USERS_STATUS.USER, ctx)) return;

    const user = currentUserSelector(ctx.store.getState());

    if (!user) {
      ctx.store.dispatch(fetchSelf(ctx.res));
    }
  };

  get getActive() {
    const { router } = this.props;
    const splitUrl = router.pathname.split('/');

    return splitUrl[splitUrl.length - 1];
  }

  render = () => (
    <SettingLayoutComponent
      active={this.getActive}
      {...this.props}
    />
  );
}

Setting.defaultProps = {
  currentUser: null,
};

Setting.propTypes = {
  router: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    user: PropTypes.shape({
      lastName: PropTypes.string,
      firstName: PropTypes.string,
      avatarUrl: PropTypes.string,
    }),
  }),
};

const mapStateToProps = state => ({
  currentUser: currentUserSelector(state),
});

export { Setting as SettingContainer };
export default compose(
  connect(mapStateToProps),
  withRouter,
)(Setting);
