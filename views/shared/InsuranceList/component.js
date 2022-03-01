import { FormattedMessage } from 'react-intl';
import { Tooltip } from 'antd';

const InsuranceList = () => (
  <ul>
    <li className="main-listing__insurance-item">
      <img src="/images/listing/insurance/Insurance_Coverage.svg" alt="" />
      <div className="ml-12">
        <FormattedMessage id="addNewCamper.insurance.package.first" />
      </div>
    </li>
    <li className="main-listing__insurance-item">
      <img src="/images/listing/insurance/Damage_Protection.svg" alt="" />
      <div className="ml-12">
        <FormattedMessage id="addNewCamper.insurance.package.second" />
        <Tooltip
          title={
            <FormattedMessage id="addNewCamper.insurance.package.secondItemTooltip" />
          }
        >
          <i className="icon icon-info-f main-tooltip-icon font-18" />
        </Tooltip>
      </div>
    </li>
    <li className="main-listing__insurance-item">
      <img src="/images/listing/insurance/Interior_Damage.svg" alt="" />
      <div className="ml-12">
        <FormattedMessage id="addNewCamper.insurance.package.third" />
      </div>
    </li>
    <li className="main-listing__insurance-item">
      <img src="/images/listing/insurance/Exterior_Damage.svg" alt="" />
      <div className="ml-12">
        <FormattedMessage id="addNewCamper.insurance.package.fourth" />
      </div>
    </li>
    <li className="main-listing__insurance-item">
      <img src="/images/listing/insurance/Roadside_Assistance.svg" alt="" />
      <div className="ml-12">
        <FormattedMessage id="addNewCamper.insurance.package.fifth" />
      </div>
    </li>
    <li className="main-listing__insurance-item">
      <img src="/images/listing/insurance/Support.svg" alt="" />
      <div className="ml-12">
        <FormattedMessage id="addNewCamper.insurance.package.six" />
      </div>
    </li>
  </ul>
);

export default InsuranceList;
