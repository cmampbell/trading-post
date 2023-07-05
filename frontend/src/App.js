import './App.css';
import { Outlet } from 'react-router'

function App() {
  return (
    <div className="App">
      <h1>Hello World!</h1>
      <Outlet/>
    </div>
  );
}

export default App;
