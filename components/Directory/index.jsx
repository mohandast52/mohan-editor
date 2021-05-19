import React from 'react';
import { Tree } from 'antd';

const { DirectoryTree } = Tree;

/**
 * @param {String} currKey 
 * @returns true/false if we support the file.
 */
const isValidFile = (currKey) => {
  const temp = currKey.match(/\.[0-9a-z]+$/i);
  return temp ? [".jsx", ".css", ".js"].includes(currKey.match(/\.[0-9a-z]+$/i)[0]) : false;
}

/**
 * 
 * @param {Object} tree 
 * @returns {Array} convert the object to data compatible for tree
 */
const GENERATE_TREE = (tree) => {
  const finalTree = [];
  for (const [key, value] of Object.entries(tree)) {
    const temp = { title: key };

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

const GET_TREE_OBJECT = (values) => {
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

  return GENERATE_TREE(finalTreeObject);
}

/**
 * -----------------------------------------------------------------
 * @param {Object} paths 
 * @param {Function} onFileChange 
 * @returns {Component}
 */
const FileList = ({ paths, activeTab, onExpand, selectedDir, onFileChange }) => {
  const treeData = GET_TREE_OBJECT(paths);

  const onSelect = (_keys, event) => {
    onFileChange(_keys, event);
  };

  console.log([activeTab]);
  return (
    <DirectoryTree
      treeData={treeData}
      expandedKeys={selectedDir}
      selectedKeys={[activeTab]}
      onExpand={onExpand}
      onSelect={onSelect}
    />
  );
};

export default FileList;