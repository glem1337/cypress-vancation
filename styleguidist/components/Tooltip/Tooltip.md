<a href="https://ant.design/components/tooltip/" title="More details about Ant tooltip">More details here</a>
<br />
<br />
<br />
<h3>When To Use</h3>
<ul>
  <li>The tip is shown on mouse enter, and is hidden on mouse leave. The Tooltip doesn't support complex text or operations.</li>
  <li>To provide an explanation of a <mark>button/text/operation</mark>. It's often used instead of the html <mark>title</mark> attribute.</li>
</ul>
<br />
<h3>Basic</h3>
<p>Three sizes and two shapes are available.</p>

```js
  import { Tooltip, Button } from 'antd';

  const text = <span>Here's a tooltip!</span>;

  const buttonWidth = 70;

  <div className="demo">
    <div style={{ whiteSpace: 'nowrap', marginBottom: 20 }}>
      <Tooltip placement="topLeft" title={text}>
        <Button style={{ marginRight: 16, width: 100 }}>TL</Button>
      </Tooltip>
      <Tooltip placement="top" title={text}>
        <Button style={{ marginRight: 16, width: 100 }}>Top</Button>
      </Tooltip>
      <Tooltip placement="topRight" title={text}>
        <Button style={{ width: 100 }}>TR</Button>
      </Tooltip>
    </div>
    <div style={{ width: buttonWidth, float: 'left' }}>
      <Tooltip placement="leftTop" title={text}>
        <Button style={{  marginBottom: 16, width: 100 }}>LT</Button>
      </Tooltip>
      <Tooltip placement="left" title={text}>
        <Button style={{  marginBottom: 16, width: 100 }}>Left</Button>
      </Tooltip>
      <Tooltip placement="leftBottom" title={text}>
        <Button style={{  marginBottom: 16, width: 100 }}>LB</Button>
      </Tooltip>
    </div>
    <div style={{ width: buttonWidth, marginLeft: buttonWidth * 3 + 24 }}>
      <Tooltip placement="rightTop" title={text}>
        <Button style={{ marginBottom: 16, width: 100 }}>RT</Button>
      </Tooltip>
      <Tooltip placement="right" title={text}>
        <Button style={{ marginBottom: 16, width: 100 }}>Right</Button>
      </Tooltip>
      <Tooltip placement="rightBottom" title={text}>
        <Button style={{ marginBottom: 16, width: 100 }}>RB</Button>
      </Tooltip>
    </div>
    <div style={{ clear: 'both', whiteSpace: 'nowrap' }}>
      <Tooltip placement="bottomLeft" title={text}>
        <Button style={{ marginRight: 16, width: 100 }}>BL</Button>
      </Tooltip>
      <Tooltip placement="bottom" title={text}>
        <Button style={{ marginRight: 16, width: 100 }}>Bottom</Button>
      </Tooltip>
      <Tooltip placement="bottomRight" title={text}>
        <Button style={{ width: 100 }}>BR</Button>
      </Tooltip>
    </div>
  </div>
```
