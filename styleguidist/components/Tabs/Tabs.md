<a href="https://ant.design/components/tabs/" title="More details about Ant tabs">More details here</a>
<br />
<br />
<br />
<h3>When To Use</h3>
<p>Ant Design has 3 types of Tabs for different situations.</p>
<ul>
  <li>Card Tabs: for managing too many closeable views.</li>
  <li>Normal Tabs: for functional aspects of a page.</li>
  <li>RadioButton: for secondary tabs.</li>
</ul>
<br />
<h3>Basic</h3>
<p>Default activate first tab.</p>

```js
  import { Tabs } from 'antd';

  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Active tab" key="1">
      Content of Tab Pane 1
    </TabPane>
    <TabPane tab="Default tab" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Default tab" key="3">
      Content of Tab Pane 3
    </TabPane>
    <TabPane tab="Disabled tab" key="4" disabled>
      Content of Tab Pane 4
    </TabPane>
  </Tabs>
```

<br />
<h3>Tabs position</h3>
<p>The vertical arrangement of tabs.</p>

```js
  import { Tabs } from 'antd';

  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  <Tabs defaultActiveKey="1" onChange={callback} tabPosition="left">
    <TabPane tab="Tab 1" key="1">
      Content of Tab Pane 1
    </TabPane>
    <TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
    </TabPane>
    <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </TabPane>
    <TabPane tab="Tab 4" key="4">
      Content of Tab Pane 4
    </TabPane>
    <TabPane tab="disabled" key="5" disabled>
      Content of Tab Pane 5
    </TabPane>
  </Tabs>
```
