import { render, screen } from '@testing-library/react';
import App from './App';

import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';

test('renders app component', () => {
  render(<App />);
  const appElement = screen.getByTestId('app');
  expect(appElement).toBeInTheDocument();
});
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
