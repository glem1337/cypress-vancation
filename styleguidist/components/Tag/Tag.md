<a href="https://ant.design/components/tag/" title="More details about Ant tag">More details here</a>
<br />
<br />
<h3>When To Use</h3>
<ul>
  <li>It can be used to tag by dimension or property.</li>
  <li>When categorizing.</li>
</ul>
<br />
<h3>Basic</h3>
<p>Usage of basic Tag, and it could be closable by set <mark>closable</mark> property. Closable Tag supports <mark>onClose</mark> events..</p>

```js
  import { Tag } from 'antd';

  <div>
    <Tag color="#396aff">
      <a href="#" title="Tag text">Tag text</a>
    </Tag>
    <Tag>
      <a href="#" title="Tag text">Tag text</a>
    </Tag>
    <Tag color="#ff5d5d">
      <a href="#" title="Tag text">Tag text</a>
    </Tag>
  </div>
```

<br />
<h3>Has icon</h3>

```js
  import { Tag } from 'antd';
  import { PlusOutlined } from '@ant-design/icons';

  <div>
    <Tag color="#108ee9">
      <a href="#" title="Tag text">No icon</a>
    </Tag>
    <Tag color="#108ee9">
      <a href="#" title="Tag text">
        <PlusOutlined style={{ marginRight: 4 }} />
        Left icon
      </a>
    </Tag>
    <Tag color="#108ee9">
      Right icon
      <PlusOutlined style={{ marginLeft: 4 }} />
    </Tag>
  </div>
```
<br />
<h3>Add Tag</h3>

```js
  import React, {useState} from 'react';
  import { Tag, Input, Tooltip, Icon } from 'antd';
  import { PlusOutlined } from '@ant-design/icons';

  function EditableTagGroup() {
    const [ tags, setTegs ] = useState([
      'Unremovable', 'Tag 2', 'Tag 3'
    ]);
    const [ inputVisible, setInputVisible ] = useState(false);
    const [ inputValue, setInputValue ] = useState('');

    showInput = () => setInputVisible(!inputVisible);

    handleInputChange = e => setInputValue( e.target.value);

    handleInputConfirm = () => {
      if (inputValue && tags.indexOf(inputValue) === -1) setTegs([...tags, inputValue]);
      setInputVisible(false);
      setInputValue('');
    };

    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable={index !== 0}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible && (
          <Input
            className="ant-tag__input"
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={() => showInput()} style={{ borderStyle: 'dashed' }}>
            <PlusOutlined />
            New Tag
          </Tag>
        )}
      </div>
    );
  }

  <EditableTagGroup />
```
