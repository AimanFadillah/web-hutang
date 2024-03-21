import Navbar from "../components/Navbar";
import { Col, Container, Row } from "../components/Grid";
import { useCallback, useContext, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component"
import DataContext from "../variabels/Context";
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import ConfigAxios from "../variabels/ConfigAxios";
import CloseModal from "../functions/CloseModal";
import { useNavigate } from "react-router-dom";

export default function Utama () {
    const {checkStatus,hutangs,setHutangs,searchToggle,search,setSearch,hutang,setHutang,page,setPage} = useContext(DataContext);
    const nav = useNavigate();

    useEffect(() => {
        !hutangs ? getHutangs() : undefined
    },[]);

    const getHutangs = useCallback(async () => {
        try{
            const response = await ConfigAxios.get(`/api/hutang?search=${search}&page=${page}`);
            hutangs ? setHutangs([...hutangs,...response.data.data]) : setHutangs(response.data.data);
            setPage(page + 1);
        }catch(e){
            checkStatus(e);
        }
    },[search,page,hutangs]);

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
            {searchToggle ? 
            <Row>
                <Col className="p-0" >
                    <form className="" onSubmit={(e) => {
                        e.preventDefault();
                        getHutangs();
                    }} >
                        <div className="input-group mb-2">
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} name="search" className="form-control" placeholder="Masukkan nama"/>
                            <button  className="btn btn-primary"><i className="bi bi-search"></i></button>
                        </div>
                    </form>
                </Col>
            </Row>
            : undefined}
            {hutangs ? hutangs.length > 0 ?  
            <InfiniteScroll 
                className="mb-5" 
                hasMore={true}
                next={getHutangs}
                dataLength={hutangs.length}
            >
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
                                    <li onClick={() => {
                                        setHutang(hutang)
                                        nav(`/hutang/${hutang.id}`)
                                    }} ><div className="dropdown-item fw-bold" href="#"><i className="bi bi-pencil-square"></i> Edit</div></li>
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
            </InfiniteScroll>
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
            <div className="btn btn-primary" onClick={() => nav("/hutang")} ><i className="bi bi-plus-lg"></i> Tambah</div>
        </div>
        <Modal target={"hapusHutang"} >
            <h5 className="text-primary fw-bold text-center" >Yakin ingin Menghapusnya?</h5>
            <div className="d-flex justify-content-center">
                <img src="/img/trash.png" alt="logoSampah" className="img-fluid"  />
            </div>
            <div className="d-flex gap-1">
                <button data-bs-dismiss="modal" className="text-center btn btn-danger mt-2 shadow w-50" >Batal</button>
                <button className="text-center btn btn-primary mt-2 shadow w-50" onClick={deleteHutang} >Hapus</button>
            </div>
        </Modal>
    </Navbar>
}