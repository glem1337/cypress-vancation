<a href="https://ant.design/components/switch/" title="More details about Ant switch">More details here</a>
<br />
<br />
<br />
<h3>When To Use</h3>
<ul>
  <li>If you need to represent the switching between two states or on-off state.</li>
  <li>The difference between <mark>Switch</mark> and <mark>Checkbox</mark> is that <mark>Switch</mark> will trigger a state change directly when you toggle it, while <mark>Checkbox</mark> is generally used for state marking, which should work in conjunction with submit operation.</li>
</ul>
<br />
<h3>Basic</h3>
<p>The most basic usage.</p>

```js
  import { Switch } from 'antd';

  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }
  <>
    <Switch style={{ marginRight: 16 }} onChange={onChange} />
    <Switch style={{ marginRight: 16 }} defaultChecked onChange={onChange} />
    <Switch disabled />
  </>
```

<br />
<h3>Loading</h3>
<p>Mark a pending state of switch.</p>

```js
  import { Switch } from 'antd';

  <div>
    <Switch style={{ marginBottom: 16 }} loading defaultChecked />
    <br />
    <Switch loading />
  </div>
```
