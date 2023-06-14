import { Link } from "react-router-dom"
import { ReactComponent as Arrow } from "../../../images/arrow.svg"
import { towns } from "../../../api/CategoriesList"
import s from "./LinksToCatalog.module.scss"

const links2 = ["Аггроусадьбы", "Коттеджи", "Загородный комплекс", "Базы отдыха"]
const links3 = ["Коттеджи и усадьбы на о. Брасласких ", "Коттеджи и усадьбы (жилье) на Нарочи", "Коттеджи и усадьбы (жилье) у воды, на берегу, на озере"]

export const LinksToCatalog = () => {

    const linksList = towns.map((town, index) => {
        return (
            <Link key={index} className={s.violet_link} to={town.to}>{town.name}</Link>
        )
    })

    const linksListColumn = towns.map((town, index) => {
        return (
            <Link key={index} className={s.link_column} to={town.to}>
                <span>{town.label}</span>
                <span>{Math.floor(Math.random() * 1000)}</span>
            </Link>
        )
    })

    const linksListColumn2 = links2.map((link, index) => {
        return (
            <Link key={index} className={s.link_column} to={"/cotage"}>
                <span>{link}</span>
                <span>{Math.floor(Math.random() * 100)}</span>
            </Link>
        )
    })

    const linksListColumn3 = links3.map((link, index) => {
        return (
            <Link key={index} className={s.link_column} to={"/popular"}>
                <span>{link}</span>
            </Link>
        )
    })

    return (
        <section className={s.links_container}>
            <div className={s.links_cards}>
                <div className={s.links_card1}>
                    <p>СНЯТЬ КВАРТИРУ</p>
                    <h2>Квартиры на сутки</h2>
                    <div className={s.links_list}>{linksList}</div>
                </div>
                <div className={s.links_card2}>
                    <p>СНЯТЬ КОТТЕДЖ НА ПРАЗДНИК</p>
                    <h2>Коттеджи и усадьбы</h2>
                    <Link to={"/cotage"} className={s.link_button}>
                        <Arrow />
                    </Link>
                </div>
                <div className={s.links_card3}>
                    <p>ПОПАРИТЬСЯ В БАНЕ С ДРУЗЬЯМИ</p>
                    <h2>Бани и сауны</h2>
                    <Link to={"/spa"} className={s.link_button}>
                        <Arrow />
                    </Link>
                </div>
                <div className={s.links_card4}>
                    <p>ЕСЛИ СРОЧНО НУЖНА МАШИНА</p>
                    <h2>Авто на прокат</h2>
                    <Link to={"/auto"} className={s.link_button}>
                        <Arrow />
                    </Link>
                </div>
            </div>
            <div className={s.links_column}>
                <div>
                    <h4>Квартиры</h4>
                    {linksListColumn}
                </div>
                <div>
                    <h4>Коттеджи и усадьбы</h4>
                    {linksListColumn2}
                </div>
                <div>
                    <h4>Популярные направления</h4>
                    {linksListColumn3}
                </div>
            </div>
        </section>
    )
}