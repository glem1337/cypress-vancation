import React from 'react';
import {
  Alert, Row, Col, Button, Input, Form, Tag,
} from 'antd';
import HeaderOwnerDashboard from '../layout/headers/headerOwnerDashboard/Header';
import MainBtnGradient from '../shared/buttons/MainBtnGradient';
import AvatarUpload from '../account/components/AvatarUpload';
import PhoneDropdown from '../shared/dropdowns/PhoneDropdown';

const AccountBusiness = () => (
  <>
    <HeaderOwnerDashboard />
    <Form
      className="main-account-business"
      layout="vertical"
    >
      <div className="container mt-16 mb-40">
        <Row justify="center">
          <Col xl={16}>
            <Alert
              className="mb-24 alert--big"
              showIcon
              icon={<i className="icon icon-info" />}
              message="We highly recommend verifying your Driver’s License to provide more trust to potential renters."
              action={(
                <MainBtnGradient
                  size="small"
                  text="Verify my License"
                />
              )}
            />
            <Alert
              className="mb-24 alert--big"
              type="error"
              showIcon
              icon={<i className="icon icon-info" />}
              message="ID verification failed. Please try again or contact support for help."
              action={(
                <MainBtnGradient
                  size="small"
                  text="Verify my License"
                />
              )}
            />
            <h1 className="text-headline mb-24">
              Business profile information
            </h1>
            <div className="main-account-card">
              <div className="text-subheader mb-16">
                Business profile photo
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
                General information
              </div>
              <div>
                <Form.Item
                  label={<span className="main-input__label">Business title</span>}
                >
                  <Input />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  className="mb-0"
                  label={<span className="main-input__label">Description</span>}
                >
                  <div className="main-input-textarea-wrap mb-0">
                    <Input.TextArea
                      rows={4}
                      placeholder="Add a short information about your business"
                    />
                  </div>
                </Form.Item>
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
                <Col md={12}>
                  <Form.Item
                    className="mb-0"
                    label={<span className="main-input__label">Email</span>}
                  >
                    <Input type="email" />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div className="main-account-card">
              <div className="d-flex align-items-center mb-8">
                <div className="text-subheader">
                  ID verification
                </div>
                <Tag
                  className="ml-8"
                  color="processing"
                >
                  Not verified
                </Tag>
                {/*
                <Tag
                  color="success"
                  icon={<i className="icon icon-activate-f mr-4 in-green-1000 font-16" />}
                >
                  Verified
                </Tag>
                */}
              </div>
              <p className="mb-24">
                Please verify your ID so that your profile will be trustworthy for renters.
              </p>
              <MainBtnGradient
                className="min-w-160"
                text="Verify my License"
                size="large"
              />
            </div>
          </Col>
        </Row>
      </div>
      <div className="main-listing__footer w-100">
        <div className="container w-100 text-align-right">
          <Row justify="center">
            <Col xl={16}>
              <MainBtnGradient
                className="min-w-140"
                size="large"
                disabled
                text="Save"
              />
            </Col>
          </Row>
        </div>
      </div>
    </Form>
  </>
);

export default AccountBusiness;
