import Navbar from "../components/Navbar";
import { Col, Container, Row } from "../components/Grid";
import { useCallback, useContext, useEffect, useState } from "react";
import DataContext from "../variabels/Context";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Loading from "../components/Loading";
import ConfigAxios from "../variabels/ConfigAxios";
import CloseModal from "../functions/CloseModal";

export default function Utama () {
    const {checkStatus} = useContext(DataContext);
    const [hutangs,setHutangs] = useState();
    const [hutang,setHutang] = useState({});
    const {search,setSearch} = useContext(DataContext)

    useEffect(() => {
        getHutangs()
    },[]);

    const getHutangs = useCallback(async () => {
        try{
            const response = await ConfigAxios.get("/api/hutang");
            setHutangs(response.data.data);
        }catch(e){
            checkStatus(e);
        }
    },[]);
        
    const createHutang = useCallback(async (e) => {
        try{
            e.preventDefault();
            await ConfigAxios.post("/api/hutang",new FormData(e.target));
            e.target.reset()
            CloseModal("#buatHutang");
            getHutangs();
        }catch(e){
            checkStatus(e);
        }
    },[]);

    const updateHutang = useCallback(async (e) => {
        try{
            e.preventDefault();
            const formData = new FormData(e.target)
            await ConfigAxios.put(`/api/hutang/${hutang.id}`,formData);
            const newData = hutangs.find((data) => data.id === hutang.id);
            newData.nama = formData.get("nama")
            newData.uang = parseInt(formData.get("uang"))
            e.target.reset()
            CloseModal("#ubahHutang");
            setHutangs(hutangs.map((data) => data.id === hutang.id ? newData : data))
        }catch(e){
            checkStatus(e);
        }
    },[hutang]);

    const deleteHutang = useCallback(async () => {
        try{
            await ConfigAxios.delete(`/api/hutang/${hutang.id}`);
            CloseModal("#hapusHutang");
            setHutangs(hutangs.filter((data) => data.id !== hutang.id))
        }catch(e){
            checkStatus(e);
        }
    },[hutang]);

    const numberFormat = useCallback((number, decimals, thousandsSeparator, decimalSeparator) => {
        decimals = decimals || 0;
        thousandsSeparator = thousandsSeparator || '.';
        decimalSeparator = decimalSeparator || ',';
    
        var parts = number.toFixed(decimals).split('.');
        var integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
        var decimalPart = parts.length > 1 ? decimalSeparator + parts[1] : '';
    
        return integerPart + decimalPart;
    },[])

    return <Navbar>
        <Container>
            {search ? 
            <Row>
                <Col className="p-0" >
                    <div className="">
                        <div className="input-group mb-2">
                            <input type="text" className="form-control" placeholder="Masukkan nama"/>
                            <button className="btn btn-primary" type="button"><i className="bi bi-search"></i></button>
                        </div>
                    </div>
                </Col>
            </Row>
            : undefined}
            {hutangs ? hutangs.length > 0 ?  
            <Row className="mb-5" >
                {hutangs.map((hutang,index) => 
                <Col className="p-0 mb-3" key={index} >
                    <div className="border rounded p-2 shadow-sm">
                        <div className="d-flex align-items-center justify-content-between">
                            <h5>{hutang.nama}</h5>
                            <div className="dropdown">
                                <div className="pointer" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fs-5 bi bi-three-dots-vertical"></i>
                                </div>
                                <ul className="dropdown-menu">
                                    <li onClick={() => setHutang(hutang)} ><div data-bs-toggle="modal" data-bs-target="#ubahHutang" className="dropdown-item fw-bold" href="#"><i className="bi bi-pencil-square"></i> Edit</div></li>
                                    <li onClick={() => setHutang(hutang)} ><div data-bs-toggle="modal" data-bs-target="#hapusHutang" className="dropdown-item text-danger fw-bold" href="#"><i className="bi bi-trash"></i> Hapus</div></li>
                                </ul>
                            </div>
                        </div>
                        <div style={{fontSize:"12px",marginTop:"-5px",marginLeft:"2px"}}  >{hutang.createdAt.split("T")[0]}</div>
                        <div className="p-1 py-0 pt-1 border rounded mt-1">
                            <h3 className="fw-bold text-primary" >{numberFormat(hutang.uang)}</h3>
                        </div>
                    </div>
                </Col>
                )}
            </Row>
            : <Row>
                <Col>
                    <div className="">
                        <img src="/img/empty.png" alt="TidakAdaHutang" className="img-fluid" />
                        <h5 className="text-center text-primary fw-bold" >Tidak ada Hutang</h5>
                    </div>
                </Col>
            </Row>
            : <Loading/>}
        </Container>
        <div className="d-flex fixed-bottom p-3 justify-content-end">
            <div className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#buatHutang"><i className="bi bi-plus-lg"></i> Tambah</div>
        </div>
        <Modal target={"buatHutang"} >
                 <form onSubmit={createHutang}>
                    <div className="mb-3">
                        <Input type="text" required={true}  name="nama" />
                    </div>
                    <div className="mb-3">
                        <Input type="number" required={true}  name="uang" />
                    </div>
                    <button className="text-center btn btn-primary mt-2 shadow w-100" >Tambah</button>
                </form>
        </Modal>
        <Modal target={"ubahHutang"} >
                 <form onSubmit={updateHutang}>
                    <div className="mb-3">
                        <Input type="text" required={true} value={hutang.nama} name="nama" />
                    </div>
                    <div className="mb-3">
                        <Input type="number" required={true} value={hutang.uang} name="uang" />
                    </div>
                    <button className="text-center btn btn-primary mt-2 shadow w-100" >Ubah</button>
                </form>
        </Modal>
        <Modal target={"hapusHutang"} >
            <h5 className="text-primary fw-bold text-center" >Yakin ingin Menghapusnya?</h5>
            <div className="d-flex justify-content-center my-4">
                <img src="/img/trash.png" alt="logoSampah" className="img-fluid" style={{width:"110px"}} />
            </div>
            <div className="d-flex gap-1">
                <button data-bs-dismiss="modal" className="text-center btn btn-danger mt-2 shadow w-50" >Batal</button>
                <button className="text-center btn btn-primary mt-2 shadow w-50" onClick={deleteHutang} >Hapus</button>
            </div>
        </Modal>
    </Navbar>
}