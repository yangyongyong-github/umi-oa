// @ts-nocheck
import React from 'react';
import { loginRule } from 'utils/rules';
import IconMap from 'components/IconMap';

/*
 * hasFeedback 输入框输入项是否正确的提示内容
 */

const AccountLogin = ({ FormItem, Input }) => {
  return (
    <div>
      {/* hasFeedback 右侧小图标展示 */}
      <FormItem name="accountName" rules={loginRule.userRule} hasFeedback>
        <Input prefix={IconMap.userIcon} placeholder="请输入用户名" />
      </FormItem>
      <FormItem name="password" rules={loginRule.passwordRule} hasFeedback>
        <Input
          prefix={IconMap.passwordIcon}
          type="password"
          placeholder="请输入密码"
        />
      </FormItem>
    </div>
  );
};

export default AccountLogin;
