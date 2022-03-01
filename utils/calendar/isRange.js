function isRange() {
  const { selectedSlots } = this.props;

  if (selectedSlots?.slots?.length === 1) {
    return false;
  }

  return true;
}

export default isRange;
