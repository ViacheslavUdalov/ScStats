import {useForm} from "react-hook-form";
import {useAppDispatch} from "../../redux/store";
import {fetchRegister, selectIsAuth} from "../../redux/authReducer";
import {RegisterModel} from "../../models/auth-model";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
type Inputs = {
    fullName: string,
    email: string,
    password: string
}
const Registration = () => {
    const dispatch = useAppDispatch();
    const isAuth = useSelector(selectIsAuth);
    const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm<Inputs>({
        mode: 'all'
    });
    const onSubmit = async (values: RegisterModel) => {
        const data = await dispatch(fetchRegister(values));
        console.log(data);
        if (!data.payload) {
            alert('Не удалось зарегистрироваться!');
        }
        const DATA: any = data.payload;
        if ('token' in DATA) {
            window.localStorage.setItem('token', DATA.token);
        };
    };
    console.log(`registration is Auth ${isAuth}`);
    if (isAuth) {
        return <Navigate to={'/'} />
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('fullName', {required: 'Укажите почту!'})}placeholder={'имя'}/>
                <input {...register('email', {required: 'Укажите почту!'})}placeholder={'почта'}/>
                <input {...register('password', {required: 'Введите пароль!'})}placeholder={'пароль'}/>
                <input type={'submit'}/>
            </form>
        </div>
    )
}
export default Registration;