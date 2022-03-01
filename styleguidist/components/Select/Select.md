<p>Select component to select value from options.</p>
<a href="https://ant.design/components/select/" title="More details about Ant select">More details here</a>
<br />
<br />
<br />
<h3>When To Use</h3>
<ul>
  <li>A dropdown menu for displaying choices - an elegant alternative to the native <mark>`<select>`</mark> element.</li>
  <li>Utilizing <a href="https://ant.design/components/radio/" title="More details about Radio">Radio</a> is recommended when there are fewer total options (less than 5).</li>
</ul>
<br />
<h3>Basic usage</h3>
<p>Basic Usage.</p>

```js
  import { Select } from 'antd';

  const { Option } = Select;
  const selectStyles = {
    width: 160,
    marginRight: 20
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  <div>
    <Select
      defaultValue="lucy"
      onChange={handleChange}
      size="large"
      style={selectStyles}
      dropdownClassName="ant-select-multiple-menu"
      listHeight={238}
    >
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
    <Select
      defaultValue="lucy"
      disabled
      size="large"
      style={selectStyles}
    >
      <Option value="lucy">Lucy</Option>
    </Select>
    <Select
      defaultValue="lucy"
      loading
      size="large"
      style={selectStyles}
      dropdownClassName="ant-select-multiple-menu"
      listHeight={238}
    >
      <Option value="lucy">Lucy</Option>
    </Select>
  </div>
```

<br />
<h3>Select with search field</h3>
<p>Search the options while expanded.</p>

```js
  import { Select } from 'antd';
  const { Option } = Select;
  function onChange(value) {
    console.log(`selected ${value}`);
  }
  function onBlur() {
    console.log('blur');
  }
  function onFocus() {
    console.log('focus');
  }
  function onSearch(val) {
    console.log('search:', val);
  }
  <Select
    size="large"
    showSearch
    style={{ width: 200 }}
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    onSearch={onSearch}
    filterOption={(input, option) =>
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    dropdownClassName="ant-select-multiple-menu"
    listHeight={238}
  >
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="tom">Tom</Option>
  </Select>
```

<br />
<h3>Multiple selection</h3>
<p>Multiple selection, selecting from existing items.</p>

```js
  import { Select } from 'antd';
  
  const { Option } = Select;
  const children = [];

  for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{'Option ' + i}</Option>);
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  <Select
    mode="multiple"
    style={{ width: '50%' }}
    placeholder="Please select"
    defaultValue={['Option 1', 'Option 2']}
    onChange={handleChange}
    dropdownClassName="ant-select-multiple-menu"
    listHeight={238}
  >
    {children}
  </Select>
```

<br />
<h3>Tags</h3>
<p>Select with tags, transform input to tag (scroll the menu)</p>

```js
  import { Select } from 'antd';

  const { Option } = Select;

  const children = [];

  for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{'Option ' + i}</Option>);
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  <Select
    mode="tags"
    style={{ width: '50%' }}
    placeholder="Tags Mode"
    onChange={handleChange}
    dropdownClassName="ant-select-multiple-menu"
    listHeight={238}
  >
    {children}
  </Select>
```

<br />
<h3>Custom dropdown</h3>
<p>Customize the dropdown menu via <mark>`dropdownRender`</mark>. The selection will be closed if click <mark>`dropdownRender`</mark> area, you can prevent it by wrapping <mark>`onMouseDown={e => e.preventDefault()}`</mark></p>

```js
  import React, { useState } from 'react';
  import { Select, Divider } from 'antd';
  import { PlusOutlined } from '@ant-design/icons';

  const { Option } = Select;
  let index = 0;
  
  class App extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        items: ['Option 1', 'Option 2', 'Option 3']
      };
    }
    
    render() {
      const { items } = this.state;
      return (
        <Select
          size="large"
          style={{ width: 160 }}
          placeholder="Custom option"
          dropdownClassName="ant-select-multiple-menu"
          listHeight={238}
          dropdownRender={menu => (
            <div>
              {menu}
              <Divider style={{ margin: '4px 0' }} />
              <div
                className="ant-custom-dropdown__add-button"
                style={{ padding: '8px 16px', cursor: 'pointer' }}
                onMouseDown={e => e.preventDefault()}
                
                onClick={() => this.setState({ count: this.state.items.push(`New item ${index++}`) })}
              >
                <PlusOutlined /> Add item
              </div>
            </div>
          )}
        >
          {items.map(item => (
            <Option key={item}>{item}</Option>
          ))}
        </Select>
      );
    }
  }
  <App />
```
