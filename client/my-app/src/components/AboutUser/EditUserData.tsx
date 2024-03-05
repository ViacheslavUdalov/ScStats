import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import styles from "../registration/Registration.module.css";
import {rootStateType, useAppSelector} from "../../redux/store";
import instance from "../../api/MainAPI";
import {useNavigate, useParams} from "react-router-dom";
const EditUserData = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [avatarURL, setImage] = useState('');
    const [fullName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const UserData = useAppSelector((state: rootStateType) => state.auth.data);

    useEffect(() => {
        UserData &&
        setImage(UserData.avatarURL)
        setUserName(UserData.fullName)
        setEmail(UserData.email)
    }, [UserData])

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
            avatarURL
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
            <input value={email} className={styles.inputs} onChange={(e) => setEmail(e.target.value)} placeholder={'email'}/>
            <button className={styles.inputs} onClick={onSubmit}>сохранить</button>
        </div>
    );
};

export default EditUserData;