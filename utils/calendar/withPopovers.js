import React from 'react';

import getDisplayName from 'utils/getDisplayName';

const withPopovers = (Component) => {
  class WithPopovers extends React.Component {
    static displayName = `withPopovers((${getDisplayName(Component)})`;

    state = {
      isOpened: false,
      isBackPopoverVisible: false,
      isDiscardPopoverVisible: false,
      isSavePopoverVisible: false,
    }

    /**
     * Check opened state.
     */
    checkOpenedState = (prevProps, props) => {
      const { selectedSlots, isSubmitting, isValid } = props;

      if (selectedSlots?.uuid !== prevProps.selectedSlots?.uuid) {
        this.setState({
          isOpened: false,
          isBackPopoverVisible: false,
          isDiscardPopoverVisible: false,
          isSavePopoverVisible: false,
        });
      }

      if (prevProps.isSubmitting && !isSubmitting && isValid) {
        this.setState({
          isOpened: false,
          isBackPopoverVisible: false,
          isDiscardPopoverVisible: false,
          isSavePopoverVisible: false,
        });
      }
    }

    /**
     * Show specific popover.
     */
    showPopover = ({
      popoverName,
    }) => () => {
      this.setState({
        isBackPopoverVisible: false,
        isDiscardPopoverVisible: false,
        isSavePopoverVisible: false,
        [popoverName]: true,
      });
    }

    /**
     * Show specific popover or go back.
     */
    showPopoverOrBack = ({
      popoverName,
      props,
    }) => () => {
      const { dirty, isValid, resetForm } = props;

      if (dirty && isValid) {
        this.setState({
          isBackPopoverVisible: false,
          isDiscardPopoverVisible: false,
          isSavePopoverVisible: false,
          [popoverName]: true,
        });
      } else {
        this.setState({
          isOpened: false,
          isBackPopoverVisible: false,
          isDiscardPopoverVisible: false,
          isSavePopoverVisible: false,
        });

        resetForm();
      }
    }

    /**
     * Close popover.
     */
    closePopover = ({ popoverName }) => () => {
      this.setState({ [popoverName]: false });
    }

    /**
     * Close all popovers.
     */
    closeAllPopovers = () => {
      this.setState({
        isBackPopoverVisible: false,
        isDiscardPopoverVisible: false,
        isSavePopoverVisible: false,
      });
    }

    /**
     * Close popovers and go back.
     */
    closePopoversAndBack = ({ props }) => () => {
      const { resetForm } = props;

      this.setState({
        isOpened: false,
        isBackPopoverVisible: false,
        isDiscardPopoverVisible: false,
        isSavePopoverVisible: false,
      });

      resetForm();
    }

    /**
     * Close popovers and save.
     */
    closePopoversAndSave = ({ props }) => () => {
      const { submitForm } = props;

      this.setState({
        isBackPopoverVisible: false,
        isDiscardPopoverVisible: false,
        isSavePopoverVisible: false,
      });

      submitForm();
    }

    /**
     * Toggle opened state.
     */
    toggleOpenedState = () => {
      const { isOpened } = this.state;

      this.setState({ isOpened: !isOpened });
    }

    /**
     * Lifecycle method.
     */
    render() {
      return (
        <Component
          {...this.props}
          {...this.state}
          showPopoverOrBack={this.showPopoverOrBack}
          closePopover={this.closePopover}
          showPopover={this.showPopover}
          closePopoversAndBack={this.closePopoversAndBack}
          closePopoversAndSave={this.closePopoversAndSave}
          toggleOpenedState={this.toggleOpenedState}
          checkOpenedState={this.checkOpenedState}
          closeAllPopovers={this.closeAllPopovers}
        />
      );
    }
  }

  return WithPopovers;
};

export default withPopovers;
