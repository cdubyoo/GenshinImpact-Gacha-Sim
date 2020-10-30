import React, { useState } from 'react';
import './App.css';
import Rollresult from './components/Rollresult';
import Rolls from './components/Rolls'

function App() {
  return (
    <>
    <div className="">
        <Rollresult />
        <Rolls />
    </div>
    </>
  );
}
export default App;
