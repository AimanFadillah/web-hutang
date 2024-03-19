import Navbar from "../components/Navbar";
import { Col, Container, Row } from "../components/Grid";
import { useContext } from "react";
import DataContext from "../variabels/Context";
import Modal from "../components/Modal";
import Input from "../components/Input";

export default function Utama () {
    const {search,setSearch} = useContext(DataContext)

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
            <Row>
                <Col className="p-0 mb-3" >
                    <div className="border rounded p-2 shadow-sm">
                        <div className="d-flex align-items-center justify-content-between">
                            <h5>Nama orang</h5>
                            <div className="dropdown">
                                <div className="pointer" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fs-5 bi bi-three-dots-vertical"></i>
                                </div>
                                <ul className="dropdown-menu">
                                    <li><div data-bs-toggle="modal" data-bs-target="#ubahHutang" className="dropdown-item fw-bold" href="#"><i className="bi bi-pencil-square"></i> Edit</div></li>
                                    <li><div data-bs-toggle="modal" data-bs-target="#hapusHutang" className="dropdown-item text-danger fw-bold" href="#"><i className="bi bi-trash"></i> Hapus</div></li>
                                </ul>
                            </div>
                        </div>
                        <div style={{fontSize:"12px",marginTop:"-5px",marginLeft:"2px"}}  >2022-18-19</div>
                        <div className="p-1 py-0 pt-1 border rounded mt-1">
                            <h3 className="fw-bold text-primary" >15.000</h3>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
        <div className="d-flex fixed-bottom p-3 justify-content-end">
            <div className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#buatHutang"><i className="bi bi-plus-lg"></i> Tambah</div>
        </div>
        <Modal target={"buatHutang"} >
                 <form className="">
                    <div className="mb-3">
                        <Input type="text" required={true} name="nama" />
                    </div>
                    <div className="mb-3">
                        <Input type="number" required={true} name="Uang" />
                    </div>
                    <button className="text-center btn btn-primary mt-2 shadow w-100" >Tambah</button>
                </form>
        </Modal>
        <Modal target={"ubahHutang"} >
                 <form className="">
                    <div className="mb-3">
                        <Input type="text" required={true} name="nama" />
                    </div>
                    <div className="mb-3">
                        <Input type="number" required={true} name="Uang" />
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
                <button className="text-center btn btn-primary mt-2 shadow w-50" >Hapus</button>
            </div>
        </Modal>
    </Navbar>
}