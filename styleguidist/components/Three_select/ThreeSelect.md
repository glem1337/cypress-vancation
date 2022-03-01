<p>Tree selection control.</p>
<a href="https://ant.design/components/tree-select/" title="More details about Ant tree-select">More details here</a>
<br />
<br />
<br />
<h3>When To Use</h3>
<p><mark>TreeSelect</mark> is similar to <mark>Select</mark>, but the values are provided in a tree like structure. Any data whose entries are defined in a hierarchical manner is fit to use this control. Examples of such case may include a corporate hierarchy, a directory structure, and so on.</p>
<br />
<h3>Basic</h3>
<p>The most basic usage.</p>

```js
  import React, {useState} from 'react';
  import { TreeSelect } from 'antd';

  function App() {
    const [ value, setValue ] = useState();
    
    const { TreeNode } = TreeSelect;
    
    return (
      <TreeSelect
        style={{ width: '50%' }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Select Tree"
        allowClear
        treeDefaultExpandAll
        onChange={(e) => setValue(e)}
      >
        <TreeNode value="parent 1" title="parent 1" key="0-1">
          <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
            <TreeNode value="leaf1" title="my leaf" key="random" />
            <TreeNode value="leaf2" title="your leaf" key="random1" />
          </TreeNode>
          <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
            <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
          </TreeNode>
        </TreeNode>
      </TreeSelect>
    );
  }

  <App />
```

<br />
<h3>Basic</h3>
<p>The most basic usage.</p>

```js
  import React, { useState } from 'react';
  import { TreeSelect } from 'antd';

  function App(){
    const [ value, setValue ] = useState();
    const { TreeNode } = TreeSelect;

    return (
      <TreeSelect
        showSearch
        style={{ width: '50%' }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        multiple
        treeDefaultExpandAll
        onChange={(e) => setValue(e)}
      >
        <TreeNode value="parent 1" title="parent 1" key="0-1">
          <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
            <TreeNode value="leaf1" title="my leaf" key="random" />
            <TreeNode value="leaf2" title="your leaf" key="random1" />
          </TreeNode>
          <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
            <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
          </TreeNode>
        </TreeNode>
      </TreeSelect>
    );
  }

  <App />
```

<br />
<h3>Checkable</h3>
<p>Multiple and checkable.</p>

```js
  import React, { useState } from 'react';
  import { TreeSelect } from 'antd';

  function App(){
    const [ value, setValue ] = useState(['0-0-0']);
    const { SHOW_PARENT } = TreeSelect;
    const treeData = [
      {
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [
          {
            title: 'Child Node1',
            value: '0-0-0',
            key: '0-0-0',
          },
        ],
      },
      {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
        children: [
          {
            title: 'Child Node3',
            value: '0-1-0',
            key: '0-1-0',
          },
          {
            title: 'Child Node4',
            value: '0-1-1',
            key: '0-1-1',
          },
          {
            title: 'Child Node5',
            value: '0-1-2',
            key: '0-1-2',
          },
        ],
      },
    ];
    const tProps = {
      treeData,
      value: value,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: 'Please select',
      style: {
        width: '100%',
      },
    };
    return (
      <TreeSelect
        onChange={(e) => setValue(e)}
        {...tProps}
      />
    )
  }

  <App />
```