import React, { useEffect, useState } from 'react';
import $http from 'api';
import { Upload, Modal } from 'antd';

/*
 * 前端直传
 * 七牛云存储（对象存储）
 * token值
 */

const UploadComponent = ({ avatar = null, getNewAvatar }) => {
  const [token, setToken] = useState('');
  const [fileList, setFileList] = useState([]);
  const [previewImg, setPreviewImg] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    if (avatar) {
      setFileList([{ url: avatar }]);
      setPreviewImg(avatar);
    }
    _getToken();
  }, []);

  //- 图片预览处理函数
  const handlePreview = () => {
    setIsShowModal(true);
  };

  //- 图片发生改变
  const handleChange = (info) => {
    setFileList(info.fileList);
    if (info.file.status === 'done') {
      setPreviewImg('//' + info.file.response.url);
      getNewAvatar('//' + info.file.response.url);
      if (previewImg || avatar) {
        _deletePreviewImg();
      }
    }
  };

  //- 删除之前的图片
  const _deletePreviewImg = async () => {
    const res = await $http.deleteFile({
      bucket: 'oa-demo',
      fileName: previewImg ? previewImg : avatar,
      accessKey: '8QQD0qX3ER_tMNfKMeYfueFECLJW1Zyg7zExska0', //- 公钥
      secretKey: 'T4fa8ULII7kOxqv9oCDRGhC3zb37vSKnXPtFYPQk', //- 私钥
    });
  };

  //- 获取token
  const _getToken = async () => {
    const { data } = await $http.getUploadToken({
      bucket: 'oa-demo',
      uploadUrl: 'r3l03lzeo.hd-bkt.clouddn.com',
      accessKey: '8QQD0qX3ER_tMNfKMeYfueFECLJW1Zyg7zExska0', //- 公钥
      secretKey: 'T4fa8ULII7kOxqv9oCDRGhC3zb37vSKnXPtFYPQk', //- 私钥
    });
    setToken(data);
  };

  //- 处理预览关闭
  const handelPreClose = () => {
    setIsShowModal(false);
  };

  /*
   *z0 华东
   *z1 华北
   */
  return (
    <>
      <Upload
        maxCount={1}
        action="https://up-z0.qiniup.com/"
        listType="picture-card"
        fileList={fileList}
        data={{ token }}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        选择图片
      </Upload>
      <Modal
        visible={isShowModal}
        footer={null}
        closable={false}
        onCancel={handelPreClose}
      >
        <img style={{ width: '100%' }} src={previewImg} />
      </Modal>
    </>
  );
};

export default UploadComponent;
