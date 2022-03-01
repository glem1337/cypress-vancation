<a href="https://ant.design/components/modal/" title="More details about Ant modal">More details here</a>
<br />
<br />
<br />
<h3>When To Use</h3>
<p>When requiring users to interact with the application, but without jumping to a new page and interrupting the user's workflow, you can use <mark>Modal</mark> to create a new floating layer over the current page to get user feedback or display information. Additionally, if you need show a simple confirmation dialog, you can use <mark>antd.Modal.confirm()</mark>, and so on.</p>
<br />
<h3>Basic</h3>
<p>Basic modal.</p>

```js
  import React, { useState } from 'react';
  import { Modal, Button } from 'antd';

  class App extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        visible: false,
      }
    }

    render() {
      return (
        <div>
          <Button type="primary" onClick={() => this.setState({ visible: !this.state.visible })}>
            Open Modal
          </Button>
          <Modal
            cancelButtonProps={{type: "link"}}
            title="Content confirmation"
            visible={this.state.visible}
            onOk={() => this.setState({ visible: !this.state.visible })}
            onCancel={() => this.setState({ visible: !this.state.visible })}
          >
            <p>A more complex example which define a customized footer button bar. The dialog will change to loading state after clicking the submit button, and when the loading is done, the modal dialog will be closed.</p>
          </Modal>
        </div>
      );
    }
  }

  <App />
```

<br />
<h3>Confirmation modal dialog</h3>
<p>Use <mark>confirm()</mark> to show a confirmation modal dialog.</p>

```js
  import { Modal, Button } from 'antd';

  const { confirm } = Modal;

  function showConfirm() {
    confirm({
      cancelButtonProps: { type: "link" },
      title: 'Do you Want to delete these items?',
      content: 'Some description of the problem or impotant infomation.',
      onOk() {
        console.log('OK');
      },
    });
  }

  function showDeleteConfirm() {
    confirm({
      cancelButtonProps: { type: "link" },
      title: 'Are you sure delete this task?',
      content: 'Some description of the problem or impotant infomation.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
    });
  }

  function showPropsConfirm() {
    confirm({
      cancelButtonProps: { type: "link" },
      title: 'Are you sure delete this task?',
      content: 'Some description of the problem or impotant infomation.',
      okText: 'Yes',
      okType: 'danger',
      okButtonProps: {
        disabled: true,
      },
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
    });
  }

  <div>
    <Button
      style={{ marginRight: 16 }}
      onClick={showConfirm}
    >
      Confirm
    </Button>
    <Button
      style={{ marginRight: 16 }}
      onClick={showDeleteConfirm}
      type="dashed"
    >
      Delete
    </Button>
    <Button onClick={showPropsConfirm} type="dashed">
      With extra props
    </Button>
  </div>
```
<br />
<h3>Information modal dialog</h3>
<p>In the various types of information modal dialog, only one button to close dialog is provided.</p>

```js
  import { Modal, Button } from 'antd';

  function info() {
    Modal.info({
      title: 'This is info message',
      content: (
        <div>
          <p>Some description of the problem or impotant infomation.</p>
        </div>
      ),
      onOk() {},
    });
  }

  function success() {
    Modal.success({
      title: 'This is success message',
      content: 'Some description of the problem or impotant infomation.',
    });
  }

  function error() {
    Modal.error({
      title: 'This is error message',
      content: 'Some description of the problem or impotant infomation.',
    });
  }

  function warning() {
    Modal.warning({
      title: 'This is warning message',
      content: 'Some description of the problem or impotant infomation.',
    });
  }
  
  <div>
    <Button
      style={{ marginRight: 16 }}
      onClick={info}
    >
      Info
    </Button>
    <Button
      style={{ marginRight: 16 }}
      onClick={success}
    >
      Success
    </Button>
    <Button
      style={{ marginRight: 16 }}
      onClick={warning}
    >
      Warning
    </Button>
    <Button onClick={error}>Error</Button>
  </div>
```
<br />
<h3>Delete item</h3>

```js
  import React, { useState } from 'react';
  import { Modal, Button } from 'antd';

  class App extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        visible: false,
      }
    }

    render() {
      return (
        <div>
          <Button type="primary" onClick={() => this.setState({ visible: !this.state.visible })}>
            Content confirmation
          </Button>
          <Modal
            title="Content confirmation"
            visible={this.state.visible}
            footer={[
              <Button type="link" key="back" onClick={() => this.setState({ visible: !this.state.visible })}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={() => this.setState({ visible: !this.state.visible })}>
                Ok
              </Button>,
            ]}
          >
            <p>A more complex example which define a customized footer button bar. The dialog will change to loading state after clicking the submit button, and when the loading is done, the modal dialog will be closed.</p>
          </Modal>
        </div>
      );
    }
  }

  <App />
```

<br />
<h3>Delete item</h3>

```js
  import React, { useState } from 'react';
  import { Modal, Button } from 'antd';

  class App extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        visible: false,
      }
    }

    render() {
      return (
        <div>
          <Button type="primary" onClick={() => this.setState({ visible: !this.state.visible })}>
            Delete item
          </Button>
          <Modal
            title="Delete item"
            visible={this.state.visible}
            footer={[
              <Button type="link" key="back" onClick={() => this.setState({ visible: !this.state.visible })}>
                Cancel
              </Button>,
              <Button key="submit" type="danger" onClick={() => this.setState({ visible: !this.state.visible })}>
                Delete
              </Button>,
            ]}
          >
            <p>Are you sure you want to delete this item?</p>
          </Modal>
        </div>
      );
    }
  }

  <App />
```
