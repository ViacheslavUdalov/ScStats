import styles from './createTournament.module.css';
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, MouseEventHandler, useEffect, useRef, useState} from "react";
import {rootStateType, useAppDispatch, useAppSelector} from "../../../redux/store";
import {fetchAuthMe, selectIsAuth} from "../../../redux/authReducer";
import instance from "../../../api/MainAPI";
import {useSelector} from "react-redux";
import {fetchTournament} from "../../../redux/TournamentsReducer";
import {TournamentOwner} from "../../../models/PlayerBracket";

const CreateTournament = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const isEditing = Boolean(id);
    const [Name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const hiddenFileInput = useRef(null);
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
    let currentAuthUser: TournamentOwner | null = null;
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString !== null) {
         currentAuthUser = JSON.parse(currentUserString);
    }
    useEffect(() => {
        id &&
        dispatch(fetchTournament(id))
        dispatch(fetchAuthMe())
    }, [])
    const tournament = useSelector((state: rootStateType) => state.tournament.data);
    console.log(tournament)
    useEffect(() => {
        if (tournament) {
            setName(tournament.Name);
            setAbout(tournament.about);
            setImageUrl(tournament.imageUrl);
        }
    }, [tournament]);
    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            if (e.target.files) {
                const formData = new FormData();
                const file = e.target.files[0];
                formData.append('image', file);
                const uploadResponse = await instance.post('/upload', formData);
                console.log(uploadResponse)
                setImageUrl(uploadResponse.data.url);
                console.log(imageUrl)
            }

        } catch (err) {
            console.warn(err);
            alert('ошибка загрузки файла')
        }
    };

    const onSubmit = async () => {
        try {
            const fields = {
                Name,
                about,
                imageUrl,
                Owner: currentAuthUser
            }
            const {data} = isEditing ? await instance.patch(`/tournaments/${id}`, fields)
                : await instance.post('/tournaments', fields);
            console.log(data)
            const _id = isEditing ? id : data._id;
            navigate(`/tournaments/${_id}`);
        } catch (err) {
            console.warn(err)
        }
    }
    if (!window.localStorage.getItem('token')) {
        return <Navigate to={'/'}/>
    }
    const handleClick = () => {
        // @ts-ignore
        hiddenFileInput.current.click()
    }
    const handleNameChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setName(e.target.value);
        if (e.target.value.trim().length >= 3 && about.trim().length >= 3) {
            setSubmitButtonDisabled(false);
        } else {
            setSubmitButtonDisabled(true);
        }
    };

    const handleAboutChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setAbout(e.target.value);
        if (Name.trim().length >= 3 && e.target.value.trim().length >= 3) {
            setSubmitButtonDisabled(false);
        } else {
            setSubmitButtonDisabled(true);
        }
    };

    console.log(imageUrl)
    return (
        <div className={styles.container}>
            <div className={styles.Main}>
                <div className={styles.ChoseFile}>
                    <label className={styles.uploadButton} onClick={handleClick}>
                        {!imageUrl ? 'Выберите файл' : 'Выбрать другой файл'}</label>
                    <input ref={hiddenFileInput} style={{display: 'none'}} type="file" onChange={handleFileChange}/>
                    {imageUrl &&
                        <img className={styles.image} style={{width: "200px", paddingTop: '30px'}}
                             src={`http://localhost:3000${imageUrl}`}/>}
                </div>
                <div className={styles.textAreas}>
          <textarea  placeholder={'Имя турнира (Обязательно Для заполнения).'}
                     className={styles.inputs}
                    value={Name} onChange={handleNameChange}/>
                    <textarea placeholder={'о турнире (Обязательно Для заполнения).'}
                              className={styles.inputs}
                              value={about} onChange={handleAboutChange} />
                    <button onClick={onSubmit} disabled={submitButtonDisabled} className={styles.Buttons}>
                        {isEditing ? 'Сохранить' : 'Создать'}</button>
                </div>
            </div>
        </div>
    )
}
export default CreateTournament;