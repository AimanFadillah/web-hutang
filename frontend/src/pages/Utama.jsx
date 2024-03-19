import { useContext } from "react"
import Sidebar from "../components/Sidebar"
import DataContext from "../variabels/Context"
import Navbar from "../components/Navbar";
import { Container } from "../components/Grid";

export default function Utama () {

    return <Navbar>
        <Container>
            <h1>Hai</h1>
        </Container>
    </Navbar>
}