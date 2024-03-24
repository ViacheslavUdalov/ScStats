import React, {ChangeEvent, ChangeEventHandler, useEffect, useMemo, useRef, useState} from 'react';
import styles from "../registration/Registration.module.css";
import {rootStateType, useAppDispatch, useAppSelector} from "../../redux/store";
import instance from "../../api/MainAPI";
import {useNavigate, useParams} from "react-router-dom";
import {fetchAuthMe} from "../../redux/authReducer";
import {getOneUser} from "../../redux/userReducer";
import {type} from "os";
import Select from 'react-select'

const EditUserData = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [avatarURL, setImage] = useState('');
    const [fullName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [race, setRace] = useState('')
    const [country, setCountry] = useState('');
  
    const UserData = useAppSelector((state: rootStateType) => state.auth.data);

    useEffect(() => {
        if (id) {
            dispatch(getOneUser(id));
        }
    }, []);

    useEffect(() => {
        if (UserData) {
            setEmail(UserData.emai);
            setImage(UserData.avatarURL);
            setRace(UserData.race);
            setCountry(UserData.country);
            setUserName(UserData.fullName);
        }
    }, [UserData]);

    const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
        if (e.target.files) {
            const formData = new FormData();
            const file = e.target.files[0];
            formData.append('image', file);
            const {data} = await instance.post('/upload', formData);
            console.log(data)
            setImage(data.url);
        }
        } catch (err) {
            console.warn(err);
            alert('ошибка загрузки файла')
        }
    };

    const onSubmit = async () => {
        try {
        const fields = {
            fullName,
            email,
            avatarURL,
            country,
            race
        }
        const {data} =  await instance.patch(`/auth/${id}`, fields)
        console.log(data);
        navigate(`/aboutUser/${id}`);
    } catch (err) {
        console.warn(err)
      }
    };
    const hiddenFileInput = useRef(null);
    const handleClick = () => {
        // @ts-ignore
        hiddenFileInput.current.click()
    }
    console.log(UserData);
    return (
        <div className={styles.container}>
            <img src={avatarURL ? `http://localhost:3000${avatarURL}` : ''} className={styles.Image}/>
            <label className={styles.uploadButton} onClick={handleClick}>
                {!avatarURL ? 'Выберите файл' : 'Выбрать другой файл'}</label>
            <input  ref={hiddenFileInput}  className={styles.inputFile} type="file" onChange={handleUploadImage}/>
                <input value={fullName} className={styles.inputs} onChange={(e) => setUserName(e.target.value)} placeholder={'имя'}/>
            {/*<input value={country} className={styles.inputs} onChange={(e) => setCountry(e.target.value)} placeholder={'Старана'}/>*/}
            {/*<input value={race} className={styles.inputs} onChange={(e) => setRace(e.target.value)} placeholder={'раса'}/>*/}
            <select className={styles.inputs} value={race} onChange={(e) => setRace(e.target.value)}>
                <option value=""></option>
                <option value="terran">terran</option>
                <option value="zerg">zerg</option>
                <option value="protoss">protoss</option>
            </select>
            <p>Выбранная опция: {race}</p>
            <input value={email} className={styles.inputs} onChange={(e) => setEmail(e.target.value)} placeholder={'email'}/>
            <button className={styles.inputs} onClick={onSubmit}>сохранить</button>
        </div>
    );
};

export default EditUserData;