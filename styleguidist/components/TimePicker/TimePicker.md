<a href="https://ant.design/components/time-picker/" title="More details about Ant time-picker">More details here</a>
<br />
<br />
<br />
<h3>Basic</h3>
<p>Click <mark>TimePicker</mark>, and then we could select or input a time in panel.</p>

```js
  import { TimePicker } from 'antd';
  import moment from 'moment';

  function onChange(time, timeString) {
    console.log(time, timeString);
  }

  <TimePicker
    onChange={onChange}
    defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
  />
```

<h3>Three Sizes</h3>
<p>The input box comes in three sizes. large is used in the form, while the medium size is the default.</p>

```js
  import { TimePicker } from 'antd';
  import moment from 'moment';

  const rowStyles = {
    display: 'flex',
    flexDirection: 'column'
  }
  const timePickerStyles = {
    width: '20%',
    marginBottom: 16
  };

  <div style={rowStyles}>
    <TimePicker
      size="large"
      style={timePickerStyles}
      defaultValue={moment('12:08:23', 'HH:mm:ss')}
    />
    <TimePicker
      style={timePickerStyles}
      defaultValue={moment('12:08:23', 'HH:mm:ss')}
    />
    <TimePicker
      size="small"
      style={timePickerStyles}
      defaultValue={moment('12:08:23', 'HH:mm:ss')}
    />
  </div>
```
