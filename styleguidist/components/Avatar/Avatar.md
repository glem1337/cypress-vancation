<p>Avatars can be used to represent people or objects. It supports images, Icons, or letters.</p>
<a href="https://ant.design/components/avatar/" target="_blank" title="More details about Ant avatar">More details here</a>
<br />
<br />
<h3>Basic</h3>
<p>Three sizes and two shapes are available.</p>

```js
  import { Avatar } from 'antd';
  import { UserOutlined } from '@ant-design/icons';

  const rowStyles = {
    marginBottom: 16
  };

  const avatarStyles = {
    marginRight: 16
  };

  <div>
    <div style={rowStyles}>
      <Avatar icon={<UserOutlined />} size={64} style={avatarStyles} />
      <Avatar icon={<UserOutlined />} size="large" style={avatarStyles} />
      <Avatar icon={<UserOutlined />} style={avatarStyles} />
      <Avatar icon={<UserOutlined />} size="small" />
    </div>
    <div>
      <Avatar shape="square" icon={<UserOutlined />} size={64} style={avatarStyles} />
      <Avatar shape="square" icon={<UserOutlined />} size="large" style={avatarStyles} />
      <Avatar shape="square" icon={<UserOutlined />} style={avatarStyles} />
      <Avatar shape="square" icon={<UserOutlined />} size="small" />
    </div>
  </div>
```

<br />
<h3>Type</h3>
<p>Image, Icon and letter are supported, and the latter two kinds of avatar can have custom colors and background colors.</p>

```js
  import { Avatar } from 'antd';
  import { UserOutlined } from '@ant-design/icons';

  const avatarIndents = {
    marginRight: 16
  };
  const avatarStyles = {
    marginRight: 16,
    color: '#f56a00',
    backgroundColor: '#fde3cf'
  };

  <div>
    <Avatar style={avatarIndents} icon={<UserOutlined />} />
    <Avatar style={avatarIndents}>U</Avatar>
    <Avatar style={avatarIndents}>USER</Avatar>
    <Avatar style={avatarIndents} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    <Avatar style={avatarStyles}>U</Avatar>
    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
  </div>
```
