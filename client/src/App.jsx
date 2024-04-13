import React from 'react';
import { Routes, Route } from 'react-router-dom';

import useDelayedLoading from './hooks/useDelayedLoading';

import { Menu } from './components/Layouts';

import { Loader } from './components/UI';

import { Authorization, ReadingList, ReadingPage } from './components';


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
            <Route path='/authorization' element={ <Authorization/> } />
            <Route path='/reading' element={ <ReadingList/> } />
            <Route path='/reading/:id' element={ <ReadingPage/> } />
          </Routes>
        )}
    </>
  );
}