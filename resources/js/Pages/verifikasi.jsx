import Sidebar from "@/component/sidebar";
import { Head, useForm } from "@inertiajs/react";

export default function Verifikasi (props) {

    const {data,setData,post,errors} = useForm({
        name:props.name || "",
        kelas:"",
        divisi:"",
    })

    function aturData (e){
        setData(e.target.name,e.target.value);
    }

    function kirimData (e) {
        e.preventDefault()
        post("/verifikasi")
    }

    return <>
        <Head title="Verifikasi" ></Head>
        <Sidebar>
                    <form onSubmit={kirimData} >
                        <h1 className="fs-1 text-center mb-3 text-dark" >Verifikasi</h1>
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
                        <select className="form-select" required name="divisi" onChange={aturData} >
                            <option className="text-dark" value="">Pilih Divisi</option>
                            <option className="text-dark" value="desain">Desain</option>
                            <option className="text-dark" value="teknologi">Teknologi</option>
                        </select>
                        <div className="justify-content-center">
                            <button type="submit" className="btn btn-success mt-4 px-4" >Kirim</button>
                        </div>
                    </form>
        </Sidebar>
    </>
}