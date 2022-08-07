import React, { useState } from 'react';
import { Button, message } from 'antd';
import { loginRule } from 'utils/rules';
import IconMap from 'components/IconMap';
import $http from 'api';

const SmCodeLogin = ({ FormItem, Input, form }) => {
  const [disabled, setDisabled] = useState(true);
  // 验证码的是否发送的状态，区分文字显示：发送验证码 or 时间减少
  const [currentStatus, setCurrentStatus] = useState(true);
  let [currentTime, setCurrentTime] = useState(60);

  //- 发送验证码组件内部进行发送
  const _sendSmCode = async () => {
    setCurrentStatus(false);
    //- 获取当前用户输入的手机号码
    const mobile = form.getFieldValue('mobile');
    const res = await $http.getSmCode({ mobile });
    message.success(res.msg);
    setDisabled(true);
    runTime();
  };

  //- 开始倒计时
  const runTime = () => {
    const timer = setInterval(() => {
      if (currentTime === 0) {
        clearInterval(timer);
        setCurrentStatus(true);
        setDisabled(false);
        setCurrentTime(60);
        return;
      }
      setCurrentTime(--currentTime);
    }, 1000);
  };
  //- 发送验证码验证手机号是否正确
  const mobileValChange = async () => {
    try {
      /**
       * 由于mobileValueChange直接拿取的是一个对象，比较麻烦，我们可以采用Form的实例
       *    form.validateFields([表单名称]) 实例
       * 当我们处理一些实例对象时，form表单的实例对象非常有用的
       */
      const status = await form.validateFields(['mobile']);
      setDisabled(false);
    } catch (error) {
      setDisabled(true);
    }
  };

  return (
    <div>
      <FormItem name="mobile" rules={loginRule.mobileRule} hasFeedback>
        <Input
          prefix={IconMap.mobileIcon}
          placeholder="请输入您的手机号码"
          onChange={mobileValChange}
        />
      </FormItem>
      <FormItem name="code" rules={loginRule.smCodeRule}>
        <Input
          prefix={IconMap.smCodeIcon}
          addonAfter={
            <Button onClick={_sendSmCode} disabled={disabled}>
              {currentStatus ? '发送验证码' : `${currentTime}秒后重新发送`}
            </Button>
          }
          placeholder="请输入验证码"
        />
      </FormItem>
    </div>
  );
};

export default SmCodeLogin;
