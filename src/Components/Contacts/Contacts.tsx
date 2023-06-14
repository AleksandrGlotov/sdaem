import { ReactComponent as Alert } from "../../images/alert.svg"
import { ReactComponent as Clock } from "../../images/clock.svg"
import { ReactComponent as Fb } from "../../images/fb.svg"
import { ReactComponent as Insta } from "../../images/insta.svg"
import { ReactComponent as Mail } from "../../images/mail.svg"
import { ReactComponent as Mobile } from "../../images/mobile.svg"
import { ReactComponent as Point } from "../../images/Point.svg"
import { ReactComponent as Tg } from "../../images/telegram.svg"
import { ReactComponent as Vi } from "../../images/viber.svg"
import { ReactComponent as Vk } from "../../images/vk.svg"
import { ReactComponent as Wa } from "../../images/watsapp.svg"
import s from "./Contacts.module.scss"
import { ContactsForm } from "./ContactsForm"

export const Contacts = () => {
    return (
        <section className={s.contacts}>
            <div className={s.contacts_container}>
                <div className={s.info}>
                    <h1>Контакты</h1>
                    <p>
                        Если у Вас есть пожелания, предложения или претензии по
                        организации работы сайта мы всегда рады услышать Ваше мнение.
                    </p>
                    <div className={s.main}>
                        <div className={s.line}>
                            <div className={s.logo_bg}>
                                <Point className={s.point} />
                            </div>
                            <p>220068, РБ, г. Минск, ул. Осипенко, 21, кв.23</p>
                        </div>
                        <div className={s.line}>
                            <div className={s.logo_bg}>
                                <Mobile />
                            </div>
                            <p>+375 29 621-48-33</p>
                            <div className={s.phone}>
                                <a className={s.logo_bg} href="#">
                                    <Wa />
                                </a>
                                <a className={s.logo_bg} href="#">
                                    <Tg />
                                </a>
                                <a className={s.logo_bg} href="#">
                                    <Vi />
                                </a>
                            </div>
                        </div>
                        <div className={s.line}>
                            <div className={s.logo_bg}>
                                <Mail />
                            </div>
                            <p>sdaem@sdaem.by</p>
                        </div>
                        <div className={s.line}>
                            <div className={s.logo_bg}>
                                <Clock />
                            </div>
                            <p><span>Режим работы: </span>08:00-22:00</p>
                        </div>
                    </div>
                    <p className={s.description}>
                        ИП Шушкевич Андрей Викторович
                        <br />
                        УНП 192602485 Минским горисполкомом 10.02.2016
                    </p>
                    <div className={s.alert}>
                        <Alert />
                        <span>
                            Администрация сайта не владеет информацией
                            о наличии свободных квартир
                        </span>
                    </div>
                </div>
                <ContactsForm />
                <div className={s.social}>
                    <a className={s.biglogo_bg} href="#">
                        <Insta />
                    </a>
                    <a className={s.biglogo_bg} href="#">
                        <Vk />
                    </a>
                    <a className={s.biglogo_bg} href="#">
                        <Fb />
                    </a>
                </div>
            </div>
        </section>
    )
}