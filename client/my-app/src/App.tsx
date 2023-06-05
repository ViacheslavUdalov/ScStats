import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Tournaments from "./Tournaments/getTournaments";
import Navigation from "./Navigation/Navigation";
import MainPage from "./mainPage";
import Players from "./Players/Players";

function App() {
  return (
      <div>
          <Navigation />
<Routes>
  <Route path={'/'} element={<MainPage />}/>
  <Route path={'/api/tournaments'} element={<Tournaments />}/>
    <Route path={'/api/players'} element={<Players />}/>
</Routes>
      </div>
        );
}
export default App;
