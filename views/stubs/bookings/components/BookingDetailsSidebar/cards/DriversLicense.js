import { Tag } from 'antd';
import PropTypes from 'prop-types';
import MainBtnGradient from '../../../../shared/buttons/MainBtnGradient';

const DriversLicense = ({ isVerified }) => (
  <div className="chat-details-sidebar__inner-block d-flex">
    <div className="chat-details-sidebar__icon">
      <img src="/images/booking/booking_details/Drivers_License.svg" alt="" />
    </div>
    <div>
      <div className="d-flex align-items-center justify-content-space-between mb-8">
        <p className="in-black text-subheader font-700">
          Driver’s License
        </p>
        {
          isVerified
            ? (
              <Tag
                color="success"
                icon={<i className="icon icon-activate-f mr-4 in-green-1000 font-16" />}
              >
                Verified
              </Tag>
            ) : (
              <Tag
                color="processing"
              >
                Not verified
              </Tag>
            )
        }
      </div>
      {
        isVerified
          ? (
            <p className="mb-24">
              Your driver’s license has been successfully verified.
            </p>
          ) : (
            <>
              <p className="mb-24">
                Verify your driver’s license. Only verified drivers
                will be covered under our insurance.
              </p>
              <MainBtnGradient
                className="w-100"
                size="large"
                text="Verify driver's license"
              />
            </>
          )
      }
    </div>
  </div>
);

DriversLicense.defaultProps = {
  isVerified: true,
};

DriversLicense.propTypes = {
  isVerified: PropTypes.bool,
};

export default DriversLicense;
