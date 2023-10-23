import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MiniDrawer from './components/MiniDrawer';
import AlbumsPage from './pages/albums';
import CategoriesPage from './pages/categories';
import HomePage from './pages/home';
import SingersPage from './pages/singers';
import SongsPage from './pages/songs';
import LoginPage from './pages/auths/login';
import RegisterPage from './pages/auths/register';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"



const App = () => {
  return (
    <div className="app">
        <ToastContainer
        closeButton
        draggable
        position="top-right"
        theme="colored"
        pauseOnHover
        hideProgressBar
        autoClose={3500}
      />
      <MiniDrawer>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="songs" element={<SongsPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="singers" element={<SingersPage />} />
            <Route path="albums" element={<AlbumsPage />} />
            <Route path="auths">
              <Route index element={<LoginPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
          </Route>
        </Routes>
      </MiniDrawer>
    </div>
  );
};

export default App;
