import React, { useState } from 'react';
import { Empty, Tree, Menu, Dropdown, Button } from 'antd';
import { LANGUAGE_TYPES } from '../helpers/util-functions';

const { DirectoryTree } = Tree;

/**
 * @param {String} currKey 
 * @returns true/false if we support the file.
 */
const isValidFile = (currKey) => {
  const temp = currKey.match(/\.[0-9a-z]+$/i);
  const extensions = (LANGUAGE_TYPES.map(({ ext }) => ext));
  return temp ? extensions.includes(currKey.match(/\.[0-9a-z]+$/i)[0]) : false;
}



/**
 * 
 * @param {Object} tree 
 * @returns {Array} convert the object to data compatible for tree
 */
const GENERATE_TREE = (tree, isMenuVisible, onNodeClick) => {
  const finalTree = [];
  for (const [key, value] of Object.entries(tree)) {
    const temp = {
      title: key,
      // title: (
      //   <Dropdown overlay={
      //     <Menu>
      //       <Menu.Item onClick={onNodeClick}>Open</Menu.Item>
      //     </Menu>
      //   }
      //     placement="bottomLeft"
      //     trigger={['click']}
      //     visible={isMenuVisible}
      //   >
      //     <span>{key}</span>
      //   </Dropdown>
      // )
    };

    if (typeof value === "string") {
      temp.key = value;
      temp.isLeaf = true;
    } else {
      temp.key = key;
      temp.children = GENERATE_TREE(value);
    }
    finalTree.push(temp);
  }
  return finalTree;
}

const GET_TREE_OBJECT = (values, isMenuVisible, onNodeClick) => {
  let finalTreeObject = {};
  let path = finalTreeObject;

  for (let i = 0; i < values.length - 0; i++) {
    let eachFile = values[i].split("/");

    for (let j = 0; j < eachFile.length; j++) {
      let currKey = eachFile[j];
      if (typeof path[currKey] === "undefined") {
        path[currKey] = isValidFile(currKey) ? values[i] : {};
        path = path[currKey];
      } else {
        path = path[currKey];
      }
    }
    path = finalTreeObject;
  }

  return GENERATE_TREE(finalTreeObject, isMenuVisible, onNodeClick);
}

/**
 * -----------------------------------------------------------------
 * @param {Object} paths 
 * @param {Function} onFileChange 
 * @returns {Component}
 */
const FileList = ({ paths, activeTab, onExpand, selectedDir, onFileChange, onOpenClick }) => {
  const [isMenuVisible, setMenu] = useState(false);
  const [nodeEvent, setEvent] = useState(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const onSelect = (_keys, event) => {
    onFileChange(_keys, event);
  };

  const onRightClick = (event) => {
    const { node } = event;
    const { isLeaf } = node;
    if (isLeaf) {
      const { clientX, clientY } = event.event;
      setPosition({ top: clientY, left: clientX })
      setMenu(true); 
      setEvent(event);
    }
  }

  const onMenuClick = () => {
    onOpenClick(nodeEvent);
    setMenu(false); 
  }

  const treeData = GET_TREE_OBJECT(paths, isMenuVisible, onMenuClick);

  if ((paths || []).length === 0) {
    return (
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        description="No files uploaded!"
        data-testid="empty-data"
      />
    );
  }

  console.log(position);

  return (
    <>
      <DirectoryTree
        data-testid="test-directory"
        treeData={treeData}
        expandedKeys={selectedDir}
        selectedKeys={[activeTab]}
        onExpand={onExpand}
        onSelect={onSelect}
        onRightClick={onRightClick}
      />
      {
        isMenuVisible && (
          <div style={{ position: 'absolute', top: `${position.top - 50}px`, left: position.left }}>
            <Menu >
              <Menu.Item onClick={onMenuClick}>
                Open
            </Menu.Item>
            </Menu>
          </div>
        )
      }
    </>
  );
};

export default FileList;