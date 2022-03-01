<p>Form is used to collect, validate, and submit the user input, usually contains various form items including checkbox, radio, input, select, and etc.</p>
<a href="https://ant.design/components/form/" title="More details about Ant form">More details here</a>
<br />
<br />
<br />
<h3>When To Use</h3>
<ul>
  <li>When you need to create a instance or collect information.</li>
  <li>When you need to validate fields in certain rules.</li>
</ul>
<br />
<h3>Basic</h3>
<p>Basic form.</p>

```js
  import { Input, Row, Col, Form, Button } from 'antd';

  <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item>
          <Input
            size="large"
            placeholder="Placeholder"
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item>
          <Input
            size="large"
            placeholder="Placeholder"
          />
        </Form.Item>
      </Col>
    </Row>
    <Form.Item>
      <Input
        size="large"
        placeholder="Placeholder"
      />
    </Form.Item>
    <Row gutter={16}>
      <Col span={18}>
        <Form.Item>
          <Input
            size="large"
            placeholder="Placeholder"
          />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item>
          <Input
            size="large"
            placeholder="Placeholder"
          />
        </Form.Item>
      </Col>
    </Row>
     <Button type="primary" htmlType="submit">
      Register
    </Button>
  </Form>
```
<br />
<h3>Basic form</h3>
<p>Standard library warning about incorrect field filling</p>
<p>To view the message, send an unfilled form</p>

```js
  import { Form, Select, Input, Icon, Button, Progress } from 'antd';

  const { Option } = Select;

  class App extends React.Component {

    render() {

      handleSubmitOne = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      };

      handleSelectChange = value => {
        console.log(value);
        this.props.form.setFieldsValue({
          note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
      };        

      return (
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={(e) => handleSubmitOne(e)}>
          <Form.Item label="Note" name="note" rules={[{ required: true, message: 'Please input your note!'}]}>
            <Input />
          </Form.Item>
          <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select your gender!' }]}>
            <Select
              placeholder="Select a option and change input text above"
              onChange={(e) => handleSelectChange(e)}
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }

  <App />
```
<br />
<h3>Extended example</h3>

```js
  import { Form, Input, DatePicker, TimePicker, Select, Cascader } from 'antd';

  const { Option } = Select;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };

  <Form {...formItemLayout}>
    <Form.Item
      label="Fail"
      validateStatus="error"
      help="Should be combination of numbers & alphabets"
    >
      <Input placeholder="unavailable choice" id="error" />
    </Form.Item>

    <Form.Item label="Warning" validateStatus="warning">
      <Input placeholder="Warning" id="warning" />
    </Form.Item>

    <Form.Item
      label="Validating"
      hasFeedback
      validateStatus="validating"
      help="The information is being validated..."
    >
      <Input placeholder="I'm the content is being validated" id="validating" />
    </Form.Item>

    <Form.Item label="Success" hasFeedback validateStatus="success">
      <Input placeholder="I'm the content" id="success" />
    </Form.Item>

    <Form.Item label="Warning" hasFeedback validateStatus="warning">
      <Input placeholder="Warning" id="warning2" />
    </Form.Item>

    <Form.Item
      label="Fail"
      hasFeedback
      validateStatus="error"
      help="Should be combination of numbers & alphabets"
    >
      <Input placeholder="unavailable choice" id="error2" />
    </Form.Item>

    <Form.Item label="Success" hasFeedback validateStatus="success">
      <DatePicker style={{ width: '100%' }} />
    </Form.Item>

    <Form.Item label="Warning" hasFeedback validateStatus="warning">
      <TimePicker style={{ width: '100%' }} />
    </Form.Item>

    <Form.Item label="Error" hasFeedback validateStatus="error">
      <Select defaultValue="1">
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
        <Option value="3">Option 3</Option>
      </Select>
    </Form.Item>

    <Form.Item
      label="Validating"
      hasFeedback
      validateStatus="validating"
      help="The information is being validated..."
    >
      <Cascader defaultValue={['1']} options={[]} />
    </Form.Item>

    <Form.Item label="inline" style={{ marginBottom: 0 }}>
      <Form.Item
        validateStatus="error"
        help="Please select the correct date"
        style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
      >
        <DatePicker />
      </Form.Item>
      <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
      <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
        <DatePicker />
      </Form.Item>
    </Form.Item>

    <Form.Item label="Success" hasFeedback validateStatus="success">
      <Input allowClear placeholder="with allowClear" />
    </Form.Item>

    <Form.Item label="Warning" hasFeedback validateStatus="warning">
      <Input.Password placeholder="with input password" />
    </Form.Item>

    <Form.Item label="Error" hasFeedback validateStatus="error">
      <Input.Password allowClear placeholder="with input password and allowClear" />
    </Form.Item>
  </Form>
  
```
