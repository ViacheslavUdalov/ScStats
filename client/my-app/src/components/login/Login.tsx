import {useForm} from "react-hook-form";
import {useAppDispatch} from "../../redux/store";
import {fetchAuth, selectIsAuth} from "../../redux/authReducer";
import {AuthModel} from "../../models/auth-model";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

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
 const onSubmit = (values: AuthModel) => {
  dispatch(fetchAuth(values))
 };
 console.log(isAuth);
 if (isAuth) {
  return <Navigate to={'/'} />
 }
 return (
     <div>
<form onSubmit={handleSubmit(onSubmit)}>
 <input {...register('email', {required: 'Укажите почту!'})}/>
 <input {...register('password', {required: 'Введите пароль!'})}/>
 <input type={'submit'}/>
</form>
     </div>
 )
}
export default Login;