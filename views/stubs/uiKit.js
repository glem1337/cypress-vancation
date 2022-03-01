import React from 'react';
import {
  Button,
  Tag,
  Form,
  Input,
  Alert,
  Select,
  Checkbox,
  Switch,
  Tooltip,
  Tabs,
  Row,
  Col,
  notification,
  Popover,
} from 'antd';
import SearchInput from 'views/stubs/layout/headers/mainHeader/SearchInput';
import UserDropdown from 'views/stubs/layout/headers/mainHeader/UserDropdown';
import MainBtnGradient from './shared/buttons/MainBtnGradient';
import ActionBtnGradient from './shared/buttons/ActionBtnGradient';
import PasswordInput from './shared/inputs/textfield/PasswordInput';
import InputNumeric from './shared/inputs/InputNumeric';

const { Option } = Select;
const { TabPane } = Tabs;

const openNotification = (type) => {
  const key = `open${Date.now()}`;
  const btn = <MainBtnGradient className="min-w-140" text="Ok" size="large" />;
  notification[type]({
    className: 'notification-with-btn',
    message: 'This is info message',
    description: 'Some description of the problem or important information.',
    btn,
    key,
    duration: 0,
    icon: <i className="icon icon-alert" />,
    closeIcon: false,
  });
};

const popoverContent = (
  <div>
    <div className="d-flex align-items-center">
      <i className="icon icon-alert font-18 in-yellow-1000 mr-4" />
      <span className="text-caption">Are you sure with this action?</span>
    </div>
    <div className="d-flex justify-content-flex-end mt-16">
      <Button className="mr-8" type="text" size="small">
        No
      </Button>
      <MainBtnGradient text="Yes" size="small" />
    </div>
  </div>
);

const UiKit = () => (
  <div className="container">
    <div className="text-title">Button</div>
    <div className="d-flex align-items-center">
      <div className="mr-16 mb-16">
        <MainBtnGradient text="Large" size="large" />
      </div>
      <div className="mr-16 mb-16">
        <MainBtnGradient text="Medium" />
      </div>
      <div className="mr-16 mb-16">
        <MainBtnGradient text="Small" size="small" />
      </div>
    </div>
    <div className="d-flex align-items-center">
      <div className="mr-16 mb-16">
        <ActionBtnGradient
          icon={<i className="icon icon-plus" />}
          size="large"
        />
      </div>
      <div className="mr-16 mb-16">
        <ActionBtnGradient icon={<i className="icon icon-plus" />} />
      </div>
      <div className="mr-16 mb-16">
        <ActionBtnGradient
          icon={<i className="icon icon-plus" />}
          size="small"
        />
      </div>
    </div>
    <div className="d-flex align-items-center">
      <div className="mr-8 mb-16">
        <Button size="large" type="secondary">
          Button
        </Button>
      </div>
      <div className="mr-8 mb-16">
        <Button size="large">Button</Button>
      </div>
      <div className="mr-8 mb-16">
        <Button type="text" size="large">
          Button
        </Button>
      </div>
      <div className="mr-8 mb-16">
        <Button type="delete" size="large">
          Button
        </Button>
      </div>
      <div className="mr-8 mb-16">
        <Button type="danger" size="large">
          Button
        </Button>
      </div>
      <div className="mr-8 mb-16">
        <Button className="ant-btn-outline-gray" size="large">
          Button
        </Button>
      </div>
      <div className="mr-8 mb-16">
        <Button loading size="large">
          Loading
        </Button>
      </div>
      <div className="mr-8 mb-16">
        <Button type="link" size="large">
          Simple Link Button
        </Button>
      </div>
      <div className="mr-8 mb-16">
        <Button type="simple-text" size="large">
          Simple Button With Underline
        </Button>
      </div>
    </div>

    <Form layout="vertical">
      <div className="text-title">Input</div>
      <div className="d-flex align-items-center flex-wrap">
        <Form.Item label={<span className="main-input__label">Field</span>}>
          <div style={{ marginRight: 20 }}>
            <div>Main input</div>
            <Input />
          </div>
        </Form.Item>
        <Form.Item className="main-input__field--no-label">
          <div style={{ marginRight: 20 }}>
            <div>Main input without label</div>
            <Input />
          </div>
        </Form.Item>
        <Form.Item className="main-input__field--no-label">
          <div style={{ marginRight: 20 }}>
            <div>Main input disabled</div>
            <Input disabled />
          </div>
        </Form.Item>
        <Form.Item className="main-input__field--no-label">
          <div style={{ marginRight: 20 }}>
            <InputNumeric />
          </div>
        </Form.Item>
        <div className="w-100 d-flex mb-16">
          <Form.Item className="main-input__field--no-label">
            <div style={{ marginRight: 20 }}>
              <SearchInput />
            </div>
          </Form.Item>
          <Form.Item className="main-input__field--no-label">
            <div style={{ marginRight: 20 }}>
              <Input
                prefix={<i className="icon icon-search" />}
                placeholder="Location"
              />
            </div>
          </Form.Item>
          <Form.Item className="main-input__field--no-label">
            <div style={{ marginRight: 20 }}>
              <Input
                suffix={<i className="icon icon-search" />}
                placeholder="Location"
              />
            </div>
          </Form.Item>
          <div className="main-input--has-message">
            <Form.Item
              help={(
                <p className="main-input__message">
                  <i className="main-input__message-icon icon icon-info" />
                  $9,856.00 per month
                </p>
              )}
            >
              <Input placeholder="0" className="mb-0" />
              <span className="main-input__add-txt">%</span>
            </Form.Item>
          </div>
        </div>
      </div>
      <Form.Item>
        <div style={{ maxWidth: 500 }}>
          <div className="main-input-textarea-wrap">
            <Input.TextArea
              rows={4}
              placeholder="Auto or controlled sizing height van"
            />
          </div>
        </div>
      </Form.Item>
      <div className="d-flex align-items-center">
        <PasswordInput
          placeholder="Input + message"
          scaleStep="one"
          hasAlertError
        />
        <PasswordInput placeholder="Input + message" scaleStep="two" hasError />
        <PasswordInput
          placeholder="Input + message"
          scaleStep="three"
          hasSuccess
        />
      </div>
      <div className="mb-20">
        <Row justify="center">
          <Col lg={12}>
            <Input.Group>
              <Row>
                <Col span={17}>
                  <Input
                    className="main-input-group--left"
                    placeholder="Enter email"
                  />
                </Col>
                <Col span={7}>
                  <MainBtnGradient
                    className="w-100 main-input-group--right"
                    size="large"
                    text="Get Started"
                  />
                </Col>
              </Row>
            </Input.Group>
          </Col>
        </Row>
      </div>
    </Form>

    <div className="text-title">Tag</div>
    <div className="d-flex align-items-center mb-16">
      <Tag className="ml-0 mr-0" color="success">
        Success
      </Tag>
      <Tag className="ml-8 mr-0" color="processing">
        Processing
      </Tag>
      <Tag className="ml-8 mr-0" color="error">
        Error
      </Tag>
      <Tag className="ml-8 mr-0" color="warning">
        Warning
      </Tag>
      <Tag className="ml-8 mr-0" color="default">
        Default
      </Tag>
      <Tag className="ml-8 mr-0" color="cyan">
        Cyan
      </Tag>
    </div>

    <div className="text-title">Alert</div>
    <div style={{ maxWidth: '500px' }}>
      <Alert
        type="error"
        message="Please fill in the fields to continue"
        showIcon
        icon={<i className="icon icon-info" />}
      />
      <Alert
        type="warning"
        className="mb-24"
        showIcon
        icon={<i className="icon icon-alert" />}
        message="Vancation recommends adding a cleaning and preparation fee of $50-100."
      />
      <Alert
        type="success"
        message="Your password has been updated"
        showIcon
        icon={<i className="icon icon-checked" />}
        closable
      />
      <Alert
        message="We highly recommend verifying your Driver’s License to provide more trust to potential renters."
        className="align-items-center mb-24"
        type="info"
        action={<MainBtnGradient size="small" text=" Verify my ID" />}
        showIcon
        icon={<i className="icon icon-info" />}
      />
    </div>

    <div className="text-title">Notifications modals</div>

    <div role="button" onClick={() => openNotification('success')}>
      This is info message (Click me)
    </div>

    <div className="text-title">Dropdown</div>
    <div style={{ marginBottom: 20 }}>
      <UserDropdown />
    </div>
    <div className="mb-16" style={{ maxWidth: 500 }}>
      <Select className="main-input__field" defaultValue="2weeks">
        <Option value="2weeks">2 Weeks</Option>
        <Option value="3months">3 Months</Option>
        <Option value="6months">6 Months</Option>
      </Select>
    </div>

    <div className="text-title">Controls</div>
    <div className="mb-16">
      <div className="mb-16">
        <Checkbox>Normal</Checkbox>
        <Checkbox disabled>Disabled</Checkbox>
      </div>
      <div className="d-flex align-items-center">
        <div className="mr-16">
          <Switch />
        </div>
        <div className="mr-16">
          <Switch size="small" />
        </div>
        <div className="mr-16">
          <Switch disabled />
        </div>
      </div>
    </div>

    <div className="text-title">Tooltip</div>
    <div className="mb-16">
      <Tooltip placement="topLeft" title={<span>Tooltip inner</span>}>
        <span>Tooltip</span>
      </Tooltip>
    </div>

    <div className="text-title">Popover</div>
    <div className="mb-16">
      <Popover content={popoverContent} trigger="click">
        <Button className="ant-btn-outline-gray">Click</Button>
      </Popover>
    </div>

    <div className="text-title">Tabs</div>
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Active Tab (2)" key="1">
          Active Tab
        </TabPane>
        <TabPane tab="Default Tab (2)" key="2">
          Default Tab
        </TabPane>
      </Tabs>
    </div>
  </div>
);

export default UiKit;
