import React from 'react'
import Router from 'next/router'
import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

const NavBar = ({ onUpload }) => {
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    Router.push('/');
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
        />
      </div>
    </>
  )
}

export default NavBar
