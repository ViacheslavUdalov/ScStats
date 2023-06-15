import {useForm} from "react-hook-form";
import {useAppDispatch} from "../../redux/store";
import {fetchRegister, selectIsAuth} from "../../redux/authReducer";
import {RegisterModel} from "../../models/auth-model";
import {useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {ChangeEvent, useState} from "react";
import instance from "../../api/MainAPI";

const CreateTournament = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isAuth = useSelector(selectIsAuth);
    const [isLoading, setIsLoading] = useState('');
    const [Name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [imageUrl, setImageUrl] = useState('');
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
                imageUrl
            }
            const {data} = await instance.post('/tournaments', fields);
            const id = data._id;
            navigate(`/tournaments/${id}`);
        } catch (err) {

        }
    }
    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {imageUrl &&
            <img style={{width: "100px"}} src={`http://localhost:3000${imageUrl}`}/>}
          <textarea value={Name} onChange={(e) => setName(e.target.value)}/>
            <textarea value={about} onChange={(e) => setAbout(e.target.value)}/>
            <button onClick={onSubmit}>отправить</button>
        </div>
    )
}
export default CreateTournament;