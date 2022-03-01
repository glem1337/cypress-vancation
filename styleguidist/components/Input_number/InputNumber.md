InputNumber example:
<p><a href="https://ant.design/components/input-number/" title="More details about Ant InputNumber">More details here</a></p>

<br />
<h3>Basic</h3>
<p>Numeric-only input box.</p>

```js
  import { InputNumber } from 'antd';

  function onChange(value) {
    console.log('changed', value);
  }

  <InputNumber
    min={1}
    max={10}
    defaultValue={3}
    onChange={onChange}
  />
```

<br />
<h3>Sizes</h3>
<p>There are three sizes available to a numeric input box. By default, the size is <mark> 32px </mark>. The two additional sizes are <mark> large </mark> and <mark> small </mark> which means <mark> 40px </mark> and <mark> 24px </mark>, respectively.</p>

```js
  import { InputNumber } from 'antd';

  function onChange(value) {
    console.log('changed', value);
  }

  <div>
    <InputNumber
      style={{ marginRight: 20 }}
      size="large"
      min={1}
      max={100000}
      defaultValue={3}
      onChange={onChange}
    />
    <InputNumber
      style={{ marginRight: 20 }}
      min={1}
      max={100000}
      defaultValue={3}
      onChange={onChange}
    />
    <InputNumber
      size="small"
      min={1}
      max={100000}
      defaultValue={3}
      onChange={onChange}
    />
  </div>
```

<br />
<h3>Decimals</h3>
<p>A numeric-only input box whose values can be increased or decreased using a decimal step. The number of decimals (also known as precision) is determined by the step prop.</p>

```js
  import { InputNumber } from 'antd';

  function onChange(value) {
    console.log('changed', value);
  }

  <InputNumber
    min={0}
    max={10}
    step={0.1}
    onChange={onChange}
  />
```

<br />
<h3>Formatter</h3>
<p>Display value within it's situation with <mark> formatter</mark>, and we usually use <mark> parser </mark> at the same time.</p>

```js
  import { InputNumber } from 'antd';

  function onChange(value) {
    console.log('changed', value);
  }

  <div>
    <InputNumber
      style={{ marginRight: 20 }}
      defaultValue={1000}
      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={value => value.replace(/\$\s?|(,*)/g, '')}
      onChange={onChange}
    />
    <InputNumber
      defaultValue={100}
      min={0}
      max={100}
      formatter={value => `${value}%`}
      parser={value => value.replace('%', '')}
      onChange={onChange}
    />
  </div>
```
