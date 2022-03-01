const nameArr = ['Photos & Damage', 'Renter Walkthrough', 'Final Condition Check', 'Renter Responsibilities', 'Sign Departure Agreement'];

const Sidebar = () => (
  <aside className="main-listing-sidebar main-listing-sidebar--key">
    <div className="main-listing-sidebar__close">
      <i className="icon icon-cross" />
    </div>
    <div>
      <div className="main-listing-sidebar__title">
        Key Exchange
      </div>
      <div className="d-none d-lg-block">
        {/* Please, add to active element class "main-listing-sidebar__item--active" */}
        {nameArr.map((item, index) => (
          <div className="main-listing-sidebar__item">
            <div className="main-listing-sidebar__item-numb">
              {index + 1}
            </div>
            {item}
          </div>
        ))}
      </div>
      <div className="d-flex d-lg-none align-items-center">
        <span className="mr-4 font-600">
          Step 1
        </span>
        <span>
          of 5 - Personal Information
        </span>
      </div>
    </div>
  </aside>
);

export default Sidebar;
