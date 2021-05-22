import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Navbar from 'components/Navbar';

describe('<Navbar />', () => {
  it('upload button present', () => {
    expect.hasAssertions();
    const { queryByText } = render(
      <Navbar />
    );

    const uploadBtn = queryByText("Upload Directory");
    expect(uploadBtn).toBeInTheDocument();
    expect(uploadBtn).not.toBeDisabled()
  });

  it('logout button present', () => {
    expect.hasAssertions();
    const { getByTestId } = render(
      <Navbar />
    );

    const uploadBtn = getByTestId("test-btn-logout");
    expect(uploadBtn).toBeInTheDocument();
    expect(uploadBtn).not.toBeDisabled()
  });

  it('dark mode works', () => {
    expect.hasAssertions();
    const { getByTestId } = render(
      <Navbar />
    );

    const toggle = getByTestId("mode-toggle");
    expect(toggle).toBeInTheDocument();
    expect(toggle).not.toBeDisabled()
  });
});