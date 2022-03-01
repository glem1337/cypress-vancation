const CardDetailsPart = () => (
  <>
    <div className="mb-8 text-subtitle font-700 text-truncate">
      Forest River Grey Wolf 2020 Lake Park
    </div>
    <div className="mb-16">
      <p className="text-uppercase">Unique camper in Los Angeles</p>
      <p className="text-uppercase">Ford Econoline 150</p>
    </div>
    <div className="d-flex align-items-center">
      <div>
        <i className="icon icon-bed in-gray-500 mr-12" />
        <span className="mr-4">Sleeps</span>
        <span className="in-black">2</span>
      </div>
      <div className="mr-8 ml-8">
        •
      </div>
      <div>
        <i className="icon icon-seats in-gray-500 mr-12" />
        <span className="mr-4">Seats</span>
        <span className="in-black">2</span>
      </div>
    </div>
  </>
);

export default CardDetailsPart;
