import {AppStateType, useAppDispatch} from "../../redux/store";
import {selectIsAuth} from "../../redux/authReducer";
import {useSelector} from "react-redux";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import instance from "../../api/MainAPI";
import {TournamentModel} from "../../models/tournament-model";

const CreateTournament = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const isAuth = useSelector(selectIsAuth);
    const [isLoading, setIsLoading] = useState('');
    const [Name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const user = useSelector((state: AppStateType) => state.auth.data)
    const isEditing = Boolean(id);
    useEffect(() => {
if (id) {
    instance.get(`/tournaments/${id}`).then(({data}) => {
        setName(data.Name)
        setAbout(data.about)
        setImageUrl(data.imageUrl)
    }).catch((err) => {
        console.warn(err);
        alert('Ошибка при загрузки статьи')
    })
}
    }, [])

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            if (e.target.files) {
                const formData = new FormData();
                const file = e.target.files[0];
                formData.append('image', file);
                const {data} = await instance.post('/upload', formData);
                setImageUrl(data.url);
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
                user
            }
            const {data} = isEditing ? await instance.patch(`/tournaments/${id}`, fields)
                : await instance.post('/tournaments', fields);
            const _id = isEditing ? id : data._id;
            navigate(`/tournaments/${_id}`);
        } catch (err) {

        }
    }
    if (!isAuth) {
        return <Navigate to={'/'} />
    }
    // console.log(`isEditing ==== ${isEditing}`);
    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {imageUrl &&
            <img style={{width: "100px"}} src={`http://localhost:3000${imageUrl}`}/>}
          <textarea value={Name} onChange={(e) => setName(e.target.value)}/>
            <textarea value={about} onChange={(e) => setAbout(e.target.value)}/>
            <button onClick={onSubmit}>
                {isEditing ? 'сохранить' : 'отправить'}</button>
        </div>
    )
}
export default CreateTournament;