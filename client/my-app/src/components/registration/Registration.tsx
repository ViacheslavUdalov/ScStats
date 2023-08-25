import {useForm} from "react-hook-form";
import {useAppDispatch} from "../../redux/store";
import {fetchRegister, selectIsAuth} from "../../redux/authReducer";
import {RegisterModel} from "../../models/auth-model";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import styles from './Registration.module.css'
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
        if (data.payload?.token) {
            window.localStorage.setItem('token', data.payload.token);
        };
    };
    console.log(`registration is Auth ${isAuth}`);
    if (window.localStorage.getItem('token') || isAuth) {
        return <Navigate to={'/'} />
    }
    return (
        <div className={styles.container}>
            <form  onSubmit={handleSubmit(onSubmit)}>
                <input className={styles.inputs} {...register('fullName', {required: 'Введите имя'})}placeholder={'имя'}/>
                {errors.fullName && <div className={styles.errors}><span>{errors.fullName.message}</span></div>}
                <input className={styles.inputs} {...register('email', {required: 'Укажите почту!',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Неверный формат email'
                    }   })}placeholder={'почта'}/>
                {errors.email && <div className={styles.errors}><span>{errors.email.message}</span></div>}
                <input className={styles.inputs} {...register('password', {required: 'Введите пароль!',
                    maxLength: {
                        value: 15,
                        message: 'Пароль должен быть не больше 15 символов.',
                    },})}placeholder={'пароль'}/>
                {errors.password && <div className={styles.errors}><span>{errors.password.message}</span></div>}
                <input className={styles.inputs} type={'submit'}/>
            </form>
        </div>
    )
}
export default Registration;