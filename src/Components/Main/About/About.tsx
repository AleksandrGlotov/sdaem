import s from "./About.module.scss"
import AboutPhoto from "../../../images/about.png"
import { useSelector } from 'react-redux';
import { selectNews } from '../../../redux/selectors';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/store';
import { getNewsAC } from "../../../redux/newsSlice";
import { useEffect } from 'react';
import { ReactComponent as Arrow } from '../../../images//arrow.svg';


export const About = () => {

    const dispatch = useAppDispatch();

    const news = useSelector(selectNews)

    const newsList = news.slice(0, 5).map((news) => {
        return <Link key={news.id} className={s.news_link} to={`/news/${news.id}`}>
            <p>{news.title}</p>
            <p>{news.date}</p>
        </Link>
    })

    useEffect(() => {
        dispatch(getNewsAC())
    }, []);

    return (
        <section className={s.about_container}>
            <div className={s.about}>
                <h4>ЧТО ТАКОЕ SDAEM.BY</h4>
                <h2>Квартира на сутки в Минске</h2>
                <div className={s.text}>
                    <div className={s.photo}>
                        <img src={AboutPhoto} alt="flat" />
                    </div>
                    <div>
                        <b>Нужна квартира на сутки в Минске?</b>
                        <p>
                            На веб-сайте sdaem.by вас ждет масса выгодных предложений.
                            Каталог насчитывает <b>более 500 квартир</b>. Благодаря удобной
                            навигации вы быстро найдете подходящий вариант.
                        </p>
                        <br />
                        <p>
                            В каталоге представлены комфортабельные однокомнатные квартиры
                            на сутки и квартиры с большим количеством комнат в разных районах
                            города, с различной степенью удобства от дешевых до VIP
                            с джакузи.
                        </p>
                    </div>
                </div>
                <p>
                    Чтобы снять квартиру на сутки в Минске, вам достаточно определиться с
                    выбором и связаться с владельцем для уточнения условий аренды и заключить
                    договор. Заметим, на сайте представлены исключительно квартиры на сутки без
                    посредников, что избавляет посетителей от необходимости взаимодействовать с
                    агентствами, тратя свое время и деньги. Также пользователи сайта могут
                    совершенно бесплатно размещать объявления о готовности сдать квартиру на
                    сутки.
                </p>
            </div>
            <div className={s.about_news}>
                <h2>Новости</h2>
                <div className={s.newsList}>{newsList}</div>
                <Link className={s.newsPageLink} to={"/news"}>
                    Посмотреть все
                    <Arrow/>
                </Link>
            </div>
        </section>
    )
} 