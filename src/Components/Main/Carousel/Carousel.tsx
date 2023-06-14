import { useRef, useState } from "react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { ReactComponent as Arrow } from "../../../images/arrow.svg";
import { HouseType } from "../../../redux/catalogSlice";
import { addresses, metros } from "../../../api/CategoriesList";
import { Dropdown } from "../../Catalog/Categories/Dropdown";
import { HouseCard } from "../../common/HouseCard/HouseCard";
import s from "./Carousel.module.scss";
import "./swiper.css";

type PropsType = {
    houses: HouseType[]
}

export const Carousel = ({ houses }: PropsType) => {

    const navigationNextRef = useRef(null);
    const navigationPrevRef = useRef(null);
    const [localFilters, setLocalFilters] = useState({ metro: "Выберите", address: "Выберите" })
    const [swiper, setSwiper] = useState();

    const changeFilter = (name: string, room: string) => {
        setLocalFilters({
            ...localFilters,
            [name]: room
        })
    }

    const resetCarousel = () => {
        setLocalFilters({
            ...localFilters,
            metro: "Выберите",
            address: "Выберите"
        })
    }

    const filtredHouses = houses.filter((h) => {
        return (h.address === localFilters.address || localFilters.address === "Выберите") &&
            (h.metro === localFilters.metro || localFilters.metro === "Выберите")
    })

    return (
        <section className={s.carousel_container}>
            <h4 className={s.color_text}>КВАРТИРЫ НА СУТКИ</h4>
            <div className={s.carousel_header}>
                <h2>Аренда квартир в Минске</h2>
                <div className={s.carousel_filter}>
                    <Dropdown
                        label="Метро"
                        listName="metro"
                        list={metros}
                        filter={localFilters.metro}
                        changeFilter={changeFilter}
                    />
                    <Dropdown
                        label="Район"
                        listName="address"
                        list={addresses}
                        filter={localFilters.address}
                        changeFilter={changeFilter}
                    />
                </div>
            </div>
            {(filtredHouses.length !== 0) ?
                <div>
                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            prevEl: navigationPrevRef.current,
                            nextEl: navigationNextRef.current,
                        }}
                        onBeforeInit={(swiper) => {
                            swiper.navigation.nextEl = navigationNextRef.current!;
                            swiper.navigation.prevEl = navigationPrevRef.current!;
                        }}
                        slidesPerView={3}
                        spaceBetween={16}
                        className="mainSwiper"
                        onSwiper={setSwiper as (swiper: any) => void}
                    >
                        {filtredHouses.map((house) => {
                            return (
                                <SwiperSlide key={house.id}>
                                    <HouseCard housecard={house} houseCardType="block" />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                    <div className={s.main_swiper_buttons}>
                        <button ref={navigationPrevRef} className="custom-button-prev"><Arrow /></button>
                        <button ref={navigationNextRef} className="custom-button-next"><Arrow /></button>
                    </div>
                </div>
                : <div className={s.noresult}>
                    <h3>По данному фильтру отсутствуют квартиры</h3>
                    <div className={s.resetbutton} onClick={resetCarousel}>Сбросить фильтр</div>
                </div>
            }
        </section>
    )
}