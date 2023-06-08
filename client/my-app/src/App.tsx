import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Tournaments from "./components/Tournaments/getTournaments";
import Navigation from "./components/Navigation/Navigation";
import Players from "./components/Players/Players";
import Home from "./components/Home/Home";
import Login from "./components/login/Login";
import Header from "./components/Header";

function App() {
  return (
      <div>
        <Navigation />
          <Header />
        <Routes>
            <Route path={'/'} element={<Home />}/>
            <Route path={'/tournaments'} element={<Tournaments />}/>
            <Route path={'/auth/login'} element={<Login />}/>
            <Route path={'/players'} element={<Players />}/>
        </Routes>
    </div>
);
}
export default App;
