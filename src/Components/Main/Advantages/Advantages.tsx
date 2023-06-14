import { Link } from "react-router-dom"
import s from "./Advantages.module.scss"
import Advatage1 from "../../../images/advantage1.png"
import Advatage2 from "../../../images/advantage2.png"
import { ReactComponent as Arrow } from "../../../images/arrow.svg"

export const Advantages = () => {
    return (
        <section className={s.advantages}>
            <div className={s.advantageCard}>
                <div className={s.header}>
                    <img src={Advatage1} alt="free" />
                    <h4>
                        Начните привлекать
                        клиентов бесплатно!
                    </h4>
                </div>
                <p>
                    Пройдя простую регистрацию на сайте у Вас появится личный кабинет,
                    в котором возможно <b>бесплатно создавать и публиковать</b> объявления на сайте.
                </p>
                <Link to={"/add"} className={s.yellow}>
                    +  Разместить объявление
                </Link>
            </div>
            <div className={s.advantageCard}>
                <div className={s.header}>
                    <img src={Advatage2} alt="price" />
                    <h4>
                        Поднимайте
                        объявления
                    </h4>
                </div>
                <p>
                    Вы в любое время можете <b>поднимать</b> объявления <b>вверх первой страницы</b> каталога,
                    они разместятся сразу после платных объявлений до тех пор, пока другой
                    пользователь не повторит процедуру.
                </p>
                <Link to={"/add"} className={s.yellow}>
                    Узнать стоимость услуги
                    <Arrow />
                </Link>
            </div>
            <div className={s.advantageCard_yellow}>
                <div className={s.header}>
                    <h4>
                        Приоритет Gold
                    </h4>
                </div>
                <p>
                    Приоритетное размещение <b>Gold</b> позволяет закрепить ваше объявление в верхней части каталога!
                </p>
                <p>
                    Gold объявления <b>перемещаются</b> <br />
                    <b>каждые 5 мин</b> на 1 позицию, что делает размещение одинаковым для всех.
                </p>
                <Link to={"/tariff"} className={s.violet}>
                    Еще о тарифе Gold
                    <Arrow />
                </Link>
            </div>
        </section>
    )
}