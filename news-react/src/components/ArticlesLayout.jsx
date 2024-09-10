import {Outlet, Link, Navigate} from "react-router-dom"
import {useStateContext} from "../contexts/ContextProvider"
import axiosClient from "../axios-client";

export default function ArticlesLayout() {
    const {user, token, setToken, setUser} = useStateContext();

    if (!token) {
        return <Navigate to='/login'/>
    }

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post('/logout').then(() => {
            setUser({});
            setToken(null);
        })
    }

    return (
        <div id="articlesLayout" className="content">
            <div className="container-fluid">

                <div className="row align-items-center py-2 px-lg-5">
                    <div className="col-lg-4">
                        <a href="" className="navbar-brand d-none d-lg-block">
                            <h1 className="m-0 display-5 text-uppercase"><span className="text-primary">News</span>Room
                            </h1>
                        </a>
                    </div>

                </div>
            </div>
            <div className="container-fluid p-0 mb-3">
                <nav className="navbar navbar-expand-lg bg-light navbar-light py-2 py-lg-0 px-lg-5">
                    <a href="" className="navbar-brand d-block d-lg-none">
                        <h1 className="m-0 display-5 text-uppercase"><span className="text-primary">News</span>Room</h1>
                    </a>
                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between px-0 px-lg-3" id="navbarCollapse">
                        <div className="navbar-nav mr-auto py-0">
                            {/*<a href='#' className='nav-item nav-link active'>{user.name}</a>*/}
                            <a href="/news" className="nav-item nav-link">Home</a>
                            <a href="/settings" className="nav-item nav-link">Settings</a>
                            <a href="#" onClick={onLogout} className="nav-item nav-link">Logout</a>
                        </div>

                    </div>
                </nav>
            </div>
            <main>
                <Outlet/>
            </main>
            <div className="container-fluid bg-light pt-5 px-sm-3 px-md-5">
                <div className="row">
                    <div className="col-lg-3 col-md-6 mb-5">
                        <a href="index.html" className="navbar-brand">
                            <h1 className="mb-2 mt-n2 display-5 text-uppercase"><span
                                className="text-primary">News</span>Room</h1>
                        </a>

                        <div className="d-flex justify-content-start mt-4">
                            <a className="btn btn-outline-secondary text-center mr-2 px-0"
                               style={{ width: '38px', height: '38px' }} href="#"><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-outline-secondary text-center mr-2 px-0"
                               style={{ width: '38px', height: '38px' }} href="#"><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-outline-secondary text-center mr-2 px-0"
                               style={{ width: '38px', height: '38px' }} href="#"><i
                                className="fab fa-linkedin-in"></i></a>
                            <a className="btn btn-outline-secondary text-center mr-2 px-0"
                               style={{ width: '38px', height: '38px' }} href="#"><i className="fab fa-instagram"></i></a>
                            <a className="btn btn-outline-secondary text-center mr-2 px-0"
                               style={{ width: '38px', height: '38px' }} href="#"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-5">
                        <h4 className="font-weight-bold mb-4">Categories</h4>
                        <div className="d-flex flex-wrap m-n1">
                            <a href="" className="btn btn-sm btn-outline-secondary m-1">Politics</a>
                            <a href="" className="btn btn-sm btn-outline-secondary m-1">Business</a>
                            <a href="" className="btn btn-sm btn-outline-secondary m-1">Corporate</a>
                            <a href="" className="btn btn-sm btn-outline-secondary m-1">Sports</a>
                            <a href="" className="btn btn-sm btn-outline-secondary m-1">Health</a>
                            <a href="" className="btn btn-sm btn-outline-secondary m-1">Education</a>
                            <a href="" className="btn btn-sm btn-outline-secondary m-1">Science</a>
                            <a href="" className="btn btn-sm btn-outline-secondary m-1">Technology</a>
                            <a href="" className="btn btn-sm btn-outline-secondary m-1">Foods</a>
                            <a href="" className="btn btn-sm btn-outline-secondary m-1">Entertainment</a>
                            <a href="" className="btn btn-sm btn-outline-secondary m-1">Travel</a>
                            <a href="" className="btn btn-sm btn-outline-secondary m-1">Lifestyle</a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-5">
                        <h4 className="font-weight-bold mb-4">Tags</h4>
                        <div className="d-flex flex-wrap m-n1">
                            <a href="" className="btn btn-sm btn-outline-secondary m-1">Politics</a>
                            <a href="" className="btn btn-sm btn-outline-secondary m-1">Business</a>
                            <a href="" className="btn btn-sm btn-outline-secondary m-1">Corporate</a>
                            <a href="" className="btn btn-sm btn-outline-secondary m-1">Sports</a>
                            <a href="" className="btn btn-sm btn-outline-secondary m-1">Health</a>
                            <a href="" className="btn btn-sm btn-outline-secondary m-1">Education</a>
                            <a href="" className="btn btn-sm btn-outline-secondary m-1">Science</a>
                            <a href="" className="btn btn-sm btn-outline-secondary m-1">Technology</a>
                            <a href="" className="btn btn-sm btn-outline-secondary m-1">Foods</a>
                            <a href="" className="btn btn-sm btn-outline-secondary m-1">Entertainment</a>
                            <a href="" className="btn btn-sm btn-outline-secondary m-1">Travel</a>
                            <a href="" className="btn btn-sm btn-outline-secondary m-1">Lifestyle</a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-5">
                        <h4 className="font-weight-bold mb-4">Quick Links</h4>
                        <div className="d-flex flex-column justify-content-start">
                            <a className="text-secondary mb-2" href="#"><i
                                className="fa fa-angle-right text-dark mr-2"></i>About</a>
                            <a className="text-secondary mb-2" href="#"><i
                                className="fa fa-angle-right text-dark mr-2"></i>Advertise</a>
                            <a className="text-secondary mb-2" href="#"><i
                                className="fa fa-angle-right text-dark mr-2"></i>Privacy & policy</a>
                            <a className="text-secondary mb-2" href="#"><i
                                className="fa fa-angle-right text-dark mr-2"></i>Terms & conditions</a>
                            <a className="text-secondary" href="#"><i
                                className="fa fa-angle-right text-dark mr-2"></i>Contact</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid py-4 px-sm-3 px-md-5">
                <p className="m-0 text-center">
                    &copy; <a className="font-weight-bold" href="#">News Room</a>. All Rights Reserved.
                </p>
            </div>
        </div>
)


}
