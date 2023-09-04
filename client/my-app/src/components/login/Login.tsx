import {useForm} from "react-hook-form";
import {rootStateType, useAppDispatch} from "../../redux/store";
import {fetchAuth, selectIsAuth} from "../../redux/authReducer";
import {AuthModel} from "../../models/auth-model";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import styles from './login.module.css';
import {useState} from "react";

const Login = () => {
    const dispatch = useAppDispatch();
    const isAuth = useSelector(selectIsAuth);
    const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'all'
    });
    const [errorMessage, setServerErrorMessage] = useState(false);

    const onSubmit = async (values: AuthModel) => {
        try {
            const response = await dispatch(fetchAuth(values));
            console.log(response);
            if (!response.payload) {
                setServerErrorMessage(true)
            }
            if (response.payload?.token) {
                window.localStorage.setItem('token', response.payload.token);
            }
        } catch (err) {
            console.log(err)
        }
    }
    console.log(isAuth);
    if (isAuth) {
        return <Navigate to={'/'}/>
    }
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className={styles.inputs} {...register('email', {
                    required: "Укажите email!",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Неверный формат email'
                    }
                })}
                       placeholder={'почта'}/>
                {errors.email && <div className={styles.errors}><span>{errors.email.message}</span></div>}
                <input className={styles.inputs} {...register('password',
                    {required: 'Введите пароль!', minLength: {
                            value: 5,
                            message: 'Пароль должен содержать как минимум 5 символов.'
                        }})}
                       placeholder={'пароль'}/>
                {errors.password && <div className={styles.errors}><span>{errors.password.message}</span></div>}
                {errorMessage && <div className={styles.errors}><span>Неверный логин или пароль</span></div>}
                <input disabled={!isValid} className={styles.inputs} type={'submit'}/>

            </form>
        </div>
    )
}
export default Login;