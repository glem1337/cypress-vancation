<a href="https://ant.design/components/button/" title="More details about Ant button">More details here</a>
<br />
<br />
<br />
<h3>When To Use</h3>
<p>A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.s</p>
<p>In Ant Design we provide 4 types of button.</p>
<ul>
  <li>Primary button: indicate the main action, one primary button at most in one section.</li>
  <li>Default button: indicate a series of actions without priority.</li>
  <li>Dashed button: used for adding action commonly.</li>
  <li>Link button: used for external links.</li>
</ul>
<p>And 4 other properties additionally.</p>
<ol>
  <li><mark>danger:</mark> used for actions of risk, like deletion or authorization.</li>
  <li><mark>ghost:</mark> used in situations with complex background, home pages usually.</li>
  <li><mark>disabled:</mark> when actions is not available.</li>
  <li><mark>loading:</mark> add loading spinner in button, avoiding multiple submits too.</li>
</ol>
<br />
<br />
<h3>Size</h3>
<p>
  There are <mark>large</mark>, <mark>medium</mark>, <mark>small</mark> button in antd.
</p>

```jsx
  import { Button } from 'antd';
  import { PlusOutlined } from '@ant-design/icons';

  const rowStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '30%',
    marginBottom: 16
  };

  <div>
    <div style={rowStyles}>
      <Button type="primary" size="large">Large</Button>
      <Button type="primary" size="large" icon={<PlusOutlined />}/>
      <Button type="primary" size="large" icon={<PlusOutlined />} shape="circle" />
      <Button type="primary" size="large" icon={<PlusOutlined />} shape="round" />
    </div>
    <div style={rowStyles}>
      <Button type="primary">Medium</Button>
      <Button type="primary" icon={<PlusOutlined />} />
      <Button type="primary" icon={<PlusOutlined />} shape="circle"/>
      <Button type="primary" icon={<PlusOutlined />} shape="round"/>
    </div>
    <div style={rowStyles}>
      <Button type="primary" size="small">Small</Button>
      <Button type="primary" size="small" icon={<PlusOutlined />} />
      <Button type="primary" size="small" icon={<PlusOutlined />} shape="circle"/>
      <Button type="primary" size="small" icon={<PlusOutlined />} shape="round"/>
    </div>
  </div>
```

<h3>Type</h3>
<p>
  There are <mark>primary</mark> button, <mark>default</mark> button, <mark>dashed</mark> button, <mark>danger</mark> button and <mark>link</mark> button in antd.
</p>

```jsx
  import { Button } from 'antd';

  const rowStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '55%'
  };

  <div style={rowStyles}>  
    <Button type="primary">Primary</Button>
    <Button >Default</Button>
    <Button type="link">Link</Button>
    <Button type="danger">Danger</Button>
    <Button type="primary" disabled>Disabled</Button>
  </div>
```


<h3>Delete - custom button</h3>
<p>
  This button is not in the library. It was created by mixing props.
</p>

```jsx
  import { Button } from 'antd';

  const rowStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '30%',
    marginBottom: 16
  };

  <div style={rowStyles}>
    <Button danger>Delete</Button>
    <Button danger loading />
    <Button disabled>disabled</Button>
  </div>
```

<h3>States</h3>

```jsx
  import { Button } from 'antd';

  const rowStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '30%',
    marginBottom: 16
  };

  <div>
    <div style={rowStyles}>
      <Button type="primary">Primary</Button>
      <Button type="primary" loading />
      <Button type="primary" disabled>disabled</Button>
    </div>
    <div style={rowStyles}>
      <Button >Default</Button>
      <Button loading />
      <Button disabled>disabled</Button>
    </div>
    <div style={rowStyles}>
      <Button type="link">Link</Button>
      <Button loading />
      <Button type="link" disabled>disabled</Button>
    </div>
    <div style={rowStyles}>
      <Button type="danger">Danger</Button>
      <Button type="danger" loading />
      <Button type="danger" disabled>disabled</Button>
    </div>
  </div>
```


<h3>Icon</h3>
<p>
  <mark>Button</mark> components can contain an <mark>Icon</mark>.This is done by setting the <mark>icon</mark> property or placing an <mark>Icon</mark> component within the <mark>Button</mark>.    
  If you want specific control over the positioning and placement of the <mark>Icon</mark>, then that should be done by placing the <mark>Icon</mark> component within the <mark>Button</mark> rather than using the <mark>icon</mark> property.
</p>

```jsx
  import { Button, Tooltip } from 'antd';
  import { SearchOutlined } from '@ant-design/icons';

  const rowStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '20%',
    marginBottom: 16
  };

  <div>
    <div style={rowStyles}>
      <Button icon={<SearchOutlined />} type="primary" shape="circle" />
      <Button icon={<SearchOutlined />} type="primary">Search</Button>
    </div>
    <div style={rowStyles}>
      <Button icon={<SearchOutlined />} shape="circle" />
      <Button icon={<SearchOutlined />}>Search</Button>
    </div>
    <div style={rowStyles}>
      <Button icon={<SearchOutlined />} type="dashed" shape="circle" />
      <Button icon={<SearchOutlined />} type="dashed">Search</Button>
    </div>
  </div>
```
<h3>Button Group</h3>
<p>
  Buttons can be grouped by placing multiple <mark>Button</mark> components into a <mark>Button.Group</mark>. The <mark>size</mark> can be set to <mark>large</mark>, <mark>small</mark> or left unset resulting in a default size.
</p>

```jsx
  import { Button, Radio } from 'antd';
  import {
    DownloadOutlined,
    LeftOutlined,
    RightOutlined
  } from '@ant-design/icons';

  const buttonStyle = {
    marginBottom: 16,
    marginRight: 16
  };

  <div>
    <div>
      <Button type="primary" size="large" icon={<DownloadOutlined />} shape="round" style={buttonStyle}>
        Download
      </Button>
      <Button type="primary" size="large" style={buttonStyle}>
        <DownloadOutlined />
        Left Icon
      </Button>
      <Button type="primary" size="large" style={buttonStyle}>
        Right Icon
        <DownloadOutlined />
      </Button>
    </div>
    <div>
      <Button.Group size="large" style={buttonStyle}>
        <Button type="primary">
          <LeftOutlined />
          Backward
        </Button>
        <Button type="primary">
          Forward
          <RightOutlined />
        </Button>
      </Button.Group>
      <Button.Group size="large" style={buttonStyle}>
        <Button type="primary">
          Action Left
        </Button>
        <Button type="primary">
          Action Center
        </Button>
        <Button type="primary">
          Action Right
        </Button>
      </Button.Group>
    </div>
  </div>
```

<h3>Multiple Buttons</h3>
<p>
  If you need several buttons, we recommend that you use 1 primary button + n secondary buttons, and if there are more than three operations, you can group some of them into <mark>Dropdown.Button</mark>.
</p>

```jsx
  import { Button, Menu, Dropdown } from 'antd';
  import { DownOutlined } from '@ant-design/icons';

  const buttonStyle = {
    marginBottom: 16,
    marginRight: 16
  };

  function handleMenuClick(e) {
    console.log('click', e);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">1st item</Menu.Item>
      <Menu.Item key="2">2nd item</Menu.Item>
      <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
  );

  <div>
    <Button type="primary" style={buttonStyle}>Primary</Button>
    <Button style={buttonStyle}>Secondary</Button>
    <Dropdown overlay={menu} style={buttonStyle}>
      <Button>
        Actions <DownOutlined />
      </Button>
    </Dropdown>
  </div>
```

<br />
<h3>Loading</h3>
<p>
  A loading indicator can be added to a button by setting the <mark>loading</mark> property on the <mark>Button</mark>.
</p>

```jsx
  import { Button } from 'antd';

  const rowStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '25%',
    marginBottom: 16
  };

  <div style={rowStyles}>
    <Button type="primary" loading />
    <Button type="primary" size="small" loading />
    <Button type="primary" shape="circle" loading />
    <Button type="danger" shape="round" loading />
  </div>
```
<br />
<h3>More buttons</h3>

```jsx
  import { Button } from 'antd';

  <div>
    <br />
    <Button style={{ marginRight: 16, marginBottom: 16 }} type="dashed">Dashed</Button>
    <Button style={{ marginRight: 16, marginBottom: 16 }} type="dashed" disabled>
      Dashed(disabled)
    </Button>
    <br />
    <Button style={{ marginRight: 16, marginBottom: 16 }} danger>Danger Default</Button>
    <Button danger disabled>
      Danger Default(disabled)
    </Button>
    <br />
    <Button style={{ marginRight: 16, marginBottom: 16 }} type="link" danger>
      Danger Link
    </Button>
    <Button type="link" danger disabled>
      Danger Link(disabled)
    </Button>
  </div>
```

<br />
<h3>Block Button</h3>
<p>
  <mark>block</mark> property will make the button fit to its parent width.
</p>

```jsx
  import { Button } from 'antd';

  const buttonStyle = {
    marginBottom: 16
  };

  <div>
    <Button style={buttonStyle} block type="primary">Primary</Button>
    <Button style={buttonStyle} block>Default</Button>
    <Button style={buttonStyle} block type="dashed">Dashed</Button>
    <Button style={buttonStyle} block type="danger">Danger</Button>
    <Button style={buttonStyle} block type="link">Link</Button>
  </div>
```
