import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { towns } from '../../api/CategoriesList';
import { ReactComponent as Heart } from "../../images/Heart.svg";
import logo from "../../images/logo1.png";
import { ReactComponent as Point } from "../../images/Point.svg";
import { signOut } from '../../redux/authSlice';
import { selectAuth } from '../../redux/selectors';
import { useAppDispatch } from "../../redux/store";
import s from "./Header.module.scss";

let cx = classNames.bind(s);

export const Header = () => {

    const isAuth = useSelector(selectAuth)
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)
    const location = useLocation()
    const dispatch = useAppDispatch();

    let label = "Квартиры на сутки"

    if (location.pathname.includes("catalog")) {
        label = towns.find(town => town.to === location.pathname)?.label!
    }

    const townsSelect = towns.map((town, index) => {
        return <li key={index}>
            <Link
                
                to={town.to}
                onClick={() => setIsOpen(false)}
            >
                {town.label}
            </Link>
        </li>
    })


    const logOut = () => {
        dispatch(signOut())
        delete localStorage.userName;
    }

    useEffect(() => {
        if (isOpen === false) return;

        const handleClick = (e: any) => {
            if (!dropdownRef.current) return
            //@ts-ignore
            if (!dropdownRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("click", handleClick)

        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [isOpen])

    return (
        <header>
            <div className={s.header_first}>
                <nav className={s.header_first_navigation}>
                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? s.activeLink : undefined}
                            to={"/"}>
                            Главная
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? s.activeLink : undefined}
                            to={"/news"}>
                            Новости
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? s.activeLink : undefined}
                            to={"/price"}>
                            Размещение и тарифы
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? s.activeLink : undefined}
                            to={"/map"}>
                            <Point className={s.header_point1} />
                            Объявления на карте
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? s.activeLink : undefined}
                            to={"/contacts"}>
                            Контакты
                        </NavLink>
                    </li>
                </nav>
                <div className={s.header_first_button}>
                    <div className={s.link_with_icon}>
                        <Link to={"/"}>Закладки</Link>
                        <Heart className={s.header_heart} />
                    </div>
                    {
                        isAuth
                            ? <div>
                                <span className={s.text_violet}>{localStorage.userName}</span>
                                <a href='#' onClick={logOut}> Выйти</a>
                            </div >
                            : <Link className={s.text_violet} to={'/login'}>Вход и регистрация</Link>
                    }
                </div>
            </div>
            <div className={s.header_second}>
                <div className={s.header_second_container}>
                    <Link to={'/'}><img src={logo} alt="logo" /></Link>
                    <nav className={s.header_second_navigation}>
                        <li>
                            <div ref={dropdownRef} className={s.dropdown}>
                                <div
                                    className={cx(s.dropdown_label, { activeLink: isOpen || location.pathname.includes("catalog") })}
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    {label}
                                    <Point className={s.header_point2} />
                                </div>

                                {isOpen && <ul>
                                    {townsSelect}
                                </ul>}
                            </div>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) => isActive ? s.activeLink : undefined}
                                to={'/cotage'}>
                                Коттеджи и усадьбы
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) => isActive ? s.activeLink : undefined}
                                to={'/spa'}>
                                Бани и Сауны
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={({ isActive }) => isActive ? s.activeLink : undefined}
                                to={'/auto'}>
                                Авто напрокат
                            </NavLink>
                        </li>
                    </nav>
                    <a className={s.header_second_button}>+ Разместить объявление</a>
                </div>
            </div>
        </header>
    )
}