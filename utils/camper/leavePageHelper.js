export function leavePage(withSaving, redirectRoute) {
  return async () => {
    const {
      hideModal,
      handleSubmit,
      setFieldValue,
      router,
    } = this.props;

    if (withSaving) {
      await setFieldValue('redirectRoute', redirectRoute);

      handleSubmit();
    } else {
      router.push(redirectRoute);
    }

    hideModal();
  };
}

export async function leavePagePrepare(redirectRoute) {
  await this.props.validateForm();

  const {
    dirty,
    showModal,
    isValid,
    router,
  } = this.props;

  if (dirty && isValid) {
    showModal({
      modalType: 'LEAVE_PAGE_MODAL',
      modalProps: {
        discard: this.leavePage(false, redirectRoute),
        save: this.leavePage(true, redirectRoute),
      },
    });

    return;
  }

  router.push(redirectRoute);
}

export function leavePageCondition(prevProps) {
  const { isSidebarVisible } = this.props;

  if (prevProps.isSidebarVisible && !isSidebarVisible) {
    this.leavePagePrepare();
  }
}
