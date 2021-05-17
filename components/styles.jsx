import styled from 'styled-components';
import { Layout } from 'antd';

const { Header } = Layout;

export const Container = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .actions button {
      margin-left: 1rem;
    }
  }

  .ant-tree-directory {
    height: 100%;
    border: 0;
    padding: 16px 0;
  }

  .ant-layout-has-sider {
    height: calc(100vh - 64px);
  }

  .ant-layout-content.site-layout-background {
    padding: 24px;
    margin: 0px;
    min-height: 280px;
    .ant-spin-nested-loading {
      height: 800px;
    }
  }

  .ant-tabs-tab-active {
    border-color: #2A8FF7 !important;
  }
`;

export const NavbarContainer = styled(Header)`
  background: #FFF !important;
  box-shadow: 0 2px 8px #f0f1f2;
  max-width: 100%;
  position: relative;
  z-index: 10;
  .logo {
    position: relative;
    font-size: 22px;
    letter-spacing: 2px;
    word-spacing: 12px;
    text-shadow: -1px 1px 0px #46444447;
  }
  .actions {
    display: flex;
    align-items: center;
  }
`;

export const EmptyMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
  font-size: 20px;
  .ant-alert {
    padding: 3rem 4rem;
    font-size: 1.05rem;
  }
`;

export const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    color: #2A8FF7 !important;
    border-color: #2A8FF7 !important;
    > div {
      line-height: 16px;
      margin-top: 2px;
    }
  }
`;