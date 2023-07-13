import { render } from '@testing-library/react';
import App from './App';
import renderWithRouter from './renderWithRouter';

test('renders without crashing', () => {
  renderWithRouter(<App />);
});
