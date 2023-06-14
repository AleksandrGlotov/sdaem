import s from "./Breadcrumbs.module.scss"
import { Link } from "react-router-dom"
import { ReactComponent as HomeIcon } from "../../../images/home.svg" 
import { ReactNode } from "react"

type BreadcrumbsProps = {
    children: ReactNode
}


export const Breadcrumbs:React.FC<BreadcrumbsProps> = ({children}) => {
    return (
        <nav className={s.breadcrumbs}>
            <Link to="/">
                <HomeIcon/>
            </Link>
            {children}
        </nav>
    )
}