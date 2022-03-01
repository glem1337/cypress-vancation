<a href="https://ant.design/components/checkbox/" title="More details about Ant checkbox">More details here</a>
<br />
<br />
<br />
<h3>When To Use</h3>
<ul>
  <li>Used for selecting multiple values from several options.</li>
  <li>If you use only one checkbox, it is the same as using Switch to toggle between two states. The difference is that Switch will trigger the state change directly, but Checkbox just marks the state as changed and this needs to be submitted.</li>
</ul>
<br />
<h3>Basic</h3>
<p>Basic usage of checkbox.</p>

```js
  import { Checkbox } from 'antd';

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  <Checkbox onChange={onChange}>Checkbox</Checkbox>
```

<br />
<h3>Disabled</h3>
<p>Disabled checkbox.</p>

```js
  import { Checkbox } from 'antd';

  <div>
    <Checkbox defaultChecked={false} disabled>Disabled</Checkbox>
    <br />
    <Checkbox defaultChecked disabled>Disabled checked</Checkbox>
  </div>
```
<br />
<h3>Checkbox Group</h3>
<p>Generate a group of checkboxes from an array.</p>

```js
  import { Checkbox } from 'antd';

  function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
  }
  const rowStyle = {
    marginBottom: 16
  };
  const plainOptions = ['Apple', 'Pear', 'Orange'];
  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];
  const optionsWithDisabled = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: false },
  ];

  <div>
    <div style={rowStyle}>
      <Checkbox.Group
        options={plainOptions}
        defaultValue={['Apple']}
        onChange={onChange}
      />
    </div>
    <div style={rowStyle}>
      <Checkbox.Group
        options={options}
        defaultValue={['Pear']}
        onChange={onChange}
      />
    </div>
    <div style={rowStyle}>
      <Checkbox.Group
        options={optionsWithDisabled}
        defaultValue={['Apple']}
        onChange={onChange}
        disabled
      />
    </div>
  </div>
```
