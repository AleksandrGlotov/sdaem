import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import s from "./HouseCard.module.scss";
import "./swiper.css";
import classNames from 'classnames/bind';
import noPhoto from "../../../images/nophoto.png";
import { ReactComponent as UserLogo } from "../../../images/user.svg"
import { ReactComponent as BedLogo } from "../../../images/bed.svg"
import { ReactComponent as PointLogo } from "../../../images/Point.svg"
import { ReactComponent as MetroLogo } from "../../../images/metro.svg"
import { ReactComponent as RouteLogo } from "../../../images/Route.svg"
import { ReactComponent as Heart } from "../../../images/Heart.svg"
import { ReactComponent as Mobile } from "../../../images/mobile.svg"
import { HouseType } from "../../../redux/catalogSlice";
import { ReactComponent as Vi } from "../../../images/viber.svg"
import { ReactComponent as Tg } from "../../../images/telegram.svg"
import { ReactComponent as Mail } from "../../../images/mail.svg"

let cx = classNames.bind(s);

type PropsType = {
    housecard: HouseType;
    houseCardType: string;
}

export const HouseCard = ({ housecard, houseCardType }: PropsType) => {

    const [isLike, setIsLike] = useState(false);
    const [isContactsClick, setIsContactsClick] = useState(false);
    const contactsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isContactsClick === false) return;

        const handleClick = (e: any) => {
            if (!contactsRef.current) return
            if (!contactsRef.current.contains(e.target)) {
                setIsContactsClick(false)
            }
        }

        document.addEventListener("click", handleClick)

        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [isContactsClick])

    return (
        <div className={cx({housecard: houseCardType === "block" , housecard_list: houseCardType === "list" })}>
            {housecard.photo.length > 1 ?
                <Swiper
                    navigation={true}
                    pagination={true}
                    modules={[Pagination, Navigation]}
                    className={cx({ mySwiper: houseCardType === "block", mySwiper_list: houseCardType === "list" })}
                >
                    {housecard.photo.map((p, index) =>
                        <SwiperSlide key={index} className="swiper_slide"><img alt="house photo" src={p} /></SwiperSlide>)}
                </Swiper> : <img className="onePhoto" alt="house photo" src={ housecard.photo[0] || noPhoto} />}
            {!!housecard.label && <div className={s.label}>{housecard.label}</div>}
            <div className={s.housecard_caption}>
                <div className={s.housecard_info}>
                    <div className={s.info_price}>
                        <h3>{housecard.price}</h3>
                        <p>за сутки</p>
                    </div>
                    <div className={s.info_rooms}>
                        {housecard.guest && <div><UserLogo className={s.user} /><p>{housecard.guest}</p></div>}
                        {housecard.room && <div><p>{housecard.room}</p></div>}
                        {housecard.bed && <div><BedLogo /><p>{housecard.bed}</p></div>}
                    </div>
                </div>
                <h4>{housecard.title}</h4>
                <div className={s.info_address}>
                    {housecard.address && <div><PointLogo className={s.point} /><p>{housecard.address}</p></div>}
                    {housecard.metro && <div><MetroLogo /><p>{housecard.metro}</p></div>}
                    {housecard.route && <div><RouteLogo /><p>{housecard.route}</p></div>}
                </div>
                <p className={s.description}>{housecard.description}</p>
                <div className={s.hr}></div>
                <div className={s.buttons}>
                    <div
                        onClick={() => { setIsLike(!isLike) }}
                        className={cx(s.heart, { heart_fill: isLike })}
                    >
                        <Heart />
                    </div>
                    <div
                        ref={contactsRef}
                        onClick={() => setIsContactsClick(true)}
                        className={cx(s.mobile_disabled, { mobile_active: isContactsClick })}
                    >
                        <Mobile />
                        <div className={s.contact}>
                            <img src={housecard.ownerPhoto || noPhoto} alt="avatar" />
                            <p>Владелец</p>
                            <h3>{housecard.ownerName}</h3>
                            <h3>{housecard.ownerNumber}</h3>
                            <a href="">{housecard.ownerEmail}</a>
                            <div className={s.social}>
                                <a className={s.viber}>
                                    <Tg />
                                </a>
                                <a className={s.whatsapp}>
                                    <Vi />
                                </a>
                                <a className={s.mail}>
                                    <Mail />
                                </a>
                            </div>
                        </div>
                        Контакты
                    </div>
                    <a className={s.more}>
                        Подробно
                    </a>
                </div>
            </div>
        </div >
    )
}