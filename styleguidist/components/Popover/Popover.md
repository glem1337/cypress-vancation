<a href="https://ant.design/components/popover/" title="More details about Ant popover">More details here</a>
<br />
<br />
<br />
<h3>When To Use</h3>
<p>A simple popup menu to provide extra information or operations.</p>
<p>Comparing with <mark>Tooltip</mark>, besides information <mark>Popover</mark> card can also provide action elements like links and buttons.</p>
<br />
<h3>Basic</h3>
<p>The most basic example. The size of the floating layer depends on the contents region.</p>

```js
  import { Popover, Button } from 'antd';

  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  <Popover content={content} title="Title">
    <Button type="primary">Hover me</Button>
  </Popover>
```

<br />
<h3>Basic</h3>
<p>Three sizes and two shapes are available.</p>

```js
  import React, { useState } from 'react';
  import { Popover, Button } from 'antd';

  function App() {

    const [visible, setVisible] = useState(false);

    hide = () => setVisible(false);

    handleVisibleChange = () => setVisible(true);

    return (
      <Popover
        content={<a onClick={() => hide()}>Close</a>}
        title="Title"
        trigger="click"
        visible={visible}
        onVisibleChange={() => handleVisibleChange()}
      >
        <Button type="primary">Click me</Button>
      </Popover>
    );
  }

  <App />
```

```js
  import { Popover, Button } from 'antd';

  const text = <span>Title</span>;
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  const buttonWidth = 70;

  <div className="demo">
    <div style={{ marginBottom: 16, whiteSpace: 'nowrap' }}>
      <Popover placement="topLeft" title={text} content={content} trigger="click">
        <Button style={{ marginRight: 16, width: 100 }}>TL</Button>
      </Popover>
      <Popover placement="top" title={text} content={content} trigger="click">
        <Button style={{ marginRight: 16, width: 100 }}>Top</Button>
      </Popover>
      <Popover placement="topRight" title={text} content={content} trigger="click">
        <Button style={{ width: 100 }}>TR</Button>
      </Popover>
    </div>
    <div style={{ width: buttonWidth, float: 'left' }}>
      <Popover placement="leftTop" title={text} content={content} trigger="click">
        <Button style={{ marginBottom: 16, width: 100 }}>LT</Button>
      </Popover>
      <Popover placement="left" title={text} content={content} trigger="click">
        <Button style={{ marginBottom: 16, width: 100 }}>Left</Button>
      </Popover>
      <Popover placement="leftBottom" title={text} content={content} trigger="click">
        <Button style={{ marginBottom: 16, width: 100 }}>LB</Button>
      </Popover>
    </div>
    <div style={{ width: buttonWidth, marginLeft: buttonWidth * 3 + 23 }}>
      <Popover placement="rightTop" title={text} content={content} trigger="click">
        <Button style={{ marginBottom: 16, width: 100 }}>RT</Button>
      </Popover>
      <Popover placement="right" title={text} content={content} trigger="click">
        <Button style={{ marginBottom: 16, width: 100 }}>Right</Button>
      </Popover>
      <Popover placement="rightBottom" title={text} content={content} trigger="click">
        <Button style={{ marginBottom: 16, width: 100 }}>RB</Button>
      </Popover>
    </div>
    <div style={{ clear: 'both', whiteSpace: 'nowrap' }}>
      <Popover placement="bottomLeft" title={text} content={content} trigger="click">
        <Button style={{ marginRight: 16, width: 100 }}>BL</Button>
      </Popover>
      <Popover placement="bottom" title={text} content={content} trigger="click">
        <Button style={{ marginRight: 16, width: 100 }}>Bottom</Button>
      </Popover>
      <Popover placement="bottomRight" title={text} content={content} trigger="click">
        <Button style={{ width: 100 }}>BR</Button>
      </Popover>
    </div>
  </div>
```
