import { useCallback, useContext } from "react";
import { Col, Container, Row } from "../components/Grid";
import DataContext from "../variabels/Context";
import Input from "../components/Input";
import CloseModal from "../functions/CloseModal";
import ConfigAxios from "../variabels/ConfigAxios";

export default function EditHutang () {
    const {hutangs,setHutangs,hutang,setHutang} = useContext(DataContext);

    const updateHutang = useCallback(async (e) => {
        try{
            e.preventDefault();
            const formData = new FormData(e.target)
            await ConfigAxios.put(`/api/hutang/${hutang.id}`,formData);
            const newData = hutangs.find((data) => data.id === hutang.id);
            newData.nama = formData.get("nama")
            newData.uang = parseInt(formData.get("uang"))
            e.target.reset()
            setHutangs(hutangs.map((data) => data.id === hutang.id ? newData : data))
            history.back();
        }catch(e){
            checkStatus(e);
        }
    },[hutang]);

    return <Container>
        <Row>
            <Col>
                <form onSubmit={updateHutang}>
                    <h1 className="text-center fw-bold text-primary mb-4" >Ubah Hutang</h1>
                    <div className="mb-3">
                        <Input type="text" required={true} value={hutang.nama} name="nama" />
                    </div>
                    <div className="mb-3">
                        <Input type="number" required={true} value={hutang.uang} name="uang" />
                    </div>
                    <button className="text-center btn btn-primary mt-2 shadow w-100" >Ubah</button>
                </form>
            </Col>
        </Row>
    </Container>
}