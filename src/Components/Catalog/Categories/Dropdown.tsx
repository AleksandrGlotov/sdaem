import { useEffect, useRef, useState } from 'react';
import { ReactComponent as Arrow } from '../../../images//arrow.svg';
import s from "./Dropdown.module.scss";

type PropsType = {
    filter: string
    label: string
    listName: string
    list: string[]
    changeFilter: (name: string, room: string) => void
}

export const Dropdown = ({ filter, label, listName, list, changeFilter }: PropsType) => {

    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        if (isOpen === false) return;

        const handleClick = (e: any) => {
            if (!dropdownRef.current) return
            // @ts-ignore
            if (!dropdownRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("click", handleClick)

        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [isOpen])

    const listSelect = list.map((item: string, index: number) => {
        return <li
            key={index}
            onClick={() => {
                changeFilter(listName, item)
                setIsOpen(false)
            }}
            className={filter === item ? "active" : ""}>{item}</li>
    })

    return (
        <div className={s.dropdown_wrap}>
            <p>{label}</p>
            <div ref={dropdownRef} className={s.dropdown}>
                <div
                    className={isOpen ? "selectOpen" : ""}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {filter}
                    <Arrow />
                </div>

                {isOpen && <ul>
                    {listSelect}
                </ul>}
            </div>
        </div>
    )
}