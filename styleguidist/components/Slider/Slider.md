<p>Select component to select value from options.</p>
<a href="https://ant.design/components/slider/" title="More details about Ant slider">More details here</a>
<br />
<br />
<br />
<h3>When To Use</h3>
<p>To input a value in a range.</p>
<br />
<h3>Basic</h3>
<p>Basic slider. When <mark>range</mark> is <mark>true</mark>, display as dual thumb mode. When <mark>disable</mark> is <mark>true</mark>, the slider will not be interactable.</p>

```js
  import React, { useState } from 'react';
  import { Slider, Switch } from 'antd';

  function Demo() {
    const [ state, setState ] = useState(false);
    handleDisabledChange = () =>  setState(!state);
    return (
      <div>
        <Slider defaultValue={30} disabled={state} />
        <Slider range defaultValue={[20, 50]} disabled={state} />
        Disabled: <Switch size="small" checked={state} onChange={() => setState(!state)} />
      </div>
    );
  }

  <Demo />
```
<br />
<h3>Slider with InputNumber</h3>
<p>Synchronize with InputNumber component.</p>

```js
  import React, { useState } from 'react';
  import { Slider, InputNumber, Row, Col } from 'antd';

  function IntegerStep() {
    const [ inputValue, setInputValue ] = useState(1);
    onChange = value => setInputValue(value);
    
    return(
      <Row>
        <Col span={12}>
          <Slider
            min={1}
            max={20}
            onChange={this.onChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={1}
            max={20}
            style={{ marginLeft: 16 }}
            value={inputValue}
            onChange={this.onChange}
          />
        </Col>
      </Row>
    )
  }

  <IntegerStep />
```

<br />
<h3>Graduated slider</h3>
<p>Using <mark>marks</mark> property to mark a graduated slider, use <mark>value</mark> or <mark>defaultValue</mark> to specify the position of thumb. When <mark>included</mark> is false, means that different thumbs are coordinative. when <mark>step</mark> is null, users can only slide the thumbs onto marks.</p>

```js
  import { Slider } from 'antd';

  const marks = {
    0: '0°C',
    26: '26°C',
    37: '37°C',
    100: {
      style: {
        color: '#ff5d5d',
      },
      label: <strong>100°C</strong>,
    },
  };

  <div>
    <h4>included=true</h4>
    <Slider marks={marks} defaultValue={37} />
    <Slider range marks={marks} defaultValue={[26, 37]} />

    <h4>included=false</h4>
    <Slider marks={marks} included={false} defaultValue={37} />

    <h4>marks & step</h4>
    <Slider marks={marks} step={10} defaultValue={37} />

    <h4>step=null</h4>
    <Slider marks={marks} step={null} defaultValue={37} />
  </div>
```
