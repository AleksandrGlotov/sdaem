import { ReactComponent as Point } from '../../../images/Point.svg'
import { useLocation, useNavigate } from 'react-router-dom';
import s from "./ShowMap.module.scss"
import classNames from 'classnames/bind';

let cx = classNames.bind(s);

type PropsType = {
    title: string;
    text: string;
    button_text: string;
    setIsMapOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export const ShowMap = ({ title, text, button_text, setIsMapOpen }: PropsType) => {

    const location = useLocation()
    const navigate = useNavigate();

    const handleClick = () => {
        if (location.pathname === "/") {
            localStorage.setItem('isRedirect', "true");
            navigate('/catalog/Minsk')
        } else {
            setIsMapOpen!(true)
        }
    }

    return (
        <section
            className={cx({showMap_catalog: location.pathname.includes("catalog"), showMap_container: location.pathname === "/" })}
        >
            <div className={s.showMap}>
                <h2>{title}</h2>
                <p>{text}</p>
                <div className={s.link_button} onClick={handleClick}>
                    <Point />
                    {button_text}
                </div>
            </div>
        </section >
    )
}