<a href="https://ant.design/components/input/" title="More details about Ant input">More details here</a>
<br />
<br />
<br />
<h3>When To Use</h3>
<ul>
  <li>A user input in a form field is needed.</li>
  <li>A search input is required.</li>
</ul>
<br />
<h3>Basic usage</h3>
<p>Basic usage example.</p>

``` js
  import { Input } from 'antd';

  <Input
    style={{ width: '50%' }}
    placeholder="With caption"
  />
```

<br />
<h3>Three sizes of Input</h3>
<p>There are three sizes of an Input box: <mark> large </mark> (40px), <mark> default </mark> (32px) and <mark> small </mark> (24px).</p>

```js
  import { Input } from 'antd';

  <div style={{ width: '50%' }}>
    <Input
      style={{ marginBottom: 20 }}
      size="large"
      placeholder="large size"
    />
    <Input
      style={{ marginBottom: 20 }}
      placeholder="default size"
    />
    <Input
      size="small"
      placeholder="small size"
    />
  </div>
```

<br />
<h3>prefix and suffix</h3>
<p>Add prefix or suffix icons inside input.</p>

```js
  import { Input } from 'antd';
  import { ArrowDownOutlined, UserOutlined } from '@ant-design/icons';
  
  <div style={{ width: '30%' }}>
    <Input
      style={{ marginBottom: 20 }}
      size="large"
      prefix={<ArrowDownOutlined style={{ color: '#96A9C8' }} />}
      placeholder="Left icon"
    />
    <Input
      style={{ marginBottom: 20 }}
      size="large"
      suffix={<ArrowDownOutlined style={{ color: '#96A9C8' }} />}
      placeholder="Right icon"
    />
    <Input
      size="large"
      suffix={<UserOutlined style={{ color: '#96A9C8' }}   />}
      prefix={<UserOutlined style={{ color: '#96A9C8' }}   />}
      placeholder="Double icons"
    />
  </div>

```

<br />
<h3>TextArea</h3>
<p>For multi-line input.</p>

```js
  import { Input } from 'antd';

  const { TextArea } = Input;

  <TextArea
    style={{ width: '60%' }}
    rows={4}
    placeholder="Auto or controlled sizing height"
  />
```

<br />
<h3>Search box</h3>
<p>Example of creating a search box by grouping a standard input with a search button, added in <mark> 2.5.0. </mark></p>

```js
  import { Input } from 'antd';

  const { Search } = Input;

  <div style={{ width: '60%' }}>
    <Search
      style={{ marginBottom: 16 }}
      size="large"
      enterButton
      onSearch={value => console.log(value)}
      placeholder="Input + Icon Control"
    />
    <Search
      size="large"
      enterButton="Search"
      onSearch={value => console.log(value)}
      placeholder="Input + Control"
    />
  </div>
```

<br />
<h3>Pre / Post tab</h3>
<p>Using pre & post tabs example.</p>

```js
  import { Input, Select } from 'antd';
  import { SettingOutlined } from '@ant-design/icons'

  const { Option } = Select;

  const selectBefore = (
    <Select placeholder="Http://" style={{ width: 90 }}>
      <Option value="Http://">Http://</Option>
      <Option value="Https://">Https://</Option>
    </Select>
  );
  const selectAfter = (
    <Select placeholder=".com" style={{ width: 80 }}>
      <Option value=".com">.com</Option>
      <Option value=".jp">.jp</Option>
      <Option value=".cn">.cn</Option>
      <Option value=".org">.org</Option>
    </Select>
  );
  const selectInputBefore = (
    <Select defaultValue="Option1">
      <Option value="Option1">Option1</Option>
      <Option value="Option2">Option2</Option>
    </Select>
  );


  <div style={{ width: '60%' }}>
    <div style={{ marginBottom: 16 }}>
      <Input
        size="large"
        addonBefore="Http://"
        addonAfter=".com"
        placeholder="mysite"
      />
    </div>
    <div style={{ marginBottom: 16 }}>
      <Input
        size="large"
        addonBefore={selectBefore}
        addonAfter={selectAfter}
        placeholder="mysite"
      />
    </div>
    <div style={{ marginBottom: 16 }}>
      <Input
        size="large"
        addonAfter={<SettingOutlined />}
        placeholder="mysite"
      />
    </div>
    <div style={{ marginBottom: 16 }}>
      <Input
        size="large"
        style={{ marginBottom: 16 }}
        addonBefore={selectInputBefore}
        placeholder="Input content"
      />
    </div>
  </div>
```

<br />
<h3>Input Group</h3>
<p>Input.Group example</p>
<p>Note: You don't need Col to control the width in the compact mode.</p>

```js
  import { Input, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';

  const InputGroup = Input.Group;
  const { Option } = Select;
  
  <div style={{ width: '90%' }}>    
    <InputGroup compact>
      <Input
        size="large"
        style={{ width: '50%' }}
        placeholder="input content"
      />
      <InputNumber
        size="large"
        defaultValue="12"
      />
    </InputGroup>
  </div>
```
