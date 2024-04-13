import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss'
import HomePage from './Pages/HomePage'
import CameraPage from './Pages/CameraPage';
import NotFoundPage from './Pages/NotFoundPage';
import NavigationButtons from './NavigationButtons/NavigationButtons';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="camera" element={<CameraPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
      <NavigationButtons/>
    </BrowserRouter>
  );
}

export default App;
