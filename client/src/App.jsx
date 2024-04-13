import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Menu } from './components/Layouts';
import { Loader } from './components/UI';

import useDelayedLoading from './hooks/useDelayedLoading';

import "./assets/global.css";

export default function App() {
  const loading = useDelayedLoading(0, 1000);

  return (
    <>
      {loading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/" element={<Menu />} />
          </Routes>
        )}
    </>
  );
}