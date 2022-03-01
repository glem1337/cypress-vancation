import MainBtnGradient from '../../shared/buttons/MainBtnGradient';

const EmptyBlock = () => (
  <div className="master-view__empty">
    <img className="mb-24" src="/images/Empty.svg" alt="" />
    <p className="mb-24">
      You don’t have any campers yet.
    </p>
    <MainBtnGradient
      className="min-w-160"
      size="large"
      text="List your camper"
    />
  </div>
);

export default EmptyBlock;
