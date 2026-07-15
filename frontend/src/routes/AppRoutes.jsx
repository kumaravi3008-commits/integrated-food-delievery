import { Routes, Route } from 'react-router-dom';

import WelcomePage from '../features/discovery/pages/WelcomePage';
import HomePage from '../features/discovery/pages/home/Homepage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

export default AppRoutes;