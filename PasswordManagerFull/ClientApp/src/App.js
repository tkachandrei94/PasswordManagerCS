import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <Routes>
      {AppRoutes.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </Routes>
  );
}

export default App;
