import s from "./404.module.scss"
import { Link } from 'react-router-dom';
import { ReactComponent as HomeIcon } from "../../images/home.svg" 
import { ReactComponent as Image404 } from "../../images/404.svg" 

export const Error404 = () => {
    return (
        <div className={s.error404_container}>
            <div className={s.error404_content}>
                <div className={s.error404_content_left}>
                    <h1>Ошибка 404</h1>
                    <p>Возможно, у вас опечатка в адресе страницы, или её просто не существует</p>
                    <Link to="/">
                        <HomeIcon/>
                        Вернуться на главную
                    </Link>
                </div>
                <Image404 className={s.image404}/>
            </div>
        </div>
    )
}