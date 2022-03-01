import {
  Row,
  Col,
  Input,
  Button,
  Tag,
  Select,
  // Avatar,
} from 'antd';
import PhoneDropdown from '../../../shared/dropdowns/PhoneDropdown';
import MainBtnGradient from '../../../shared/buttons/MainBtnGradient';
import AvatarUpload from '../AvatarUpload';

const { Option } = Select;

const ProfileBlock = () => (
  <>
    <div className="mb-24 text-headline">
      Profile information
    </div>
    <div className="main-account-card">
      <div className="text-subheader mb-16">
        Profile photo
      </div>
      <div className="d-flex flex-column flex-md-row">
        <AvatarUpload />
        {/* When avatar is upload change AvatarUpload to Avatar component */}
        {/*
        <Avatar
          className="main-account__profile-img"
          size={120}
          src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d29tYW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
        />
        */}
        <div>
          <div className="d-flex align-items-center justify-content-center d-md-block mb-16">
            <Button
              className="mr-16"
              type="secondary"
              size="small"
            >
              Change photo
            </Button>
            <Button
              type="delete"
              size="small"
            >
              Remove
            </Button>
          </div>
          <p className="mb-24">
            Please upload a profile picture where your face is clearly visible.
            Sharing a clear image of yourself helps
            build trust within the Vancation Community.
          </p>
          <p>
            Image format: JPG or PNG. Max size: 10 Mb.
          </p>
        </div>
      </div>
    </div>
    <div className="main-account-card">
      <div className="text-subheader mb-16">
        Personal information
      </div>
      <Row gutter={24}>
        <Col md={12}>
          <div>
            <label className="main-input__label" htmlFor="first-name">
              First name
            </label>
            <Input type="text" id="first-name" />
          </div>
        </Col>
        <Col md={12}>
          <div>
            <label className="main-input__label" htmlFor="last-name">
              Last name
            </label>
            <Input type="text" id="last-name" />
          </div>
        </Col>
      </Row>
      <div className="mb-8 in-black font-600">
        Date of birth
      </div>
      <Row gutter={24}>
        <Col md={12}>
          <div className="d-flex align-items-center">
            <div className="flex-grow-1 mb-16">
              <label className="main-input__label" htmlFor="Month">
                Month
              </label>
              <Select
                id="Month"
                name="Month"
                className="main-input__field"
                optionLabelProp="label"
                placeholder="Select"
              >
                <Option className="p-0" value="select1" label="1">
                  <li className="main-dropdown__item">December</li>
                </Option>
                <Option className="p-0" value="select2" label="2">
                  <li className="main-dropdown__item">January</li>
                </Option>
              </Select>
            </div>
            <div className="main-account__day-input">
              <label className="main-input__label" htmlFor="Day">
                Day
              </label>
              <Input type="number" id="Day" />
            </div>
            <div className="w-80">
              <label className="main-input__label" htmlFor="Year">
                Year
              </label>
              <Input type="number" id="Year" />
            </div>
          </div>
        </Col>
      </Row>
      <div>
        <label className="main-input__label" htmlFor="Listing">
          About me
        </label>
        <div className="main-input-textarea-wrap">
          <Input.TextArea
            rows={4}
            placeholder="Add a short bio. How did you get into camping, what is your favorite campervan story?"
          />
        </div>
      </div>
    </div>
    <div className="main-account-card">
      <div className="text-subheader mb-16">
        Contact information
      </div>
      <Row gutter={24}>
        <Col md={12}>
          <div className="d-flex align-items-center">
            <PhoneDropdown />
            <Input
              placeholder="1234567890"
              className="w-100 main-input__field--no-label"
            />
          </div>
        </Col>
      </Row>
    </div>
    <div className="main-account-card">
      <div className="text-subheader mb-8">
        Electronic signature
      </div>
      <p className="mb-24">
        Please create your electronic signature to sign documents on Vancation.
      </p>
      {/* Add this code if signature not created
      <p className="mb-24">
        Your electronic signature to sign documents on Vancation.
      </p>
      <MainBtnGradient
        className="min-w-160"
        text="Create signature"
        size="large"
      />
       */}
      <div className="main-account__signature-wrap">
        asd
      </div>
      <div>
        <Button
          className="mr-16"
          type="secondary"
          size="small"
        >
          Change signature
        </Button>
        <Button
          type="delete"
          size="small"
        >
          Remove
        </Button>
      </div>
    </div>
    <div className="main-account-card">
      <div className="d-flex align-items-center mb-8">
        <div className="text-subheader">
          Driver’s License
        </div>
        <Tag
          className="ml-8"
          color="processing"
        >
          Not verified
        </Tag>
        <Tag
          color="success"
          icon={<i className="icon icon-activate-f mr-4 in-green-1000 font-16" />}
        >
          Verified
        </Tag>
      </div>
      <p>
        You will verify the driver’s license after the first booking.
      </p>
      <p>
        Your driver’s license was changed? Contact support.
      </p>
    </div>
    <div className="main-listing__footer w-100">
      <div className="container w-100 text-align-right">
        <Button
          className="mr-16"
          size="large"
          type="text"
        >
          Discard
        </Button>
        <MainBtnGradient
          className="min-w-140"
          size="large"
          disabled
          text="Save"
        />
      </div>
    </div>
  </>
);

export default ProfileBlock;
