import React, { useState } from 'react'
import Router from 'next/router'
import { Switch, Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

const NavBar = ({ onUpload }) => {
  const [isLightMode, setTheme] = useState(true);
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    Router.push('/');
  }

  const onChange = () => {
    if (isLightMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    setTheme(!isLightMode);
  }

  return (
    <>
      <div className="logo">Mohan's Editor</div>
      <div className="actions">
        <input
          type="file"
          id="filepicker"
          webkitdirectory="true"
          accept=".jsx, .css, .js"
          onChange={onUpload}
          style={{ display: 'none' }}
        />

        <Button
          ghost
          type="primary"
          onClick={() => document.getElementById('filepicker').click()}
        >
          Upload Directory
        </Button>

        <Button
          danger
          icon={<PoweroffOutlined />}
          onClick={handleLogout}
          data-testid="test-btn-logout"
        />

        <Switch
          checkedChildren="Light"
          unCheckedChildren="Dark"
          checked={isLightMode}
          onChange={onChange}
          data-testid="mode-toggle"
        />
      </div>
    </>
  )
}

export default NavBar
