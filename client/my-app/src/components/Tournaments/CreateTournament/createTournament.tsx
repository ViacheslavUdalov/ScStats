import styles from './createTournament.module.css';
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, MouseEventHandler, useEffect, useRef, useState} from "react";
import {rootStateType, useAppDispatch, useAppSelector} from "../../../redux/store";
import {fetchAuthMe, selectIsAuth} from "../../../redux/authReducer";
import instance from "../../../api/MainAPI";
import {useSelector} from "react-redux";
import {fetchTournament} from "../../../redux/TournamentsReducer";

const CreateTournament = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const isEditing = Boolean(id);
    const [Name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const hiddenFileInput = useRef(null);
    useEffect(() => {
        id &&
        dispatch(fetchTournament(id))
        dispatch(fetchAuthMe())
    }, [])
    const tournament = useSelector((state: rootStateType) => state.tournaments.tournament);
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
                imageUrl
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
    // console.log(UserData)
    if (!window.localStorage.getItem('token')) {
        return <Navigate to={'/'} />
    }
 const handleClick = () => {
     // @ts-ignore
     hiddenFileInput.current.click()
 }
        console.log(imageUrl)
    return (
        <div className={styles.container}>
            <div className={styles.Main}>
            <div className={styles.ChoseFile}>
                    <label className={styles.uploadButton} onClick={handleClick}>
                        {!imageUrl ? 'Выберите файл' : 'Выбрать другой файл'}</label>
                    <input ref={hiddenFileInput} style={{display: 'none'}} type="file" onChange={handleFileChange} />
            {imageUrl &&
            <img className={styles.image} style={{width: "200px", paddingTop: '30px'}} src={`http://localhost:3000${imageUrl}`}/>}
            </div>
                <div className={styles.textAreas}>
          <textarea placeholder={'Имя турнира'} className={styles.inputs} value={Name} onChange={(e) => setName(e.target.value)}/>
            <textarea placeholder={'о турнире'} className={styles.inputs} value={about} onChange={(e) => setAbout(e.target.value)}/>
            <button onClick={onSubmit} className={styles.Buttons}>
                {isEditing ? 'Сохранить' : 'Создать'}</button>
                </div>
            </div>
        </div>
    )
}
export default CreateTournament;