import s from "./NewsPage.module.scss"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { selectNews } from "../../../redux/selectors"
import noPhoto from "../../../images/nophoto.png"
import {ReactComponent as Vk} from "../../../images/vkontakte.svg"
import {ReactComponent as Fb} from "../../../images/facebook.svg"
import {ReactComponent as Wa} from "../../../images/watsapp.svg"
import {ReactComponent as Tg} from "../../../images/telegram.svg"
import {ReactComponent as Vi} from "../../../images/viber.svg"
import { Breadcrumbs } from "../../common/Breadcrumbs/Breadcrumbs"
import { Link } from "react-router-dom"
import { MoreNews } from "../MoreNews/MoreNews"

export const NewsPage = () => {

    const { newsId } = useParams()
    const news = useSelector(selectNews)
    const currentNews = news.find( (n) => n.id === Number(newsId)) || news[0]

    const items = [
        {
            to: "/news",
            label: "Новости"
        },
        {
            to: `/news/:${currentNews?.id}`,
            label: `${currentNews?.title}`
        }
    ]
    
    return (
        <div className={s.newsPage}>
            <div className={s.background}></div>
            <div className={s.newsPage_container}>
                <Breadcrumbs>
                    {items.map(({ to, label }) => (
                        <Link key={to} to={to}>
                            {label}
                        </Link>
                    ))}   
                </Breadcrumbs>
                <h1>{currentNews?.title}</h1>
                <div className={s.date}>
                    <p>{currentNews?.date}</p>
                    <div className={s.social}>
                        <span>Поделиться</span>
                        <a href="#">
                            <Vk />
                        </a>
                        <a href="#">
                            <Fb />
                        </a>
                        <a href="#">
                            <Wa />
                        </a>
                        <a href="#">
                            <Tg />
                        </a>
                        <a href="#">
                            <Vi />
                        </a>
                    </div>
                </div>
                <img className={s.photo} src={currentNews?.photo || noPhoto} alt={currentNews?.title} />
                <p className={s.description}>{currentNews?.description}</p>
            </div>
            <MoreNews currentNewsID={currentNews.id}/>
        </div>
    )
}