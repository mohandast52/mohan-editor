import React, { Component } from 'react'
import Router from 'next/router';
import { Layout } from 'antd';
import Editor from './Editor'
import FileList from './Directory'
import NavBar from './helpers';
import { parseFiles } from './helpers/util-functions';
import { Container, NavbarContainer } from './styles';

const { Content, Sider } = Layout;

let timer = null;
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDir: [], /* directories which are opened */
      fileList: [],
      tabList: [],
      activeTab: null,
    }
  }

  componentDidMount() {
    /* check if the user is logged-in */
    const token = localStorage.getItem('accessToken');
    if (!token) {
      Router.push('/');
      return;
    }

    const value = localStorage.getItem('files');
    const tempFiles = localStorage.getItem('expandedFiles');
    const tempTabList = localStorage.getItem('tabList');
    const tempActiveTab = localStorage.getItem('activeTab');

    this.setState({
      fileList: value ? JSON.parse(value) : [],
      selectedDir: tempFiles ? JSON.parse(tempFiles) : [],
      tabList: tempTabList ? JSON.parse(tempTabList) : [],
      activeTab: tempActiveTab ? tempActiveTab : null,
    });
  }

  /* ----------- files ----------- */
  onUpload = async (event) => {
    const { files: eventFiles } = event.target;
    const files = [...eventFiles];
    const values = await parseFiles(files);

    this.setState({ fileList: values });
    localStorage.setItem('files', JSON.stringify(values));
  }

  onExpand = (keys) => {
    this.setState({ selectedDir: keys });
    localStorage.setItem('expandedFiles', JSON.stringify(keys));
  }

  onFileChange = (_keys, event) => {
    const { fileList, tabList } = this.state;
    const { node } = event;
    const { key, isLeaf } = node;

    /* should be leaf node */
    if (!isLeaf) return;

    /* if tabList contains the key => already opened, just set the current-tab*/
    if (tabList.find((file) => file.key === key)) {
      this.setState({ activeTab: key });
      return;
    }

    clearTimeout(timer);
    if (event.nativeEvent.detail === 1) {
      timer = setTimeout(() => {
        this.setState({
          tabList: fileList.filter((file) => file.key === key),
          activeTab: key,
        }, this.afterFileChange);
      }, 200)
    } else if (event.nativeEvent.detail === 2) {
      this.setState({
        tabList: [...tabList, ...fileList.filter((file) => file.key === key)],
        activeTab: key,
      }, this.afterFileChange);
    }
  }

  afterFileChange = () => {
    const { tabList, activeTab } = this.state;
    localStorage.setItem('tabList', JSON.stringify(tabList));
    localStorage.setItem('activeTab', activeTab);
  }

  /* ----------- tab/editor functions ----------- */
  onTabChange = (key) => {
    this.setState({ activeTab: key })
  }

  updateTabDetails = (values) => {
    this.setState(values);
  }

  /* ----------- render ----------- */
  render() {
    const { selectedDir, fileList, tabList, activeTab } = this.state;

    return (
      <Container>
        <Layout>
          <NavbarContainer className="header">
            <NavBar onUpload={this.onUpload} />
          </NavbarContainer>

          <Layout>
            <Sider width={300} className="site-layout-background">
              <FileList
                paths={fileList.map(({ key }) => key)}
                selectedDir={selectedDir}
                activeTab={activeTab}
                onExpand={this.onExpand}
                onFileChange={this.onFileChange}
              />
            </Sider>

            <Layout>
              <Content className="site-layout-background">
                <Editor
                  activeTab={activeTab}
                  tabList={tabList}
                  onTabChange={this.onTabChange}
                  updateTabDetails={this.updateTabDetails}
                />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Container>
    )
  }
}

