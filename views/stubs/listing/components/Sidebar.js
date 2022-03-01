const nameArr = ['Camper Details', 'Insurance Protection', 'ExternalCalendarsFooter Details', 'Pricing & Policies'];

const Sidebar = () => (
  <aside className="main-listing-sidebar">
    <div className="main-listing-sidebar__close">
      <i className="icon icon-cross" />
    </div>
    <div>
      <div className="main-listing-sidebar__title">
        New Camper
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
    <div className="main-listing-sidebar__footer">
      <div className="main-listing-support-icon">
        <i className="icon icon-question-f in-blue-1000 font-20" />
      </div>
      <div>
        <p className="text-caption mb-4">Need help? Contact support</p>
        <a href="tel:+17667326732" className="font-600 in-white">
          +1 766-732-6732
        </a>
      </div>
    </div>
  </aside>
);

export default Sidebar;
