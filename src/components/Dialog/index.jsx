import React from 'react';
import { Modal } from 'antd';

const Dialog = ({
  title,
  dialogStatus,
  render,
  setDialogStatus,
  width = 600,
  className = '',
}) => {
  return (
    <Modal
      width={width}
      className={className}
      destroyOnClose={true}
      centered={true}
      title={title}
      visible={dialogStatus}
      onCancel={() => setDialogStatus(false)}
      footer={null}
    >
      {render()}
    </Modal>
  );
};

export default Dialog;
