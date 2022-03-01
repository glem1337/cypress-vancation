<a href="https://ant.design/components/upload/" title="More details about Ant Upload">More details here</a>
<br />
<br />
<br />
<h3>When To Use</h3>
<p>Uploading is the process of publishing information (web pages, text, pictures, video, etc.) to a remote server via a web page or upload tool.</p>
<ul>
  <li>When you need to upload one or more files.</li>
  <li>When you need to show the process of uploading.</li>
  <li>When you need to upload files by dragging and dropping.</li>
</ul>
<br />
<h3>Upload by clicking</h3>
<p>Classic mode. File selection dialog pops up when upload button is clicked.</p>

```js
  import { Upload, message, Button } from 'antd';
  import { UploadOutlined } from '@ant-design/icons';

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  
  <Upload {...props}>
    <Button>
      <UploadOutlined /> Click to Upload
    </Button>
  </Upload>
```
<br />
<h3>Avatar</h3>
<p>Click to upload user's avatar, and validate size and format of picture with <mark>beforeUpload.</mark></p>

```js
  import { Upload } from 'antd';
  import { PlusOutlined } from '@ant-design/icons';

  <Upload
    name="avatar"
    listType="picture-card"
    className="avatar-uploader"
    showUploadList={false}
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
  >
    <PlusOutlined />
  </Upload>
```
