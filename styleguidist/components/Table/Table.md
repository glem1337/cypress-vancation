<a href="https://ant.design/components/table/" title="More details about Ant table">More details here</a>
<br />
<br />
<br />
<h3>When To Use</h3>
<ul>
  <li>To display a collection of structured data.</li>
  <li>To sort, search, paginate, filter data.</li>
</ul>
<br />
<h3>Basic Usage</h3>
<p>Click <mark>TimePicker</mark>, and then we could select or input a time in panel.</p>

```js
  import { Table, Tag, Button, Avatar } from 'antd';
  import { DeleteOutlined } from '@ant-design/icons';

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => (
        <>
          <Avatar
            style={{ marginRight: 12 }}
            icon="user"
            src="https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png"
          />
          {' '}
          {text}
        </>
      )
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span style={{ display: 'flex', justifyContent: 'space-between'  }}>
          <Button size="small" type="primary" >Invite User</Button>
          <Button
            size="small"
            type="link"
            style={{ fontSize: 24, lineHeight: '24px' }}
          >
            <DeleteOutlined style={{ width: 24 }}/>
          </Button>
        </span>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Akumjeli Akuchi',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Nitithorn Prinya',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'María Paula Morterero',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  <Table columns={columns} dataSource={data} />
```

<br />
<h3>Multiple sorter</h3>
<p><mark>column.sorter</mark> support <mark>multiple</mark> to config the priority of sort columns. Though <mark>sorter.compare</mark> to customize compare function. You can also leave it empty to use the interactive only.</p>

```js
  import { Table } from 'antd';

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Chinese Score',
      dataIndex: 'chinese',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: 'Math Score',
      dataIndex: 'math',
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: 'English Score',
      dataIndex: 'english',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      chinese: 98,
      math: 60,
      english: 70,
    },
    {
      key: '2',
      name: 'Jim Green',
      chinese: 98,
      math: 66,
      english: 89,
    },
    {
      key: '3',
      name: 'Joe Black',
      chinese: 98,
      math: 90,
      english: 70,
    },
    {
      key: '4',
      name: 'Jim Red',
      chinese: 88,
      math: 99,
      english: 89,
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  <Table columns={columns} dataSource={data} onChange={onChange} />
```

<br />
<h3>Selection</h3>
<p>Rows can be selectable by making first column as a selectable column. You can use <mark>rowSelection.type</mark> to set selection type. Default is <mark>checkbox.</mark></p>

```js
  import React, { useState } from 'react';
  import { Table, Radio, Divider } from 'antd';

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Disabled User',
      age: 99,
      address: 'Sidney No. 1 Lake Park',
    },
  ]; // rowSelection object indicates the need for row selection

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const Demo = () => {
    const [selectionType, setSelectionType] = useState('checkbox');
    return (
      <div>
        <Radio.Group
          onChange={({ target: { value } }) => {
            setSelectionType(value);
          }}
          value={selectionType}
        >
          <Radio value="checkbox">Checkbox</Radio>
          <Radio value="radio">radio</Radio>
        </Radio.Group>

        <Divider />

        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />
      </div>
    );
  };

  <Demo />
```

<br />
<h3>Selection</h3>
<p>Rows can be selectable by making first column as a selectable column. You can use <mark>rowSelection.type</mark> to set selection type. Default is <mark>checkbox.</mark></p>

```js
  import React, { useState } from 'react';
  import { Table, Button } from 'antd';
  import { DeleteOutlined, FileOutlined, CopyOutlined } from '@ant-design/icons';

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }

  function App() {
    const [ selectedRowKeys, setSelectedRowKeys ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    start = () => {
      setLoading(true);
      // ajax request after empty completing
      setTimeout(() => {
        setSelectedRowKeys([]);
        setLoading(false);
      }, 1000);
    };
    onSelectChange = selectedRowKeys => {
      setSelectedRowKeys(selectedRowKeys);
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
              Reload
            </Button>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>
          </div>
          <div>
            <Button
              size="small"
              type="link"
            >
              <FileOutlined style={{ width: 24 }}/>
              <span style={{ fontSize: 14, lineHeight: '20px' }}>Export</span>
            </Button>
            <Button
              size="small"
              type="link"
            >
              <CopyOutlined style={{ width: 24 }}/>
              <span style={{ fontSize: 14, lineHeight: '20px' }}>Duplicate</span>
            </Button>
            <Button
              size="small"
              type="link"
            >
              <DeleteOutlined style={{ width: 24 }}/>
              <span style={{ fontSize: 14, lineHeight: '20px' }}>Delete</span>
            </Button>
          </div>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    );
  };

  <App />
```

<br />
<h3>Nested tables</h3>
<p>Showing more detailed info of every row.</p>

```js
  import { Table, Badge, Menu, Dropdown } from 'antd';
  import { DownOutlined } from '@ant-design/icons';

  const menu = (
    <Menu>
      <Menu.Item>Action 1</Menu.Item>
      <Menu.Item>Action 2</Menu.Item>
    </Menu>
  );

  function NestedTable() {
    const expandedRowRender = () => {
      const columns = [
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
          title: 'Status',
          key: 'state',
          render: () => (
            <span>
              <Badge status="success" />
              Finished
            </span>
          ),
        },
        { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
        {
          title: 'Action',
          dataIndex: 'operation',
          key: 'operation',
          render: () => (
            <span className="table-operation">
              <a>Pause</a>
              <a>Stop</a>
              <Dropdown overlay={menu}>
                <a>
                  More <DownOutlined />
                </a>
              </Dropdown>
            </span>
          ),
        },
      ];

      const data = [];
      for (let i = 0; i < 3; ++i) {
        data.push({
          key: i,
          date: '2014-12-24 23:12:00',
          name: 'This is production name',
          upgradeNum: 'Upgraded: 56',
        });
      }
      return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Platform', dataIndex: 'platform', key: 'platform' },
      { title: 'Version', dataIndex: 'version', key: 'version' },
      { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      { title: 'Creator', dataIndex: 'creator', key: 'creator' },
      { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
      { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        name: 'Screem',
        platform: 'iOS',
        version: '10.3.4.5654',
        upgradeNum: 500,
        creator: 'Jack',
        createdAt: '2014-12-24 23:12:00',
      });
    }

    return (
      <Table
        className="components-table-demo-nested"
        columns={columns}
        expandedRowRender={expandedRowRender}
        dataSource={data}
      />
    );
  }

  <NestedTable />
```

<br />
<h3>Grouping table head</h3>
<p>Group table head with <mark>columns[n].children</mark>.</p>

```js
  import { Table } from 'antd';

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      fixed: 'left',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'John',
          value: 'John',
        },
      ],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: 'Other',
      children: [
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
          width: 150,
          sorter: (a, b) => a.age - b.age,
        },
        {
          title: 'Address',
          children: [
            {
              title: 'Street',
              dataIndex: 'street',
              key: 'street',
              width: 150,
            },
            {
              title: 'Block',
              children: [
                {
                  title: 'Building',
                  dataIndex: 'building',
                  key: 'building',
                  width: 100,
                },
                {
                  title: 'Door No.',
                  dataIndex: 'number',
                  key: 'number',
                  width: 100,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Company',
      children: [
        {
          title: 'Company Address',
          dataIndex: 'companyAddress',
          key: 'companyAddress',
          width: 200,
        },
        {
          title: 'Company Name',
          dataIndex: 'companyName',
          key: 'companyName',
        },
      ],
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 80,
      fixed: 'right',
    },
  ];

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: 'John Brown',
      age: i + 1,
      street: 'Lake Park',
      building: 'C',
      number: 2035,
      companyAddress: 'Lake Street 42',
      companyName: 'SoftLake Co',
      gender: 'M',
    });
  }

  <Table
    columns={columns}
    dataSource={data}
    bordered
    size="middle"
    scroll={{ x: 'calc(700px + 50%)', y: 240 }}
  />
```
