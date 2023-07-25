import styles from './createTournament.module.css';
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import {rootStateType, useAppSelector} from "../../../redux/store";
import {selectIsAuth} from "../../../redux/authReducer";
import instance from "../../../api/MainAPI";
import {useGetFullTournamentQuery} from "../../../redux/RTKtournaments";

const CreateTournament = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const isAuth = useAppSelector(selectIsAuth);
    const Owner = useAppSelector((state: rootStateType) => state.auth.data)
    const isEditing = Boolean(id);
    const [Name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [imageUrl, setImageUrl] = useState('');
        // @ts-ignore
    const {data} = useGetFullTournamentQuery(id)
    useEffect(() => {
        if (data) {
            setName(data.Name);
            setAbout(data.about);
            setImageUrl(data.imageUrl);
        }
    }, [data]);
    console.log(imageUrl)
    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const formData = new FormData();
            const file = e.target.files[0];
            formData.append('image', file);
            const {data} = await instance.post('/upload', formData);
            console.log(data)
            setImageUrl(data.url);
        }
        try {
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
    if (!isAuth) {
        return <Navigate to={'/'} />
    }
    return (
        <div className={styles.container}>
            <div className={styles.Main}>
            <div className={styles.ChoseFile}>
            <input type="file" onChange={handleFileChange} />
            {imageUrl &&
            <img className={styles.image} style={{width: "100px"}} src={`http://localhost:3000${imageUrl}`}/>}
            </div>
                <div className={styles.textAreas}>
          <textarea placeholder={'Имя турнира'} className={styles.inputs} value={Name} onChange={(e) => setName(e.target.value)}/>
            <textarea placeholder={'о турнире'} className={styles.inputs} value={about} onChange={(e) => setAbout(e.target.value)}/>
            <button onClick={onSubmit} className={styles.Buttons}>
                {isEditing ? 'сохранить' : 'отправить'}</button>
                </div>
            </div>
        </div>
    )
}
export default CreateTournament;