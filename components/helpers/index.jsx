import React from 'react'
import { Button } from 'antd';

const NavBar = ({ onUpload }) => {
  return (
    <>
      <div className="logo" />
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
          type="primary"
          onClick={() => document.getElementById('filepicker').click()}
        >
          Upload Directory
        </Button>

        <Button type="primary">Sign Out</Button>
      </div>
    </>
  )
}

export default NavBar
