import styles from './createTournament.module.css';
import {useSelector} from "react-redux";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import {rootStateType, useAppSelector} from "../../../redux/store";
import {selectIsAuth} from "../../../redux/authReducer";
import instance from "../../../api/MainAPI";
import {
    useCreateTournamentMutation, useGetFullTournamentQuery,
    useUpdateTournamentMutation
} from "../../../redux/RTKtournaments";
import {TournamentModel} from "../../../models/tournament-model";
import {useMutation} from "react-query";

const CreateTournament = () => {
    const [CreateTournament, {isLoading: isFetching, error: createError}] = useCreateTournamentMutation()
    const [UpdateTournament, {isLoading, error}] = useUpdateTournamentMutation()
    const navigate = useNavigate();
    const {id} = useParams();
    const isAuth = useAppSelector(selectIsAuth);
    const Owner = useSelector((state: rootStateType) => state.auth.data)
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
    // const updateTournamentMutation = useMutation<TournamentModel, unknown, TournamentModel>(UpdateTournament);

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
    const handleUpdate =  (tournament: TournamentModel) => {
        const tournamentData: Partial<TournamentModel> = {
            Name: Name,
            about: about,
            imageUrl: imageUrl,
        };
        UpdateTournament(tournamentData)
    // .unwrap()
            // .then((response: TournamentModel) => {
            //   navigate(`/tournaments/${response._id}`)
            // })
            // .catch((error) => {
            //     console.log(error)
            // });
    }
    const handleCreate = async () => {
        const tournamentData: Partial<TournamentModel> = {
            Name: Name,
            about: about,
            imageUrl: imageUrl
        };
        const result = await CreateTournament(tournamentData).unwrap();
        console.log(result)
        // if ('data' in result) {
        //     const tournament = result.data;
        //
        // } else {
        //     const error = result.error;
        // }
    }

    // const onSubmit = async (tournament: TournamentModel) => {
    //     try {
    //         const fields = {
    //             Name,
    //             about,
    //             imageUrl
    //         }
    //         // const {data} = isEditing ? await instance.patch(`/tournaments${id}`, fields);
    //             : await instance.post('/tournaments', fields);
    //         const _id = isEditing ? id : data._id;
    //         navigate(`/tournaments/${_id}`);
    //     } catch (err) {
    //         console.warn(err)
    //     }
    // }
    // const onSubmit = async (tournament: TournamentModel) => {
    //     try {
    //         const fields = {
    //             Name,
    //             about,
    //             imageUrl
    //         }
    //         const {data, error} = isEditing ?
    //             await UpdateTournament({...tournament, fields} as TournamentModel)
    //             : await CreateTournament(fields as TournamentModel)
    //         if (data) {
    //             const _id = isEditing ? id : data._id;
    //             navigate(`/tournaments/${_id}`);
    //         }
    //
    //     } catch (err) {
    //         console.warn(err)
    //     }
    // }
    if (!isAuth) {
        return <Navigate to={'/'} />
    }
    const fields = {Name, about, imageUrl}
    // console.log(`isEditing ==== ${isEditing}`);
    return (
        <div className={styles.container}>
            <input type="file" onChange={handleFileChange} />
            {imageUrl &&
            <img style={{width: "100px"}} src={`http://localhost:3000${imageUrl}`}/>}
          <textarea value={Name} onChange={(e) => setName(e.target.value)}/>
            <textarea value={about} onChange={(e) => setAbout(e.target.value)}/>
            {isEditing && data?
                <button onClick={() => handleUpdate(data)}>
                     сохранить</button>
                :  <button onClick={handleCreate}>
                    отправить</button>
            }
            {/*<button onClick={onSubmit}>*/}
            {/*    {isEditing ? 'сохранить' : 'отправить'}</button>*/}
        </div>
    )
}
export default CreateTournament;