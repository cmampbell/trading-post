import App from './App';
import renderWithRouter from './_common/renderWithRouter';

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useLoaderData: function () {
    return ['test', `"currUser":"{"username":"test", "userId":3}"`]
  }
}));

describe("App Unit Tests", () => {
  test('renders without crashing', () => {
    renderWithRouter(<App />);
  });
});



