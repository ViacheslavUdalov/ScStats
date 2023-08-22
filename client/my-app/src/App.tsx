import React, {useEffect} from 'react';
import styles from './App.module.css';
import {Route, Routes} from "react-router-dom";
import Tournaments from "./components/Tournaments/getTournaments";
import Home from "./components/Home/Home";
import Login from "./components/login/Login";
import {useAppDispatch} from "./redux/store";
import {useSelector} from "react-redux";
import {fetchAuthMe, selectIsAuth} from "./redux/authReducer";
import Registration from "./components/registration/Registration";
import FullTournament from "./components/Tournaments/FullTournament";
import CreateTournament from "./components/Tournaments/CreateTournament/createTournament";
import Header from "./components/Header/Header";
import AboutUser from "./components/AboutUser/AboutUser";
import EditUserData from "./components/AboutUser/EditUserData";
import Players from "./components/Players/Players";
function App() {
    const dispatch = useAppDispatch();
    const isAuth = useSelector(selectIsAuth);
    useEffect(() => {
        dispatch(fetchAuthMe())
    }, [])
    // console.log(`registration is Auth ${isAuth}`);
  return (
      <div className={styles.App}>
          <Header />
        <Routes>
            <Route path={'/'} element={<Home />}/>
            <Route path={'/aboutUser/:id?'} element={<AboutUser />}/>
            <Route path={'/aboutUser/:id?/edit'} element={<EditUserData />}/>
            <Route path={'/tournaments'} element={<Tournaments />}/>
            <Route path={'/tournaments/:id?'} element={<FullTournament />}/>
 .           <Route path={'/tournaments/:id?/edit'} element={<CreateTournament />}/>
            <Route path={'/auth/login'} element={<Login />}/>
            <Route path={'/players'} element={<Players />} />
            <Route path={'/auth/register'} element={<Registration />}/>
            <Route path={'/add-tournament'} element={<CreateTournament />}/>
        </Routes>
    </div>
);
}
export default App;
