import { Head, Link } from "@inertiajs/react";

export default function Sidebar(props) {
    const href = window.location.href.split("000")[1];
    // const link = href[href.length - 1] === "";
    // console.log(href);

    return (
        <>
            <header
                className="navbar sticky-top bg-dasar flex-md-nowrap p-0 shadow" 
                data-bs-theme="dark"
            >
                <Link
                    className="navbar fs-4 text-decoration-none fw-bold col-md-3 col-lg-2 me-0 px-3 fs-6 text-white"
                    href="/"
                >
                    Website 
                </Link>

                <ul className="navbar-nav flex-row d-md-none">
                    <li className="nav-item text-nowrap">
                        <button
                            className="nav-link px-3 text-white"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#sidebarMenu"
                            aria-controls="sidebarMenu"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <i className="bi bi-list fs-3"></i>
                        </button>
                    </li>
                </ul>

                <div id="navbarSearch" className="navbar-search w-100 collapse">
                    <input
                        className="form-control w-100 rounded-0 border-0"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </div>
            </header>

            <div className="container-fluid">
                <div className="row">
                    <div className="sidebar col-md-3 col-lg-2 p-0 bg-dark ">
                        <div
                            className="offcanvas-md offcanvas-end bg-dark"
                            style={{ paddingBottom: '100px' }}
                            tabIndex="-1"
                            id="sidebarMenu"
                            aria-labelledby="sidebarMenuLabel"
                        >
                            <div className="offcanvas-header">
                                <h5
                                    className="offcanvas-title" 
                                    id="sidebarMenuLabel"
                                >
                                    {/* Website */}
                                </h5>
                                <button
                                    type="button"
                                    className="bi bi-x-lg fs-5 text-light"
                                    data-bs-dismiss="offcanvas"
                                    data-bs-target="#sidebarMenu"
                                    aria-label="Close"
                                ></button>
                            </div>
                            
                            <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                                <ul className="nav flex-column">
                                    <li className="nav-item mt-2">
                                        <Link
                                            className={`nav-link d-flex gap-2 ${href === "/" ? "active" : ""}` }
                                            aria-current="page"
                                            href="/"
                                        >
                                            <i className="bi bi-bar-chart-fill"></i>Dashboard
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link d-flex gap-2"
                                            href="#"
                                        >
                                            <i className="bi bi-exclamation-circle-fill"></i>
                                            Hutang
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link d-flex gap-2"
                                            href="#"
                                        >
                                            <i className="bi bi-emoji-angry-fill"></i>
                                            Nunggak
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link d-flex  gap-2"
                                            href="#"
                                        >
                                            <i className="bi bi-emoji-laughing-fill"></i>
                                            Lunas
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className={`nav-link d-flex gap-2 ${ href.includes("orang") ? "active" : "" }`}
                                            href="/orang"
                                        >
                                            <i className="bi bi-people-fill"></i>
                                            Orang - Orang 
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link d-flex align-items-center gap-2"
                                            href="#"
                                        >
                                            Integrations
                                        </a>
                                    </li>
                                </ul>

                                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                                    <span>Saved reports</span>
                                    <a
                                        className="link-secondary"
                                        href="#"
                                        aria-label="Add a new report"
                                    ></a>
                                </h6>
                                <ul className="nav flex-column mb-auto">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link d-flex align-items-center gap-2"
                                            href="#"
                                        >
                                            Current month
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link d-flex align-items-center gap-2"
                                            href="#"
                                        >
                                            Last quarter
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link d-flex align-items-center gap-2"
                                            href="#"
                                        >
                                            Social engagement
                                        </a>
                                    </li>
                                </ul>

                                <hr className="my-3" />

                                <ul className="nav flex-column mb-auto"> 
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link text-white d-flex gap-2"
                                            href="/logout"
                                        >
                                            <i className="bi bi-box-arrow-left fs-6"></i>
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <main className="col-md-9 text-dark ms-sm-auto col-lg-10 px-md-4 mt-3">
                        {props.children}
                    </main>
                </div>
            </div>
        </>
    );
}
