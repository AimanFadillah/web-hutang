import Column from "@/component/column";
import RowContainer from "@/component/rowContainer";
import Sidebar from "@/component/sidebar";
import { Head, Link } from "@inertiajs/react";

// 610C9F
export default function Welcome() {
    return <>
        <Head title="Dashboard" ></Head>
        <Sidebar>
            <h1 className="text-dark" >Hai teman teman</h1>
        </Sidebar>
    </>
}
