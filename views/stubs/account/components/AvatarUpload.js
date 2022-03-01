import React from 'react';
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class AvatarUpload extends React.Component {
  state = {
    loading: false,
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.

      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  };

  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <i className="icon icon-upload" />}
        <div className="ant-upload-txt">Upload Image</div>
      </div>
    );

    return (
      <div className="main-account__profile-img">
        <ImgCrop
          modalTitle="Upload photo"
          modalOk="Save"
          shape="round"
          zoom={false}
        >
          <Upload
            className="main-avatar-upload"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            maxCount={1}
          >
            {imageUrl ? <img className="someTRY" src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </ImgCrop>
      </div>
    );
  }
}

export default AvatarUpload;
