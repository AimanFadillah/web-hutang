import Sidebar from "@/component/sidebar";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import DataTable from "react-data-table-component";

export default function Orang (props) {

    const {data,setData,post,errors} = useForm({
        name:"",
        kelas:"",
        divisi:"",
    });
    const [dataOrang,setDataOrang] = useState(props.dataOrang);
    const [show,setShow] = useState({});

    function cariData (pencarian) { 
        if(pencarian === "") return setDataOrang(props.dataOrang)
        const dataBaruName = props.dataOrang.filter(dt => dt.name.toLowerCase().includes(pencarian.toLocaleLowerCase()));
        const dataBaruKelas = props.dataOrang.filter(dt => dt.kelas.toLowerCase().includes(pencarian.toLocaleLowerCase()));
        const dataBaruDivisi = props.dataOrang.filter(dt => dt.divisi.toLowerCase().includes(pencarian.toLocaleLowerCase()));
        const dataBaru = [...dataBaruName,...dataBaruKelas,...dataBaruDivisi].filter((dt,index,self) => self.indexOf(dt) === index)
        setDataOrang(dataBaru);
    }

    // function editData (orang){
    //     console.log(orang)
    //     setData("name",orang.name)
    //     setData("kelas",orang.kelas)
    //     setData("divisi",orang.divisi)
    // }

    function updateData() {

    }

    function hapusData() {
        const dataBaru = dataOrang.filter(baru => baru.id !== show.id);
        post(`/anggota/${show.id}/delete`,{
            onSuccess:() => {
                setDataOrang(dataBaru)
                document.querySelector("button[data-bs-dismiss='modal']").click()
            }
        });
    }

    function aturData (e){
        setData(e.target.name,e.target.value);
    }

    return <>
        <Head title="Orang" ></Head>
        <Sidebar>
        <h1 className="mb-4" >Anggota</h1>
        <div className="input-group mb-3" >
            <input type="search" className="form-control" onChange={(e) => cariData(e.target.value)} placeholder="Cari Anggota..." ></input>
            <button className="btn" style={{ backgroundColor:"#3568FF" }} type="submit"  ><i className="bi bi-search"></i></button>
        </div>
        <div className="table-responsive-md">
            {dataOrang.length !== 0 ? 
            <table className="table border table-striped"  >
            <thead>
                <tr>
                    <th className="text-light" style={{ backgroundColor:"#3568FF" }}>Nama</th>
                    <th className="text-light" style={{ backgroundColor:"#3568FF" }}>Divisi</th>
                    <th className="text-light" style={{ backgroundColor:"#3568FF" }}>Kelas</th>
                    <th className="text-light" style={{ backgroundColor:"#3568FF" }}>Action</th>
                </tr>
            </thead>
            <tbody>
                {dataOrang.map((orang,index) => {
                    return(
                        <tr key={index} >
                            <td>{orang.name}</td>
                            <td>{orang.kelas}</td>
                            <td>{orang.divisi}</td>
                            <td>
                                <Link className="badge ms-1 bg-success">
                                    <i className="fs-6 bi  bi-eye"></i>
                                </Link>
                                <div onClick={(e) => editData(orang)} data-bs-toggle="modal" data-bs-target="#editModal" className="badge my-1 ms-1 bg-warning">
                                    <i className="fs-6 bi bi-pencil-square"></i>
                                </div>
                                <div onClick={(e) => setShow(orang)} data-bs-toggle="modal" data-bs-target="#hapusModal" className="badge ms-1 bg-danger">
                                    <i className="fs-6 bi bi-trash"></i>
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
            </table>
            : 
            <div className="mt-5">
                <img src="/img/kosong.png"  className="mx-auto img-fluid" width={300} alt="foto kosong" ></img>
                <h1 className="text-center text-dark fs-4" >Tidak ada data yang ditemukan</h1>
            </div>
            }
        </div>
        </Sidebar>

        <div className="modal fade" id="hapusModal" tabIndex="-1" data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-sm">
                <div className="modal-content">
                    <div className="modal-body text-dark">
                        <h1 className="fs-5  text-center" >Yakin ingin menghapus <span className="fw-bold text-dark" >{show.name}</span>?</h1>
                        <div className="d-flex justify-content-evenly">
                            <button className="btn btn-danger px-4" data-bs-dismiss="modal" >Batal</button>
                            <button className="btn btn-success px-4" onClick={hapusData} >Yakin</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body text-dark">
                        <form onSubmit={updateData} >
                            <h1 className="fs-1 text-center mb-3 text-dark" >Edit Data</h1>
                            <div className="mb-4">
                                <label htmlFor="name" className="text-dark form-label ">Nama</label>
                                <input type="text" className={`form-control ${errors.name ? "is-invalid" : ""}`} required value={data.name} onChange={aturData}  id="name" name="name" placeholder="Masukkan nama"></input>
                                <div className={`invalid-feedback ${errors.name ? "" : "d-none"} `}>
                                    {errors.name}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="kelas" className="text-dark form-label">Kelas</label>
                                <input type="text" className={`form-control ${errors.kelas ? "is-invalid" : ""}`} required value={data.kelas} onChange={aturData} id="kelas" name="kelas" placeholder="Masukkan kelas"></input>
                                <div className={`invalid-feedback ${errors.kelas ? "" : "d-none"} `}>
                                    {errors.kelas}
                                </div>
                            </div>
                            <label htmlFor="divisi" className="text-dark form-label ">Divisi</label>
                            <select className={`form-control ${errors.divisi ? "is-invalid" : ""}`} required name="divisi" onChange={aturData} >
                                <option className="text-dark" value="">Pilih Divisi</option>
                                <option className="text-dark" value="Desain">Desain</option>
                                <option className="text-dark" value="Teknologi">Teknologi</option>
                            </select>
                            <div className={`invalid-feedback ${errors.divisi ? "" : "d-none"} `}>
                                {errors.divisi}
                            </div>
                            <div className="justify-content-center">
                                <button type="submit" className="btn text-light mt-4 px-4" style={{ backgroundColor:"#3568FF" }} >Kirim</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}