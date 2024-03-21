import { useCallback, useContext } from "react";
import { Col, Container, Row } from "../components/Grid";
import DataContext from "../variabels/Context";
import Input from "../components/Input";
import CloseModal from "../functions/CloseModal";
import ConfigAxios from "../variabels/ConfigAxios";

export default function CreateHutang () {
    const {hutangs,setHutangs} = useContext(DataContext);

    const createHutang = useCallback(async (e) => {
        try{
            e.preventDefault();
            const response = await ConfigAxios.post("/api/hutang",new FormData(e.target));
            e.target.reset()
            setHutangs([response.data.data,...hutangs])
            history.back();
        }catch(e){
            checkStatus(e);
        }
    },[]);

    return <Container>
        <Row>
            <Col>
                <form onSubmit={createHutang}>
                    <h1 className="text-center fw-bold text-primary mb-4" >Tambah Hutang</h1>
                    <div className="mb-3">
                        <Input type="text" required={true}  name="nama" />
                    </div>
                    <div className="mb-3">
                        <Input type="number" required={true}  name="uang" />
                    </div>
                    <button className="text-center btn btn-primary mt-2 shadow w-100" >Tambah</button>
                </form>
            </Col>
        </Row>
    </Container>
}