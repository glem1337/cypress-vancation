<a href="https://ant.design/components/date-picker/" title="More details about Ant date-picker">More details here</a>
<br />
<br />
<br />
<h3>When To Use</h3>
<p>By clicking the input box, you can select a date from a popup calendar.</p>
<br />
<h3>Basic usage DatePicker</h3>
<p>Basic use case. Users can select or input a date in panel.</p>

```js
  import { DatePicker } from 'antd';
  import moment from 'moment';

  const dateFormat = 'YYYY-MM-DD';

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  <>
    <DatePicker onChange={onChange} style={{ marginRight: 16 }} size='large' />
    <DatePicker defaultValue={moment('2020/03/02', dateFormat)} format={dateFormat} size='large' />
  </>
```

<h3>MonthPicker</h3>

```js
  import { DatePicker } from 'antd';
  import moment from 'moment';

  const monthFormat = 'YYYY-MM';
  const { MonthPicker } = DatePicker;

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  <>
    <MonthPicker onChange={onChange} placeholder="Select month" style={{ marginRight: 16 }} size='large' />
    <MonthPicker defaultValue={moment('2020/03', monthFormat)} format={monthFormat} size='large' />
  </>
```

<h3>WeekPicker</h3>

```js
  import { DatePicker } from 'antd';

  const { WeekPicker } = DatePicker;

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  <WeekPicker onChange={onChange} placeholder="Select week" size='large' />
```

<h3>RangePicker</h3>

```js
  import { DatePicker } from 'antd';
  import moment from 'moment';

  const dateFormat = 'YYYY-MM-DD';
  const { RangePicker } = DatePicker;

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <RangePicker onChange={onChange} style={{ marginBottom: 16, width: '50%' }} size='large' />
    <RangePicker
      size='large'
      style={{ width: '50%' }}
      defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
      format={dateFormat}
    />
  </div>
```
