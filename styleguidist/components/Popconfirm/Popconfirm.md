<a href="https://ant.design/components/popconfirm/" title="More details about Ant popconfirm">More details here</a>
<br />
<br />
<br />
<h3>When To Use</h3>
<p>A simple and compact dialog used for asking for user confirmation.</p>
<p>The difference with the <mark>confirm</mark> modal dialog is that it's more lightweight than the static popped full-screen confirm modal.</p>
<br />
<h3>Basic</h3>
<p>The basic example.</p>

```js
  import { Popconfirm, message } from 'antd';

  function confirm(e) {
    console.log(e);
    message.success('Click on Yes');
  }

  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }
  
  <Popconfirm
    title="Are you sure delete this task?"
    onConfirm={confirm}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
    <a href="#">Delete</a>
  </Popconfirm>
```
<br />
<h3>Placement</h3>
<p>There are 12 <mark>placement</mark> options available. Use <mark>arrowPointAtCenter</mark> if you want the arrow to point at the center of target.</p>

```js
  import { Popconfirm, message, Button } from 'antd';

  const text = 'Are you sure with this action?';

  function confirm() {
    message.warning('Clicked on Yes.');
  }

  <div className="demo">
    <div style={{ whiteSpace: 'nowrap' }}>
      <Popconfirm
        placement="topLeft"
        title={text}
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
        cancelButtonProps={{type: "link"}}
      >
        <Button style={{ marginRight: 16, width: 100, marginBottom: 16 }}>TL</Button>
      </Popconfirm>
      <Popconfirm cancelButtonProps={{type: "link"}} placement="top" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
        <Button style={{ marginRight: 16, width: 100, marginBottom: 16 }}>Top</Button>
      </Popconfirm>
      <Popconfirm
        cancelButtonProps={{type: "link"}}
        placement="topRight"
        title={text}
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <Button style={{ width: 100, marginBottom: 16 }}>TR</Button>
      </Popconfirm>
    </div>
    <div style={{ width: 70, float: 'left' }}>
      <Popconfirm cancelButtonProps={{type: "link"}} placement="leftTop" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
        <Button style={{ marginRight: 16, width: 100, marginBottom: 16 }}>LT</Button>
      </Popconfirm>
      <Popconfirm cancelButtonProps={{type: "link"}} placement="left" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
        <Button style={{ marginRight: 16, width: 100, marginBottom: 16 }}>Left</Button>
      </Popconfirm>
      <Popconfirm
        cancelButtonProps={{type: "link"}}
        placement="leftBottom"
        title={text}
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <Button style={{ marginRight: 16, width: 100, marginBottom: 16 }}>LB</Button>
      </Popconfirm>
    </div>
    <div style={{ width: 70, marginLeft: 232 }}>
      <Popconfirm
        cancelButtonProps={{type: "link"}}
        placement="rightTop"
        title={text}
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <Button style={{  width: 100, marginBottom: 16 }}>RT</Button>
      </Popconfirm>
      <Popconfirm cancelButtonProps={{type: "link"}} placement="right" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
        <Button style={{ width: 100, marginBottom: 16 }}>Right</Button>
      </Popconfirm>
      <Popconfirm
        cancelButtonProps={{type: "link"}}
        placement="rightBottom"
        title={text}
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <Button style={{ width: 100, marginBottom: 16 }}>RB</Button>
      </Popconfirm>
    </div>
    <div style={{ clear: 'both', whiteSpace: 'nowrap' }}>
      <Popconfirm
        cancelButtonProps={{type: "link"}}
        placement="bottomLeft"
        title={text}
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <Button style={{ marginRight: 16, width: 100 }}>BL</Button>
      </Popconfirm>
      <Popconfirm cancelButtonProps={{type: "link"}} placement="bottom" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
        <Button style={{ marginRight: 16, width: 100 }}>Bottom</Button>
      </Popconfirm>
      <Popconfirm
        cancelButtonProps={{type: "link"}}
        placement="bottomRight"
        title={text}
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <Button style={{ width: 100 }}>BR</Button>
      </Popconfirm>
    </div>
  </div>
```
