import styled from 'styled-components';

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
  }
`;

export const EmptyMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
  font-size: 20px;
`;