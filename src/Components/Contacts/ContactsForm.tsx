import classNames from 'classnames/bind';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { ReactComponent as EmailLogo } from "../../images/mail.svg";
import { ReactComponent as UserLogo } from "../../images/user.svg";
import { Modal } from './../common/Modal/Modal';
import s from "./ContactsForm.module.scss";

interface MyFormValues {
    name: string;
    email: string;
    message: string;
}

let cx = classNames.bind(s);

const ContactSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Слишком коротко')
        .max(100, "Должно быть короче 100 знаков")
        .required('Введите имя'),
    email: Yup.string()
        .email('Неправильный формат почты')
        .required('Введите почту'),
    message: Yup.string()
        .min(10, 'Слишком коротко')
        .max(100, "Должно быть короче 100 знаков")
        .required('Введите сообщение'),
});

export const ContactsForm = () => {

    const [open, setOpen] = useState(false)

    const contactValues: MyFormValues = {
        name: '',
        email: '',
        message: '',
    };

    const onSubmit = (values: MyFormValues, { resetForm }: any) => {
        console.log(values)
        setOpen(true)
        resetForm()
    }

    return (
        <Formik
            initialValues={contactValues}
            validationSchema={ContactSchema}
            onSubmit={onSubmit}
        >

            {({ errors, touched }) => (
                <Form className={s.contacts_form}>
                    <div className={s.form_first}>
                        <div className={cx(s.form_label, s.user_logo, { error_input: errors.name && touched.name })}>
                            <label htmlFor="name">Ваше имя</label>
                            <Field
                                id="name"
                                name="name"
                                placeholder="Имя"
                            />
                            <UserLogo />
                            {errors.name && touched.name ? (
                                <div className={s.form_error}>{errors.name}</div>
                            ) : null}
                        </div>
                        <div className={cx(s.form_label, s.email_logo, { error_input: errors.email && touched.email })}>
                            <label htmlFor="email">Ваша электронная почта</label>
                            <Field
                                id="email"
                                name="email"
                                placeholder="Введите"
                                className={cx({
                                    error_input: errors.email && touched.email
                                })}
                            />
                            <EmailLogo />
                            {errors.email && touched.email ? (
                                <div className={s.form_error}>{errors.email}</div>
                            ) : null}
                        </div>
                    </div>

                    <div className={cx(s.form_label, { error_input: errors.name && touched.name })}>
                        <label htmlFor="message">Ваше сообщение</label>
                        <Field
                            as="textarea"
                            id="message"
                            name="message"
                            placeholder="Сообщение"
                            className={cx({
                                error_input: errors.name && touched.name
                            })}
                        />
                        {errors.message && touched.message ? (
                            <div className={s.form_error}>{errors.message}</div>
                        ) : null}
                    </div>

                    <button type="submit">Отправить</button>
                    <Modal
                        title="Ваше письмо отправлено!"
                        body="Какое-то сообщение о том, что письмо отправлено, какое-то сообщение, что письмо отправлено."
                        button="Закрыть окно"
                        isOpen={open}
                        onClose={() => setOpen(false)}
                    />
                </Form>
            )}
        </Formik>
    )
}