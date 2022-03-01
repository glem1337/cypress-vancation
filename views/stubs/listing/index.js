import {
  Row,
  Col,
  Input,
  Button,
  Divider,
} from 'antd';
import PhoneDropdown from '../shared/dropdowns/PhoneDropdown';
import PasswordInput from '../shared/inputs/textfield/PasswordInput';
import LayoutListing from './LayoutListing';

const ListingPage = () => (
  <LayoutListing>
    <div className="d-md-flex align-items-flex-start mb-16">
      <div className="mb-16 mb-md-0">
        <h1 className="text-headline mb-8">
          Let’s Get Started
        </h1>
        <p>
          Fill in your personal information.
        </p>
      </div>
      <div className="d-flex align-items-center ml-md-auto">
        <p className="mr-8">
          Already have an account?
        </p>
        <Button
          size="small"
          type="secondary"
        >
          Log in
        </Button>
      </div>
    </div>
    <Row>
      <Col lg={16}>
        <form action="">
          <Row gutter={24}>
            <Col md={12}>
              <div>
                <label className="main-input__label" htmlFor="name">
                  First name
                </label>
                <Input type="email" placeholder="Cory" id="name" />
              </div>
            </Col>
            <Col md={12}>
              <div>
                <label className="main-input__label" htmlFor="lastname">
                  Last name
                </label>
                <Input type="email" placeholder="Hubbard" id="lastname" />
              </div>
            </Col>
            <Col md={12}>
              <div>
                <label className="main-input__label" htmlFor="email">
                  Email
                </label>
                <Input type="email" placeholder="cory.hubbard@gmail.com" id="email" />
              </div>
            </Col>
            <Col md={12}>
              <div className="d-flex align-items-center">
                <PhoneDropdown className="mr-8" />
                <div className="main-input__field--no-label">
                  <Input type="text" placeholder="1234567890" id="email" className="flex-1 mb-0" />
                </div>
              </div>
            </Col>
            <Col md={12}>
              <div className="d-flex align-items-center">
                <PasswordInput
                  labelText="Password"
                  className="w-100"
                  forgotPass={false}
                />
              </div>
            </Col>
            <Col span={24}>
              <Divider
                className="mt-0"
                plain
              >
                Or
              </Divider>
            </Col>
            <Col md={12}>
              <div className="auth-main-social-btn">
                <img className="mr-12" src="/images/Google.svg" alt="" />
                Continue with Google
              </div>
            </Col>
            <Col md={12}>
              <div className="auth-main-social-btn">
                <img className="mr-12" src="/images/Facebook.svg" alt="" />
                Continue with Facebook
              </div>
            </Col>
          </Row>
        </form>
      </Col>
    </Row>
  </LayoutListing>
);

export default ListingPage;
