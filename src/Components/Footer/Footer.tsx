import s from "./Footer.module.scss"
import logo from "../../images/logo1.png"
import visa from "../../images/visa.png"
import webpay from "../../images/webpay.png"
import byvisa from "../../images/byvisa.png"
import mastercard from "../../images/master.png"
import mastersecure from "../../images/securecode.png"
import belcard from "../../images/belcard.png"
import { ReactComponent as Insta } from "./../../images/insta.svg" 
import { ReactComponent as Vk } from "./../../images/vk.svg" 
import { ReactComponent as Fb } from "./../../images/fb.svg" 
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer>
            <div className={s.footer_container}>
                <div className={s.footer_left}>
                    <img src={logo} alt="logo" />
                    <p>СДАЁМ БАЙ</p>
                    <p>ИП Шушкевич Андрей Викторович
                        УНП 192602485 Минским горисполкомом 10.02.2016
                        220068, РБ, г. Минск, ул. Осипенко, 21, кв.23
                        +375 29 621 48 33, sdaem@sdaem.by
                        Режим работы: 08:00-22:00
                    </p>
                </div>
                <div className={s.footer_right}>
                    <div className={s.footer_right_first}>
                        <div className={s.footer_1column}>
                            <a>Коттеджи и усадьбы</a>
                            <a>Бани и сауны</a>
                            <a>Авто на прокат</a>
                        </div>
                        <div className={s.footer_2column}>
                            <p>Квартиры</p>
                            <div className={s.column_links}>
                                <Link to={"/catalog"}>Квартиры в Минске</Link>
                                <Link to={"/catalog"}>Квартиры в Гомеле</Link>
                                <Link to={"/catalog"}>Квартиры в Бресте</Link>
                                <Link to={"/catalog"}>Квартиры в Витебске</Link>
                                <Link to={"/catalog"}>Квартиры в Гродно</Link>
                                <Link to={"/catalog"}>Квартиры в Могилеве</Link>
                            </div>
                        </div>
                        <div className={s.footer_3column}>
                            <Link to={"/news"}>Новости</Link>
                            <a>Размещение и тарифы </a>
                            <a>Объявления на карте</a>
                            <Link to={"/contacts"}>Контакты</Link>
                        </div>
                    </div>
                    <div className={s.footer_right_second}>
                        <div className={s.footer_socialblock}>
                            <p>Мы в соцсетях</p>
                            <div className={s.footer_socials}>
                                <Insta/>
                                <Vk/>
                                <Fb/>
                            </div>
                        </div>
                        <div className={s.footer_payment}>
                            <img src={visa} alt="visa" />
                            <img src={webpay} alt="webpay" />
                            <img src={byvisa} alt="byvisa" />
                            <img src={mastercard} alt="mastercard" />
                            <img src={mastersecure} alt="mastersecure" />
                            <img src={belcard} alt="belcard" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}