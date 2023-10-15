import Sidebar from "@/component/sidebar";
import { Head } from "@inertiajs/react";

export default function Orang () {
    return <>
        <Head title="Orang" ></Head>
        <Sidebar>
        <h1 className="mb-4" >Anggota</h1>
        <div className="table-responsive-md">
            <table className="table table-striped text-center"  >
            <thead>
                <tr>
                    <th scope="col" className="text-light" style={{ backgroundColor:"#3568FF",borderRadius:"10px 0 0 0" }} >No</th>
                    <th scope="col" className="text-light" style={{ backgroundColor:"#3568FF" }}>Nama</th>
                    <th scope="col" className="text-light" style={{ backgroundColor:"#3568FF" }}>Divisi</th>
                    <th scope="col" className="text-light" style={{ backgroundColor:"#3568FF",borderRadius:"0 10px 0 0" }}>Kelas</th>
                </tr>
            </thead>
            <tbody className="border" >
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Larry the Bird</td>
                    <td>@twitter</td>
                    <td>@twitter</td> 
                </tr>
            </tbody>
            </table>
        </div>
        </Sidebar>
    </>
}