
import React, { Component } from "react";
import dynamic from "next/dynamic";
import { Tabs, Alert, Spin } from 'antd';
import { getLanguage } from '../helpers/util-functions';
import { EmptyMessage } from '../styles';

const { TabPane } = Tabs;

const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

const OPTIONS = {
  selectOnLineNumbers: true,
  readOnly: true,
};
class Editor extends Component {
  state = {
    isLoading: true
  }

  editorDidMount = (editor) => {
    editor.focus();
    this.setState({ isLoading: false });
  }

  onEdit = (targetKey, _editType) => {
    let { activeTab, tabList, updateTabDetails } = this.props;
    const newTabList = tabList.filter(pane => pane.key !== targetKey);

    if (targetKey !== activeTab) {
      updateTabDetails({ tabList: newTabList });
      return;
    }

    if (newTabList.length === 0) {
      updateTabDetails({
        activeTab: null,
        tabList: []
      });
    } else {
      updateTabDetails({
        activeTab: newTabList[0].key,
        tabList: newTabList
      });
    }
  };

  render() {
    const { isLoading } = this.state;
    const { activeTab, tabList, onTabChange } = this.props;

    if ((tabList || []).length === 0) {
      return (
        <EmptyMessage>
          <Alert
            message="Please upload directory & select a file to open editor."
            type="error"
            data-testid="no-files-selected"
          />
        </EmptyMessage>
      )
    }

    return (
      <Tabs
        type="editable-card"
        hideAdd
        activeKey={activeTab}
        onChange={onTabChange}
        onEdit={this.onEdit}
        data-testid="editor-test-id"
      >
        {tabList.map(({ key, code }) => {
          return (
            <TabPane tab={key} key={key}>
              <Spin spinning={isLoading}>
                <MonacoEditor
                  width="1000"
                  height="600"
                  language={getLanguage(key)}
                  theme="vs-light"
                  value={code}
                  options={OPTIONS}
                  editorDidMount={this.editorDidMount}
                />
              </Spin>
            </TabPane>
          )
        })}
      </Tabs>
    );
  }
}

export default Editor;