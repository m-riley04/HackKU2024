import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss'
import HomePage from './Pages/HomePage'
import CameraPage from './Pages/CameraPage';
import NotFoundPage from './Pages/NotFoundPage';
import NavigationButtons from './NavigationButtons/NavigationButtons';
import SplashPage from './Pages/SplashPage';
import LeaderboardPage from './Pages/LeaderboardPage';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<SplashPage/>}/>
        <Route path="map" element={<HomePage/>}/>
        <Route path="camera" element={<CameraPage/>}/>
        <Route path="leaderboard" element={<LeaderboardPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
      <NavigationButtons/>
    </BrowserRouter>
  );
}

export default App;
