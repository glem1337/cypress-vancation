const GallerySkeleton = () => (
  <div
    id="details-photos"
    className="van-details__images van-details__images--skeleton"
  >
    <div className="van-details__big-img img-scale-hover" />
    <div className="van-details__small-imgs">
      <div className="van-details__small-img img-scale-hover" />
      <div className="van-details__small-img img-scale-hover" />
      <div className="van-details__small-img img-scale-hover" />
      <div className="van-details__small-img img-scale-hover" />
    </div>
  </div>
);

export default GallerySkeleton;
