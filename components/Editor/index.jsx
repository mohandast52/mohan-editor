
import React from "react";
import dynamic from "next/dynamic";
import { Tabs, Alert } from 'antd';
import { EmptyMessage } from '../styles';

const { TabPane } = Tabs;

const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

const Editor = ({ tabList }) => {
  if (tabList.length === 0) {
    return (
      <EmptyMessage>
        <Alert message="Please upload directory & select a file to open editor." type="error" />
      </EmptyMessage>
    )
  }

  const onTabChange = () => { };

  return (
    <Tabs defaultActiveKey="1" onChange={onTabChange}>
      {tabList.map(({ key, code }) => (
        <TabPane tab={key} key={key}>
          <MonacoEditor
            width="800"
            height="500"
            language="javascript"
            theme="vs-dark"
            value={code}
            options={{
              selectOnLineNumbers: true,
              readOnly: true,
            }}
          />
        </TabPane>
      ))}
    </Tabs>
  );
}

export default Editor;