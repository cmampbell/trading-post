import { render } from '@testing-library/react';
import App from './App';
import renderWithRouter from './renderWithRouter';
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useLoaderData: function () {
      return ['test', `"currUser":"{"username":"test", "userId":3}"`]
  }
}));

test('renders without crashing', () => {
  renderWithRouter(<App />);
});
