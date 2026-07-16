import { Routes, Route } from 'react-router-dom';

import WelcomePage from '../features/discovery/pages/WelcomePage';
import HomePage from '../features/discovery/pages/home/Homepage';
import DetailPage from "../features/discovery/pages/DetailPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/dish/:id" element={<DetailPage />} />
    </Routes>
  );
};

export default AppRoutes;