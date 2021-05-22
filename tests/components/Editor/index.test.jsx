import React from 'react';
import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import Editor from 'components/Editor';

const LIST = [
  { "key": "TP/example-1.js", "code": "// example-1.js" },
  { "key": "TP/Folder 2/example-3.js", "code": "// example-3.j" }
];

describe('<Editor />', () => {
  it('No files selected', () => {
    expect.hasAssertions();
    const { getByTestId, queryByTestId } = render(
      <Editor
        tabList={[]}
        activeTab={null}
      />
    );

    const editorComponent = queryByTestId("editor-test-id");
    expect(editorComponent).toBeNull();

    const empty = getByTestId('no-files-selected');
    expect(empty).toBeInTheDocument();
  });

  it('Files selected', async () => {
    expect.hasAssertions();
    const { queryByTestId } = render(
      <Editor
        tabList={LIST}
        activeTab={"TP/example-1.js"}
      />
    );

    const editorComponent = queryByTestId("editor-test-id");
    expect(editorComponent).not.toBeNull();

    const empty = queryByTestId('no-files-selected');
    expect(empty).not.toBeInTheDocument();
  });
});