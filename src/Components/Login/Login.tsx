import classNames from 'classnames/bind';
import { Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ReactComponent as LockLogo } from "../../images/lock.svg";
import { ReactComponent as UserLogo } from "../../images/user.svg";
import { signIn } from '../../redux/authSlice';
import { useAppDispatch } from './../../redux/store';
import s from "./Login.module.scss";

let cx = classNames.bind(s);

interface LoginFormValues {
    name: string;
    password: string;
    isRemember: boolean;
}

const LoginFormSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Слишком коротко')
        .max(100, "Должно быть короче 100 знаков")
        .required('Введите логин'),
    password: Yup.string()
        .min(6, 'Слишком коротко, минимум 6 знаков')
        .required('Введите пароль'),
});

export const Login = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const loginFormValues: LoginFormValues = {
        name: '',
        password: '',
        isRemember: false,
    };

    const onSubmit = (values: LoginFormValues, { resetForm }: any) => {
        console.log(values)
        localStorage.setItem('userName', `${values.name}`);
        dispatch(signIn())
        navigate('/');
    }

    return (
        <div className={s.login}>
            <div className={s.login_container}>
                <h2>Авторизация</h2>
                <p>
                    Авторизируйтесь, чтобы начать
                    публиковать свои объявления
                </p>
                <Formik
                    initialValues={loginFormValues}
                    validationSchema={LoginFormSchema}
                    onSubmit={onSubmit}
                >

                    {({ errors, touched }) => (
                        <Form className={s.login_form}>
                            <div className={s.form_first}>
                                <div className={cx(s.form_label, s.user_logo, { error_input: errors.name && touched.name })}>
                                    <Field
                                        id="name"
                                        name="name"
                                        placeholder="Логин"
                                    />
                                    <UserLogo />
                                    {errors.name && touched.name ? (
                                        <div className={s.form_error}>{errors.name}</div>
                                    ) : null}
                                </div>
                                <div className={cx(s.form_label, s.lock_logo, { error_input: errors.password && touched.password })}>
                                    <Field
                                        type={'password'}
                                        id="password"
                                        name="password"
                                        placeholder="Пароль"
                                        className={cx({
                                            error_input: errors.password && touched.password
                                        })}
                                    />
                                    <LockLogo />
                                    {errors.password && touched.password ? (
                                        <div className={s.form_error}>{errors.password}</div>
                                    ) : null}
                                </div>
                                <div className={s.form_second}>
                                    <div className={s.checkbox}>
                                        <Field
                                            type={'checkbox'}
                                            name={'rememberMe'}
                                            id='rememberMe'
                                        />
                                        <label htmlFor={'rememberMe'}>Запомнить меня</label>
                                    </div>
                                    <a href="#">Забыли пароль?</a>
                                </div>
                            </div>

                            <button type="submit">Войти</button>
                        </Form>
                    )}
                </Formik>
                <p>
                    Еще нет аккаунта?
                    <Link to={"/registration"}> Создайте аккаунт</Link>
                </p>

            </div>
        </div>
    )
}