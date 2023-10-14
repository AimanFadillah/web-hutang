import RowContainer from "@/component/rowContainer";
import Column from "@/component/column";
import { Head, Link } from "@inertiajs/react";

export default function Login() {
    return (
        <RowContainer>
            <Head title="Login" ></Head>
            <Column size="6" className="d-flex justify-content-center align-items-center">
                <div className="" >
                    <h1 className="fw-bold text-center fs-1 text-dasar " >Selamat Datang di Website</h1>
                    <p className="d-md-block d-none text-center text-dasar" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum quaerat sint consequatur voluptas amet eius non quas a possimus voluptatibus.</p>
                </div>
            </Column>
            <Column size="6" >
                <div className="p-1 px-2 rounded shadow my-3 py-2 bg-dasar" >
                    <img src="/img/login.png" alt="gambar login" width={280} className="img-fluid mx-auto" ></img>
                    <a href="/register" className="text-decoration-none" >
                        <div className="border d-flex bg-light mb-1 mx-1 rounded justify-content-between" >
                            <img src="/img/google.png" className=" img-fluid" width={40} alt="" />
                            <div className="text-center rounded-end d-flex align-items-center text-dark justify-content-center" style={{ width:"100%" }} >
                                <h1 className="mt-2 fw-bold fs-5 text-dasar" >Masuk dengan Google</h1>
                            </div>
                        </div>
                    </a>
                </div>
            </Column>
        </RowContainer>
    );  
}
