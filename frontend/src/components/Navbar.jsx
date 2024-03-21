import { Link } from "react-router-dom"
import { Container } from "./Grid"
import { useContext, useEffect } from "react";
import DataContext from "../variabels/Context";

export default function Navbar ({children}) {
    const {searchToggle,setSearchToggle} = useContext(DataContext);

    useEffect(() => {
        document.body.removeAttribute("style");
    },[]);

    return <>
    <nav className="navbar border navbar-expand-md p-0">
        <div className="container">
            <Link className="navbar-brand fs-1 fw-bold text-primary">Hutang</Link>
            <div className="pointer fs-2 text-primary" onClick={() => setSearchToggle(!searchToggle)} ><i className="bi bi-search"></i></div>
        </div>
    </nav>
    <Container>
        {children}
    </Container>
    </>
}

function NavLink ({active,text,to}){
    return <li className={`nav-item ${active ? "bg-primary rounded fw-bold" : ""}`} >
        <Link className={`nav-link px-2 ${active ? "text-light" : ""}`} to={to}>{text}</Link>
    </li>
}