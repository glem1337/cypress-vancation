<a href="https://ant.design/components/radio/" title="More details about Ant radio">More details here</a>
<br />
<br />
<br />
<h3>When To Use</h3>
<ul>
  <li>Used to select a single state from multiple options.</li>
  <li>The difference from Select is that Radio is visible to the user and can facilitate the comparison of choice, which means there shouldn't be too many of them.</li>
</ul>
<br />
<h3>Basic</h3>
<p>The simplest use.</p>

```js
  import { Radio } from 'antd';

  <Radio>Radio</Radio>;
```

<br />
<h3>Disabled</h3>
<p>Radio unavailable.</p>

```js
  import { Radio, Button } from 'antd';

  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        disapled: true,
      }
    }

    render() {
      toggleDisabled = () => {
        this.setState({
          disabled: !this.state.disabled,
        });
      };

      return (
        <div>
          <Radio defaultChecked={false} disabled={this.state.disabled}>
            Disabled
          </Radio>
          <br />
          <Radio defaultChecked disabled={this.state.disabled}>
            Disabled
          </Radio>
          <div style={{ marginTop: 20 }}>
            <Button type="primary" onClick={() => toggleDisabled()}>
              Toggle disabled
            </Button>
          </div>
        </div>
      );
    }
  }

  <App />
```

<br />
<h3>Vertical Radio.Group</h3>
<p>Vertical Radio.Group, with more radios.</p>

```js
  import React, { useState } from 'react';
  import { Radio, Input } from 'antd';

  function App() {
    const [value, setValue] = useState(3);

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    return (
      <Radio.Group onChange={(e) => setValue(e.target.value)} value={value}>
        <Radio style={radioStyle} value={1}>
          Option A
        </Radio>
        <Radio style={radioStyle} value={2}>
          Option B
        </Radio>
        <Radio style={radioStyle} value={3}>
          Option C
        </Radio>
        <Radio style={radioStyle} value={4}>
          More...
          {value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
        </Radio>
      </Radio.Group>
    )
  }

  <App />
```
