import classNames from 'classnames/bind';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ReactComponent as LockLogo } from "../../images/lock.svg";
import { ReactComponent as EmailLogo } from "../../images/mail.svg";
import { ReactComponent as UserLogo } from "../../images/user.svg";
import { Modal } from './../common/Modal/Modal';
import s from "./Login.module.scss";

let cx = classNames.bind(s);

interface RegFormValues {
    name: string;
    email: string;
    password: string;
    password2: string;
}

const RegFormSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Слишком коротко')
        .max(100, "Должно быть короче 100 знаков")
        .required('Введите логин'),
    email: Yup.string()
        .email('Неправильный формат почты')
        .required('Введите пароль'),
    password: Yup.string()
        .min(6, 'Слишком коротко, минимум 6 знаков')
        .required('Введите пароль'),
    password2: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароль не совпадает')
        .required('Введите пароль повторно'),
});

export const Registration = () => {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false)

    const regFormValues: RegFormValues = {
        name: '',
        email: '',
        password: '',
        password2: '',
    };

    const onReg = () => {
        navigate('/login');
    }

    const onSubmit = (values: RegFormValues, { resetForm }: any) => {
        console.log(values)
        setOpen(true)
        resetForm()
    }

    return (
        <div className={s.login}>
            <div className={s.reg_container}>
                <div className={s.reg_left_column}>
                    <h2>Регистрация</h2>
                    <Formik
                        initialValues={regFormValues}
                        validationSchema={RegFormSchema}
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
                                    <div className={cx(s.form_label, s.lock_logo, { error_input: errors.email && touched.email })}>
                                        <Field
                                            type={'email'}
                                            id="email"
                                            name="email"
                                            placeholder="Почта"
                                            className={cx({
                                                error_input: errors.email && touched.email
                                            })}
                                        />
                                        <EmailLogo />
                                        {errors.email && touched.email ? (
                                            <div className={s.form_error}>{errors.email}</div>
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
                                    <div className={cx(s.form_label, s.lock_logo, { error_input: errors.password2 && touched.password2 })}>
                                        <Field
                                            type={'password2'}
                                            id="password2"
                                            name="password2"
                                            placeholder="Повторите пароль"
                                            className={cx({
                                                error_input: errors.password2 && touched.password2
                                            })}
                                        />
                                        <LockLogo />
                                        {errors.password2 && touched.password2 ? (
                                            <div className={s.form_error}>{errors.password2}</div>
                                        ) : null}
                                    </div>
                                </div>

                                <button type="submit">Зарегистрироваться</button>
                                <Modal
                                    title="Подтвердите регистрацию"
                                    body="Письмо для подтверждения аккаунта отправлено почту. Перейдите по ссылке, указанной в письме. Если письма нет, то проверьте спам."
                                    button="Понятно"
                                    isOpen={open}
                                    onClose={onReg}
                                />
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className={s.reg_right_column}>
                    <p>Пользователь обязуется:</p>
                    <li>
                        предоставлять достоверную и актуальную информацию при регистрации и добавлении объекта;
                    </li>
                    <li>
                        добавлять фотографии объектов соответствующие действительности. Администрация сайта sdaem.by оставляет за собой право удалять любую информацию, размещенную пользователем, если сочтет, что информация не соответствует действительности, носит оскорбительный характер, нарушает права и
                        законные интересы других граждан либо действующее законодательство Республики Беларусь.
                    </li>
                    <p>
                        Уже есть аккаунт?
                        <Link to={"/login"}> Войдите</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}