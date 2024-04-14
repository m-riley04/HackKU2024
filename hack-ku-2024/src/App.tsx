import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss'
import HomePage from './Pages/HomePage'
import CameraPage from './Pages/CameraPage';
import NotFoundPage from './Pages/NotFoundPage';
import NavigationButtons from './NavigationButtons/NavigationButtons';
import LeaderboardPage from './Pages/LeaderboardPage';

function App() {


  return (
    <BrowserRouter>
      <div style={{height: "80vh"}}>
        <Routes>
          <Route index element={<HomePage/>}/>
          <Route path="camera" element={<CameraPage/>}/>
          <Route path="leaderboard" element={<LeaderboardPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </div>
      <NavigationButtons/>
    </BrowserRouter>
  );
}

export default App;
