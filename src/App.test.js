import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.js';

test('renders without crashing', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});