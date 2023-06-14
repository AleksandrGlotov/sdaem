import s from "./BigLink.module.scss"
import { Link } from "react-router-dom";
import { ReactComponent as Arrow } from '../../../images//arrow.svg';

type PropsType = {
    count: number;
}

export const BigLink = ({ count }: PropsType) => {
    return (
        <div className={s.bigLink_container}>
            <div className={s.bigLink}>
                <div className={s.bigLinkInfo}>
                    <div className={s.counter}>
                        <p>{count}</p>
                        <span>+</span>
                    </div>
                    <p>Предложений по Минску</p>
                </div>
                <Link to={"/catalog/Minsk"}>
                    Посмотреть все
                    <Arrow />
                </Link>
            </div>
        </div>
    )
}