import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Directory from 'components/Directory';

describe('<Directory />', () => {
  it('Files uploaded with activeTab', () => {
    expect.hasAssertions();
    const { getByTestId, debug } = render(
      <Directory
        paths={["MyFolder/example-1.js"]}
        selectedDir={["MyFolder"]}
        activeTab="MyFolder/example-1.js"
      />
    );
    const directoryComponent = getByTestId("test-directory");
    expect(directoryComponent).toBeInTheDocument();

    // file will be open & it's child has the title
    // const file = directoryComponent.querySelector('.ant-tree-node-content-wrapper-open .ant-tree-title');
    // const file = directoryComponent.querySelector('span.ant-tree-title');
    // expect(file).toBe('MyFolder');

    const selectedNode = directoryComponent.querySelector('.ant-tree-node-selected .ant-tree-title');
    expect(selectedNode.textContent).toBe('example-1.js');
  });

  /* folder or file not selected */
  it('Files upload with no activeTab', () => {
    expect.hasAssertions();
    const { getByTestId } = render(
      <Directory
        paths={["MyFolder/example-1.js"]}
        selectedDir={[]}
        activeTab={null}
      />
    );
    const directoryComponent = getByTestId("test-directory");
    expect(directoryComponent).toBeInTheDocument();

    const file = directoryComponent.querySelector('.anticon-folder-open + span.ant-tree-title');
    expect(file).toBeNull();
  });

  it('paths is empty (folder not uploaded)', () => {
    expect.hasAssertions();
    const { getByTestId, queryByTestId } = render(
      <Directory
        paths={[]}
        selectedDir={[]}
        activeTab={null}
      />
    );

    const directoryComponent = queryByTestId("test-directory");
    expect(directoryComponent).toBeNull(); /* No data found => should NOT be present */

    const empty = getByTestId('empty-data');
    expect(empty).toBeInTheDocument();/* empty should be present */
  });
});