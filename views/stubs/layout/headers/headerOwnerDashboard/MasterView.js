import { Button, Collapse } from 'antd';

const { Panel } = Collapse;

const MasterViews = () => (
  <Collapse className="master-view__menu" ghost>
    <Panel
      header={(
        <div className="d-flex align-items-center">
          <div className="main-dropdown__item-pic-listing">
            <i className="icon icon-file-list in-black" />
          </div>
          <span className="font-600">Master View</span>
          <div className="master-view__menu-arrow">
            <i className="icon icon-down" />
          </div>
        </div>
      )}
      showArrow={false}
      key="1"
    >
      <ul className="master-view__menu-list">
        <li>
          <div className="d-flex align-items-center">
            <div className="main-dropdown__item-pic-listing">
              <i className="icon icon-file-list in-black" />
            </div>
            <span className="font-600">Master View</span>
          </div>
        </li>
        <li>
          <div className="d-flex align-items-center">
            <div
              className="main-dropdown__item-pic-listing"
              style={{
                backgroundImage: 'url("https://bit.ly/2XW8tMw")',
              }}
            />
            <span className="text-clamp">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum
              distinctio eveniet, quidem inventore vel consectetur sint facere
              obcaecati.
            </span>
          </div>
        </li>
        <li>
          <div className="d-flex align-items-center">
            <div
              className="main-dropdown__item-pic-listing"
              style={{
                backgroundImage: 'url("https://bit.ly/2XW8tMw")',
              }}
            />
            <span className="text-clamp">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum
              distinctio eveniet, quidem inventore vel consectetur sint facere
              obcaecati.
            </span>
          </div>
        </li>
        <li>
          <div className="d-flex justify-content-center">
            <Button type="secondary" size="small">
              Show all campers (3)
            </Button>
          </div>
        </li>
      </ul>
    </Panel>
  </Collapse>
);

export default MasterViews;
