import React from 'react';
import IconMap from 'components/IconMap';
import { loginRule } from 'utils/rules';

const UpdatePassword = ({ FormItem, Input, form }) => {
  return (
    <div>
      <FormItem name="password" rules={loginRule.passwordRule} hasFeedback>
        <Input
          prefix={IconMap.passwordIcon}
          placeholder="新的登录密码"
          type="password"
        />
      </FormItem>
      <FormItem
        name="confirmPassword"
        rules={loginRule.confirmPasswordRule(form)}
        hasFeedback
      >
        <Input
          prefix={IconMap.passwordIcon}
          type="password"
          placeholder="请确认输入新的登陆密码"
        />
      </FormItem>
    </div>
  );
};

export default UpdatePassword;
