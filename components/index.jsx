import React, { Component } from 'react'
import { Layout, Button } from 'antd';
import Editor from './Editor'
import FileList from './Directory'
import NavBar from './helpers';
import { parseFiles } from './helpers/util-functions';
import { Container } from './styles';

const { Header, Content, Sider } = Layout;

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabList: [],
      fileList: [],
      defaultSelectedFiles: [],
      currentKey: null,
    }
  }

  componentDidMount() {
    const value = localStorage.getItem('files');
    const selectedKeys = localStorage.getItem('selectedFiles');
    this.setState({
      fileList: value ? JSON.parse(value) : [],
      defaultSelectedFiles: selectedKeys
    });
  }

  onUpload = async (event) => {
    const { files: eventFiles } = event.target;
    const files = [...eventFiles];
    const values = await parseFiles(files);

    this.setState({ fileList: values });
    localStorage.setItem('files', JSON.stringify(values));
  }

  onFileChange = (event) => {
    const { fileList } = this.state;
    const { node } = event;
    const { key, isLeaf } = node;

    if (isLeaf) {
      this.setState({
        tabList: fileList.filter((file) => file.key === key),
        defaultSelectedFiles: [key],
      });
      localStorage.setItem('selectedFiles', JSON.stringify(key));
      // defaultSelectedKeys
    }
  }

  onTabChange = (key) => {
    this.setState({ currentKey: key })
  }

  render() {
    const { fileList, tabList, defaultSelectedFiles } = this.state;

    return (
      <Container>
        <Layout>
          <Header className="header">
            <NavBar onUpload={this.onUpload} />
          </Header>

          <Layout>
            <Sider width={300} className="site-layout-background">
              <FileList
                paths={fileList.map(({ key }) => key)}
                defaultSelectedFiles={defaultSelectedFiles}
                onFileChange={this.onFileChange}
              />
            </Sider>

            <Layout>
              <Content className="site-layout-background">
                <Editor tabList={tabList} />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Container>
    )
  }
}

